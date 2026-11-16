import React from "react";
import { Fade } from "react-awesome-reveal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import "./academic.css";

export default function AcademicPage({ theme, onToggle, title, intro, children }) {
  return (
    <>
      <Header theme={theme} />
      <main
        className="ac-page"
        style={{ "--fg": theme.text, "--muted": theme.secondaryText, "--accent": theme.highlight, "--line": theme.text + "1f" }}
      >
        <Fade triggerOnce>
          <h1 className="ac-title">{title}</h1>
          {intro && <div className="ac-intro">{intro}</div>}
        </Fade>
        {children}
      </main>
      <Footer theme={theme} onToggle={onToggle} />
      <TopButton theme={theme} />
    </>
  );
}

export function AcSection({ title, children }) {
  return (
    <section className="ac-section">
      <Fade triggerOnce>
        <h2 className="ac-h2">{title}</h2>
        {children}
      </Fade>
    </section>
  );
}

// date on the left, text on the right, like the news list
export function AcRows({ rows }) {
  return (
    <div className="ac-rows">
      {rows.map((r, i) => (
        <div className="ac-row" key={i}>
          <span className="ac-when">{r.when}</span>
          <div className="ac-what">
            <span className="ac-what-title">{r.title}</span>
            {r.sub && <span className="ac-what-sub">{r.sub}</span>}
            {r.detail && <p className="ac-what-detail">{r.detail}</p>}
            {r.link && (
              <a href={r.link} target="_blank" rel="noopener noreferrer" className="ac-link">
                [{r.linkLabel || "Link"}]
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
