import React, { useEffect, useState } from "react";
import SecretPage, { Section, Tabs, Empty, themeVars } from "../../components/secret/SecretPage";
import recipes from "../../data/recipes.json";
import "./secret-pages.css";

// just enough markdown for a recipe: headings, lists, paragraphs, bold
function renderMarkdown(text) {
  const out = [];
  let list = null;
  const inline = (s) => s.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : p));
  const flush = () => {
    if (list) out.push(list.ordered ? <ol key={out.length}>{list.items}</ol> : <ul key={out.length}>{list.items}</ul>);
    list = null;
  };
  text.split("\n").forEach((raw) => {
    const line = raw.trim();
    const bullet = line.match(/^[-*]\s+(.*)/);
    const numbered = line.match(/^\d+[.)]\s+(.*)/);
    if (bullet || numbered) {
      const ordered = !!numbered;
      if (!list || list.ordered !== ordered) {
        flush();
        list = { ordered, items: [] };
      }
      list.items.push(<li key={list.items.length}>{inline((bullet || numbered)[1])}</li>);
      return;
    }
    flush();
    if (!line) return;
    const h = line.match(/^#{1,4}\s+(.*)/);
    out.push(h ? <h3 key={out.length}>{h[1]}</h3> : <p key={out.length}>{inline(line)}</p>);
  });
  flush();
  return out;
}

const photo = (r) => (r.photo ? `${process.env.PUBLIC_URL}/secret/kitchen/${r.photo}` : null);

export default function Kitchen(props) {
  const [open, setOpen] = useState(null);
  const [tag, setTag] = useState("all");
  const tags = ["all", ...new Set(recipes.flatMap((r) => r.tags))];
  const shown = tag === "all" ? recipes : recipes.filter((r) => r.tags.includes(tag));

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <SecretPage {...props} title="Kitchen" subtitle="the recipes i actually make, again and again.">
      {!recipes.length ? (
        <Empty>coming soon.</Empty>
      ) : (
        <Section>
          {tags.length > 2 && (
            <div className="kt-filter">
              <Tabs tabs={tags.map((t) => ({ id: t, label: t }))} active={tag} onChange={setTag} />
            </div>
          )}
          <div className="kt-grid">
            {shown.map((r) => (
              <button className="kt-card" key={r.slug} onClick={() => setOpen(r)}>
                <div className="kt-photo">{photo(r) ? <img src={photo(r)} alt="" loading="lazy" /> : "🍳"}</div>
                <div className="kt-body">
                  <h3>{r.title}</h3>
                  <div className="kt-tags">
                    {r.time && <span>⏱ {r.time}</span>}
                    {r.serves && <span>serves {r.serves}</span>}
                    {r.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Section>
      )}
      {open && (
        <div className="kt-modal" onClick={() => setOpen(null)} style={themeVars(props.theme)}>
          <div className="kt-sheet" role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => e.stopPropagation()}>
            <button className="kt-close" onClick={() => setOpen(null)} aria-label="close">
              ×
            </button>
            <h2>{open.title}</h2>
            <div className="kt-tags">
              {open.time && <span>⏱ {open.time}</span>}
              {open.serves && <span>serves {open.serves}</span>}
            </div>
            {renderMarkdown(open.body)}
          </div>
        </div>
      )}
    </SecretPage>
  );
}
