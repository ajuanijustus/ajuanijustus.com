// turns src/data/recipes/*.md into src/data/recipes.json. runs before start and build.
//
// a recipe file looks like:
//
// ---
// title: Chicken curry
// time: 45 min
// serves: 4
// tags: dinner, spicy
// photo: chicken-curry.jpg   (optional, goes in public/secret/kitchen/)
// ---
// ## ingredients
// - 500g chicken
// ## steps
// 1. ...

const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../../src/data/recipes");
const out = path.join(__dirname, "../../src/data/recipes.json");

const recipes = [];
if (fs.existsSync(dir)) {
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
    const text = fs.readFileSync(path.join(dir, file), "utf8");
    const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    const meta = {};
    if (m) {
      m[1].split("\n").forEach((line) => {
        const i = line.indexOf(":");
        if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
      });
    }
    recipes.push({
      slug: file.replace(/\.md$/, ""),
      title: meta.title || file.replace(/\.md$/, "").replace(/-/g, " "),
      time: meta.time || null,
      serves: meta.serves || null,
      tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      photo: meta.photo || null,
      body: (m ? m[2] : text).trim(),
    });
  }
}

const json = JSON.stringify(recipes, null, 1) + "\n";
if (!fs.existsSync(out) || fs.readFileSync(out, "utf8") !== json) fs.writeFileSync(out, json);
console.log(`recipes: ${recipes.length}`);
