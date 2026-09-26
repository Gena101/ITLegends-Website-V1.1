// scripts/check-routes.mjs
// Verifies that src/data/routes.json, public/_redirects and public/sitemap.xml
// describe the same set of URLs. Plain Node, no dependencies.
// Run by hand: npm run check:routes. NOT part of the build (08 §11).
//
// Checks
//   1. Every route has a path starting "/" with no trailing slash (except "/")
//   2. No duplicate paths
//   3. _redirects whitelists exactly the routes in routes.json (200 rules)
//   4. sitemap.xml lists exactly the routes with sitemap: true
//   5. sitemap lastmod matches routes.json `modified` exactly, and is absent
//      where `modified` is null (never invent a lastmod - D24)
//   6. Dates are ISO YYYY-MM-DD, and modified is not before published
//   7. _redirects ends with the catch_all 404 rule (D23)
import { readFileSync } from 'node:fs';

const SITE = 'https://www.itlegends.co.za';
const errors = [];
const fail = (msg) => errors.push(msg);

const routesJson = JSON.parse(readFileSync('src/data/routes.json', 'utf8'));
const redirects = readFileSync('public/_redirects', 'utf8');
const sitemap = readFileSync('public/sitemap.xml', 'utf8');

const routes = routesJson.routes;
const ISO = /^\d{4}-\d{2}-\d{2}$/;

// 1 + 2 + 6 - routes.json itself
const seen = new Set();
for (const r of routes) {
  if (!r.path.startsWith('/')) fail(`path must start with "/": ${r.path}`);
  if (r.path !== '/' && r.path.endsWith('/')) fail(`trailing slash not allowed: ${r.path}`)
  if (seen.has(r.path)) fail(`duplicate path: ${r.path}`);
  seen.add(r.path);
  if (!r.page) fail(`no page component name for ${r.path}`);
  if (!r.template) fail(`no template named for ${r.path}`);
  for (const field of ['published', 'modified']) {
    const value = r[field];
    if (value !== null && !ISO.test(value)) fail(`${r.path}: ${field} is not YYYY-MM-DD: ${value}`);
  }
  if (r.published && r.modified && r.modified < r.published) {
    fail(`${r.path}: modified (${r.modified}) is before published (${r.published})`);
  }
}

// 3 - _redirects whitelist
const whitelisted = redirects
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => !line.startsWith('#') && /\s\/index\.html\s+200$/.test(line))
  .map((line) => line.split(/\s+/)[0]);

const inJson = [...seen].sort();
const inRedirects = [...whitelisted].sort();
for (const p of inJson) {
  if (!inRedirects.includes(p)) fail(`_redirects is missing a 200 rule for ${p}`);
}
for (const p of inRedirects) {
  if (!inJson.includes(p)) fail(`_redirects whitelists ${p}, which is not in routes.json`)
}
if (new Set(inRedirects).size !== inRedirects.length) {
  fail('_redirects contains a duplicate 200 rule');
}

// 7 - catch-all must be last
const lastRule = redirects
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .pop();
if (lastRule !== '/*  /index.html  404') {
  fail(`the last _redirects rule must be "/*  /index.html  404", found: ${lastRule}`);
}

// 4 + 5 - sitemap
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
  const loc = /<loc>(.*?)<\/loc>/.exec(m[1])?.[1] ?? '';
  const lastmod = /<lastmod>(.*?)<\/lastmod>/.exec(m[1])?.[1] ?? null;
  return { loc, lastmod };
});

const expected = routes.filter((r) => r.sitemap !== false);
const sitemapPaths = entries.map((e) => e.loc.replace(SITE, '') || '/');

for (const r of expected) {
  const entry = entries.find((e) => e.loc === (r.path === '/' ? `${SITE}/` : SITE + r.path));
  if (!entry) {
    fail(`sitemap.xml is missing ${r.path}`);
    continue;
  }
  if ((entry.lastmod ?? null) !== r.modified) {
    fail(
      `sitemap lastmod for ${r.path} is ${entry.lastmod ?? 'absent'}, routes.json says ${r.modified ?? 'null'}`,
    );
  }
}
for (const p of sitemapPaths) {
  if (!expected.some((r) => r.path === p)) fail(`sitemap.xml lists ${p}, which is not in routes.json`);
}
for (const e of entries) {
  if (!e.loc.startsWith(SITE)) fail(`sitemap loc is not on the canonical host: ${e.loc}`);
  if (e.loc !== `${SITE}/` && e.loc.endsWith('/')) fail(`sitemap loc has a trailing slash: ${e.loc}`);
}

// Result
if (errors.length) {
  console.error(`check-routes: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`check-routes: OK - ${routes.length} routes, ${entries.length} sitemap URLs agree`);