import React from "react";
import SecretPage, { Section, Empty } from "../../components/secret/SecretPage";
import games from "../../data/games.json";
import "./secret-pages.css";

// steam game: give its app id (the number in the store url) and the cover comes from steam.
// anything else: put an image in public/secret/games/ and set "cover" to the file name.
const coverOf = (g) =>
  g.cover
    ? `${process.env.PUBLIC_URL}/secret/games/${g.cover}`
    : g.steam
    ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.steam}/header.jpg`
    : null;

export default function Games(props) {
  return (
    <SecretPage {...props} title="Games" subtitle="the ones that stuck with me.">
      <Section>
        {!games.games.length ? (
          <Empty>coming soon.</Empty>
        ) : (
          <div className="gm-grid">
            {games.games.map((g) => {
              const cover = coverOf(g);
              return (
                <article className="gm-card" key={g.title}>
                  <div className="gm-cover">{cover ? <img src={cover} alt="" loading="lazy" /> : g.title}</div>
                  <div className="gm-body">
                    <h3>{g.title}</h3>
                    <span className="gm-meta">{[g.platform, g.year, g.hours && `${g.hours}h played`].filter(Boolean).join(" · ")}</span>
                    {g.note && <p>{g.note}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Section>
    </SecretPage>
  );
}
