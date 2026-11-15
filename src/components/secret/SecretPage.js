import React from "react";
import { Fade } from "react-awesome-reveal";
import Header from "../personal_header/Header";
import Footer from "../footer/Footer";
import TopButton from "../topButton/TopButton";
import "./secret.css";

export function themeVars(theme) {
  return {
    "--fg": theme.text,
    "--muted": theme.secondaryText,
    "--accent": theme.highlight,
    "--bg": theme.body,
    "--line": theme.text + "1f",
    "--card": theme.text + "0b",
  };
}

export default function SecretPage({ theme, onToggle, title, subtitle, children }) {
  return (
    <>
      <Header theme={theme} />
      <main className="sp" style={themeVars(theme)}>
        <Fade triggerOnce>
          <header className="sp-head">
            <h1 className="sp-title">{title}</h1>
            {subtitle && <p className="sp-sub">{subtitle}</p>}
          </header>
        </Fade>
        {children}
      </main>
      <Footer theme={theme} onToggle={onToggle} />
      <TopButton theme={theme} />
    </>
  );
}

export function Section({ title, desc, children, id }) {
  return (
    <section className="sp-section" id={id}>
      <Fade triggerOnce>
        {title && <h2 className="sp-h2">{title}</h2>}
        {desc && <p className="sp-desc">{desc}</p>}
        {children}
      </Fade>
    </section>
  );
}

export function Tiles({ children }) {
  return <div className="sp-tiles">{children}</div>;
}

export function Tile({ value, label, foot }) {
  return (
    <div className="sp-tile">
      <span className="sp-tile-num">{value}</span>
      <span className="sp-tile-label">{label}</span>
      {foot && <span className="sp-tile-foot">{foot}</span>}
    </div>
  );
}

export function Empty({ children }) {
  return <p className="sp-empty">{children}</p>;
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="sp-tabs" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          className={`sp-tab${active === t.id ? " is-active" : ""}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function Stars({ value }) {
  if (!value) return null;
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="sp-stars" aria-label={`${value} stars`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
    </span>
  );
}

export function PosterGrid({ items, small }) {
  return (
    <div className={`sp-posters${small ? " is-small" : ""}`}>
      {items.map((it, i) => {
        const inner = (
          <>
            <div className="sp-poster-img">
              {it.image ? <img src={it.image} alt="" loading="lazy" decoding="async" /> : <span>{it.title}</span>}
              {it.badge && <span className="sp-poster-badge">{it.badge}</span>}
            </div>
            <span className="sp-poster-title">{it.title}</span>
            {(it.meta || it.rating) && (
              <span className="sp-poster-meta">
                <Stars value={it.rating} /> {it.meta}
              </span>
            )}
          </>
        );
        return it.url ? (
          <a key={i} className="sp-poster" href={it.url} target="_blank" rel="noopener noreferrer">
            {inner}
          </a>
        ) : (
          <div key={i} className="sp-poster">
            {inner}
          </div>
        );
      })}
    </div>
  );
}
