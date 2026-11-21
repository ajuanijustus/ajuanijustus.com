import React from "react";
import SecretPage, { Section, Empty } from "../../components/secret/SecretPage";
import Facade from "../../components/secret/Facade";
import live from "../../data/live.json";
import "./secret-pages.css";

const idOf = (url) => (url.match(/playlist\/([A-Za-z0-9]+)/) || [])[1];

// "[LIVE Diary] Laufey – Birmingham, Jul 2025" -> "Laufey – Birmingham"
const clean = (t) => (t || "playlist").replace(/^\[live diary\]\s*/i, "").replace(/,\s*[A-Za-z]{3,5}\.? \d{4}$/, "");

const when = (d) => {
  if (!d) return null;
  const [y, m] = d.split("-");
  return m ? new Date(+y, +m - 1).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : y;
};

export default function Live(props) {
  const shows = live.playlists.filter((p) => idOf(p.url)).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return (
    <SecretPage {...props} title="Live diary" subtitle="concerts and shows i've been to, each with a playlist of what they played. press play to listen.">
      {!shows.length ? (
        <Empty>nothing here yet.</Empty>
      ) : (
        <Section>
          <div className="vd-grid lv-grid">
            {shows.map((p) => (
              <Facade
                key={p.url}
                square
                title={clean(p.title)}
                thumb={p.cover}
                meta={when(p.date)}
                note={p.note}
                src={`https://open.spotify.com/embed/playlist/${idOf(p.url)}?utm_source=generator&theme=0`}
              />
            ))}
          </div>
        </Section>
      )}
    </SecretPage>
  );
}
