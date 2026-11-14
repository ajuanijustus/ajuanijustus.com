// runs after `react-scripts build`.
// github pages has no server side routing, so each page gets its own index.html
// (build/contact/index.html etc.) with the right title/description/canonical baked in.
// also writes sitemap.xml and 404.html.

const fs = require("fs");
const path = require("path");
const seo = require("../src/config/seo.json");

const buildDir = path.join(__dirname, "..", "build");
const template = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");

const escape = (str) =>
  str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function resolve(route) {
  let key = route;
  let entry = seo.routes[key];
  if (entry.same) {
    key = entry.same;
    entry = seo.routes[key];
  }
  const url = seo.siteUrl + (key === "/" ? "/" : `${key}/`);
  return { ...entry, url };
}

function setTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`postbuild: tag not found in index.html: ${pattern}`);
  return html.replace(pattern, replacement);
}

function render(page) {
  const title = escape(page.title);
  const description = escape(page.description);
  const robots = page.index ? "index, follow" : "noindex, follow";
  let html = template;
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = setTag(html, /(<meta name="description" content=")[^"]*/, `$1${description}`);
  html = setTag(html, /(<meta name="robots" content=")[^"]*/, `$1${robots}`);
  html = setTag(html, /(<link rel="canonical" href=")[^"]*/, `$1${page.url}`);
  html = setTag(html, /(<meta property="og:title" content=")[^"]*/, `$1${title}`);
  html = setTag(html, /(<meta property="og:description" content=")[^"]*/, `$1${description}`);
  html = setTag(html, /(<meta property="og:url" content=")[^"]*/, `$1${page.url}`);
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*/, `$1${title}`);
  html = setTag(html, /(<meta name="twitter:description" content=")[^"]*/, `$1${description}`);
  return html;
}

const indexable = [];

for (const route of Object.keys(seo.routes)) {
  const page = resolve(route);
  const file = route === "/" ? "index.html" : path.join(route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(path.join(buildDir, file)), { recursive: true });
  fs.writeFileSync(path.join(buildDir, file), render(page));
  if (page.index && !seo.routes[route].same) indexable.push(page.url);
}

// unknown urls still load the app, which sends them home
fs.writeFileSync(
  path.join(buildDir, "404.html"),
  render({ ...resolve("/"), index: false })
);

const today = new Date().toISOString().slice(0, 10);
const urls = [...indexable, `${seo.siteUrl}/cv.pdf`]
  .map((loc) => `  <url><loc>${loc}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");
fs.writeFileSync(
  path.join(buildDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

console.log(`postbuild: wrote ${Object.keys(seo.routes).length} pages, 404.html and sitemap.xml`);
