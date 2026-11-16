import React from "react";
import SecretPage, { Section, Tiles, Tile } from "../../components/secret/SecretPage";
import WorldMap from "./WorldMap";
import travel from "../../data/travel.json";
import "./secret-pages.css";

const COUNTRIES_IN_THE_WORLD = 195;

export default function Travel(props) {
  const { visited, next } = travel;
  const years = visited.map((v) => v.year).filter(Boolean);
  return (
    <SecretPage {...props} title="Travel" subtitle="places i've been. tap a country on the map.">
      <Section>
        <WorldMap visited={visited} />
      </Section>
      <Section>
        <Tiles>
          <Tile value={visited.length} label={visited.length === 1 ? "country" : "countries"} />
          <Tile value={`${Math.round((visited.length / COUNTRIES_IN_THE_WORLD) * 100)}%`} label="of the world" foot="plenty left" />
          {years.length > 0 && <Tile value={Math.max(...years)} label="latest new country" />}
        </Tiles>
      </Section>
      <div className="sp-row">
        <Section title="Been there">
          <ul className="tr-list">
            {visited.map((v) => (
              <li key={v.country}>
                <strong>
                  {v.flag && <span className="tr-flag">{v.flag}</span>}
                  {v.country}
                </strong>
                <span>{[v.year, v.note].filter(Boolean).join(" · ")}</span>
              </li>
            ))}
          </ul>
        </Section>
        {next && next.length > 0 && (
          <Section title="Next up">
            <ul className="tr-list">
              {next.map((n) => (
                <li key={n}>
                  <strong>{n}</strong>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </SecretPage>
  );
}
