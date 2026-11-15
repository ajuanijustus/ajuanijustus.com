import React from "react";
import SecretPage, { Section, Tiles, Tile, Empty } from "../../components/secret/SecretPage";
import plants from "../../data/plants.json";
import "./secret-pages.css";

const daysSince = (date) => Math.max(Math.floor((Date.now() - new Date(date)) / 864e5), 0);

export default function Plants(props) {
  const list = plants.plants;
  const oldest = [...list].filter((p) => p.since).sort((a, b) => (a.since < b.since ? -1 : 1))[0];
  return (
    <SecretPage {...props} title="Plants" subtitle="the green roommates. photos, names and how long i've kept each one alive.">
      {!list.length ? (
        <Empty>coming soon.</Empty>
      ) : (
        <>
          <Section>
            <Tiles>
              <Tile value={list.length} label="plants" />
              {oldest && <Tile value={`${daysSince(oldest.since)}d`} label="longest survivor" foot={oldest.name} />}
            </Tiles>
          </Section>
          <Section>
            <div className="pl-grid">
              {list.map((p) => (
                <article className="pl-card" key={p.name}>
                  <div className="pl-photo">
                    {p.photo ? <img src={`${process.env.PUBLIC_URL}/secret/plants/${p.photo}`} alt={p.name} loading="lazy" /> : "🪴"}
                  </div>
                  <div className="pl-body">
                    <h3>{p.name}</h3>
                    {p.species && <span className="pl-species">{p.species}</span>}
                    <div className="pl-facts">
                      {p.since && (
                        <span>
                          <b>{daysSince(p.since)}</b>days with me
                        </span>
                      )}
                      {p.water && (
                        <span style={{ textAlign: "right" }}>
                          <b>💧</b>
                          {p.water}
                        </span>
                      )}
                    </div>
                    {p.note && <p>{p.note}</p>}
                  </div>
                </article>
              ))}
            </div>
          </Section>
        </>
      )}
    </SecretPage>
  );
}
