import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seo from "../../config/seo.json";

export function resolveSeo(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  let key = seo.routes[path] ? path : "/";
  let entry = seo.routes[key];
  if (entry.same) {
    key = entry.same;
    entry = seo.routes[key];
  }
  const canonicalPath = key === "/" ? "/" : `${key}/`;
  return { ...entry, url: seo.siteUrl + canonicalPath };
}

function setMeta(attr, name, content) {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// first load gets these from the static html (scripts/postbuild.js), this updates them on navigation
export default function SeoHeader() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = resolveSeo(pathname);
    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("name", "robots", page.index ? "index, follow" : "noindex, follow");
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", page.url);
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", page.url);
  }, [pathname]);

  return null;
}
