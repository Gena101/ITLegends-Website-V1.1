// scripts/prerender.mjs
// Runs after `vite build` (client) and `vite build --ssr` (server).
// Writes one static HTML file per route, plus 404.html and sitemap.xml.
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

// Preload the two Latin font files (hashed names) so text doesn't reflow when fonts swap in (CLS)
const PRELOAD_FONTS = [/^inter-latin-wght-normal-.+\.woff2$/, /^space-grotesk-latin-wght-normal-.+\.woff2$/];
const assetFiles = await fs.readdir(path.join(distDir, 'assets'));
const fontPreloads = PRELOAD_FONTS.map((pattern) => {
  const file = assetFiles.find((name) => pattern.test(name));
  if (!file) console.warn(`⚠ Font to preload not found in dist/assets: ${pattern}`);
  return file ? `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>` : '';
})
  .filter(Boolean)
  .join('\n    ');

/** Function replacers: page HTML may contain "$&" etc., which a string replacement would mangle */
function fillTemplate(page) {
  const head = fontPreloads ? `${fontPreloads}\n    ${page.head}` : page.head;
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

const entries = getPrerenderEntries();
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
  try {
    page = render(entry.path);
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
  await fs.writeFile(file, fillTemplate(page));
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
const notFound = render('/__prerender-not-found__');
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