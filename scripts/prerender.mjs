// scripts/prerender.mjs
// Runs after `vite build` (client) and `vite build --ssr` (server).
// Writes one static HTML file per route, plus 404.html and sitemap.xml.
// Each page's HTML preloads its own JS chunk (route code splitting), so hydration isn't delayed by a waterfall.
// Fails the build if a listed route doesn't render as a real page.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const serverEntry = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href;

const { render, getPrerenderEntries, siteUrl } = await import(serverEntry);

const templatePath = path.join(distDir, 'index.html');
const template = await fs.readFile(templatePath, 'utf8');

if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> or <!--app-html--> placeholder');
}

// Client build manifest: source file → hashed chunk + its imports (needs build.manifest in vite.config.ts)
const manifestDir = path.join(distDir, '.vite');
let manifest;
try {
  manifest = JSON.parse(await fs.readFile(path.join(manifestDir, 'manifest.json'), 'utf8'));
} catch {
  throw new Error('dist/.vite/manifest.json not found: set build.manifest for the client build in vite.config.ts');
}

// Preload the two Latin font files (hashed names) so text doesn't reflow when fonts swap in (CLS)
const PRELOAD_FONTS = [/^inter-latin-wght-normal-.+\.woff2$/, /^space-grotesk-latin-wght-normal-.+\.woff2$/];
const assetFiles = await fs.readdir(path.join(distDir, 'assets'));
const fontPreloads = PRELOAD_FONTS.map((pattern) => {
  const file = assetFiles.find((name) => pattern.test(name));
  if (!file) console.warn(`⚠ Font to preload not found in dist/assets: ${pattern}`);
  return file ? `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>` : '';
}).filter(Boolean);

/**
 * modulepreload (and any CSS) for a page's chunk and the chunks it imports.
 * Anything index.html already links (the main entry and its imports) is skipped.
 * Lazy imports inside the page (e.g. HeroScene) are deliberately not followed.
 */
/**
 * Manifest key of a page's chunk. Usually its source path ("src/pages/Home.tsx"), but when Rollup
 * doesn't mark the page as its chunk's facade (Home, whose chunk also serves code to the lazy
 * HeroScene), Vite keys it by file name ("_Home-<hash>.js"). Fall back to the one dynamic-entry
 * chunk named after the page file. Case-sensitive: "Home" never matches lucide's "home" icon chunk.
 */
function findChunkKey(sourceFile) {
  if (manifest[sourceFile]) return sourceFile;
  const name = path.posix.basename(sourceFile).replace(/\.[jt]sx?$/, '');
  const pattern = new RegExp(`^assets/${name}-[\\w-]{8}\\.js$`);
  const candidates = Object.keys(manifest).filter(
    (key) => manifest[key].isDynamicEntry && pattern.test(manifest[key].file),
  );
  if (candidates.length !== 1) {
    throw new Error(
      `${sourceFile}: expected 1 matching chunk in the build manifest, found ${candidates.length}` +
        (candidates.length ? ` (${candidates.join(', ')})` : ''),
    );
  }
  return candidates[0];
}

function pageAssetTags(sourceFile) {
  if (!sourceFile) return [];
  const startKey = findChunkKey(sourceFile);

  const tags = new Set();
  const visited = new Set();
  const linked = (file) => template.includes(`/${file}"`);

  const visit = (key) => {
    if (visited.has(key)) return;
    visited.add(key);
    const chunk = manifest[key];
    if (!chunk) return;
    for (const css of chunk.css ?? []) {
      if (!linked(css)) tags.add(`<link rel="stylesheet" crossorigin href="/${css}">`);
    }
    if (!linked(chunk.file)) tags.add(`<link rel="modulepreload" crossorigin href="/${chunk.file}">`);
    for (const dep of chunk.imports ?? []) visit(dep);
  };

  visit(startKey);
  return [...tags];
}

/** Function replacers: page HTML may contain "$&" etc., which a string replacement would mangle */
function fillTemplate(page) {
  const head = [...fontPreloads, ...pageAssetTags(page.pageFile), page.head].filter(Boolean).join('\n    ');
  return template.replace('<!--app-head-->', () => head).replace('<!--app-html-->', () => page.html);
}

/** "/" → dist/index.html, "/services/helpdesk" → dist/services/helpdesk.html */
function outputFile(urlPath) {
  if (urlPath === '/') return templatePath;
  return path.join(distDir, ...`${urlPath.slice(1)}.html`.split('/'));
}

function absolute(urlPath) {
  return urlPath === '/' ? `${siteUrl}/` : `${siteUrl}${urlPath}`;
}

function normalizeLink(href) {
  const [pathname] = href.split(/[?#]/);
  if (pathname.length > 1) return pathname.replace(/\/+$/, '');
  return pathname || '/';
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const entries = await getPrerenderEntries();
const errors = [];
const rendered = new Set();
/** internal link path → pages linking to it */
const links = new Map();

const seen = new Set();
for (const { path: urlPath } of entries) {
  if (seen.has(urlPath)) errors.push(`Duplicate route: ${urlPath}`);
  seen.add(urlPath);
}

for (const entry of entries) {
  let page;
  let html;
  try {
    page = await render(entry.path);
    if (page.status === 200) html = fillTemplate(page);
  } catch (error) {
    errors.push(`${entry.path}: render threw: ${error instanceof Error ? error.stack : error}`);
    continue;
  }

  if (page.status !== 200) {
    errors.push(`${entry.path}: rendered with status ${page.status} (is it in the route table?)`);
    continue;
  }

  const file = outputFile(entry.path);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
  rendered.add(entry.path);

  for (const match of page.html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1];
    if (href.startsWith('//')) continue; // protocol-relative = external
    const target = normalizeLink(href);
    if (/\.[a-z0-9]+$/i.test(target)) continue; // static file (favicon, image, pdf)
    if (!links.has(target)) links.set(target, new Set());
    links.get(target).add(entry.path);
  }
}

// 404 page: Netlify serves dist/404.html with a real 404 status for unknown URLs
const notFound = await render('/__prerender-not-found__');
if (notFound.status !== 404) {
  errors.push(`404 page rendered with status ${notFound.status}; NotFound must call useRenderStatus(404)`);
} else {
  await fs.writeFile(path.join(distDir, '404.html'), fillTemplate(notFound));
}

// sitemap.xml from the same route table
const sitemapUrls = entries.filter((e) => e.sitemap && rendered.has(e.path)).map((e) => absolute(e.path));
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  sitemapUrls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n') +
  '\n</urlset>\n';
await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap);

// The manifest is a build input only; don't publish it (it lists source file paths).
// Kept when the prerender fails, so it can be inspected.
if (errors.length === 0) await fs.rm(manifestDir, { recursive: true, force: true });

// Report internal links that don't resolve to a prerendered page (warning, not failure:
// nav links to pages from later phases are expected until launch)
const broken = [...links.entries()].filter(([target]) => !rendered.has(target)).sort(([a], [b]) => a.localeCompare(b));

console.log(`\nPrerendered ${rendered.size} pages + 404.html; sitemap.xml has ${sitemapUrls.length} URLs.`);

if (broken.length > 0) {
  console.warn(`\n⚠ ${broken.length} internal link target(s) have no page yet:`);
  for (const [target, sources] of broken) {
    const from = [...sources];
    const sample = from.slice(0, 3).join(', ') + (from.length > 3 ? `, +${from.length - 3} more` : '');
    console.warn(`  ${target}  (linked from ${sample})`);
  }
}

if (errors.length > 0) {
  console.error('\n✖ Prerender failed:');
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}