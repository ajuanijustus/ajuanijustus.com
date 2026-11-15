import React, { useState } from "react";
import SecretPage, { Section, Tiles, Tile, Tabs, PosterGrid, Empty } from "../../components/secret/SecretPage";
import { Bars } from "../../components/secret/charts";
import movies from "../../data/movies.json";
import tv from "../../data/tv.json";
import anime from "../../data/anime.json";

const thisYear = new Date().getFullYear();
const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

function lastTwelveMonths(dates) {
  const now = new Date();
  const out = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toISOString().slice(0, 7);
    out.push({
      label: d.toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
      short: d.toLocaleDateString("en-GB", { month: "narrow" }),
      value: dates.filter((x) => x && x.startsWith(key)).length,
    });
  }
  return out;
}

function Movies() {
  const items = movies.items;
  if (!items.length) return <Empty>nothing logged yet. films show up here a day after i log them on Letterboxd.</Empty>;
  const rated = items.filter((m) => m.rating);
  const favourites = [...rated].sort((a, b) => b.rating - a.rating || (a.watched < b.watched ? 1 : -1)).slice(0, 12);
  const decades = {};
  items.forEach((m) => m.year && (decades[Math.floor(m.year / 10) * 10] = (decades[Math.floor(m.year / 10) * 10] || 0) + 1));
  return (
    <>
      <Section>
        <Tiles>
          <Tile value={items.length} label="films logged" />
          <Tile value={items.filter((m) => m.watched && m.watched.startsWith(String(thisYear))).length} label={`watched in ${thisYear}`} />
          <Tile value={rated.length ? `★ ${avg(rated.map((m) => m.rating)).toFixed(1)}` : "–"} label="average rating" />
          <Tile value={items.filter((m) => m.rewatch).length} label="rewatches" foot="some films deserve it" />
        </Tiles>
      </Section>
      <Section title="Recently watched">
        <PosterGrid
          items={items.slice(0, 18).map((m) => ({ title: m.title, image: m.poster, url: m.url, rating: m.rating, meta: m.year, badge: m.liked ? "♥" : null }))}
        />
      </Section>
      <div className="sp-row">
        <Section title="Films per month">
          <Bars data={lastTwelveMonths(items.map((m) => m.watched))} height={120} format={(d) => `${d.label}: ${d.value} films`} />
        </Section>
        <Section title="By decade">
          <Bars
            data={Object.entries(decades)
              .sort()
              .map(([d, v]) => ({ label: `${d}s`, short: `'${String(d).slice(2)}`, value: v }))}
            height={120}
            format={(d) => `${d.label}: ${d.value} films`}
          />
        </Section>
      </div>
      {favourites.length > 0 && (
        <Section title="Highest rated">
          <PosterGrid small items={favourites.map((m) => ({ title: m.title, image: m.poster, url: m.url, rating: m.rating }))} />
        </Section>
      )}
    </>
  );
}

function Shows({ data, unit, source }) {
  const items = data.items;
  if (!items.length) return <Empty>nothing here yet. this fills in a day after i log something on {source}.</Empty>;
  const now = items.filter((x) => x.status === "watching");
  const done = items.filter((x) => x.status === "completed");
  const scored = items.filter((x) => x.score);
  const total = items.reduce((s, x) => s + (x.progress || 0), 0);
  const minutes = items.reduce((s, x) => s + (x.minutes || 0), 0);
  const card = (x) => ({
    title: x.title,
    image: x.poster,
    url: x.url,
    rating: x.score ? x.score / 2 : null,
    meta: x.status === "watching" && x.progress ? `${unit} ${x.progress}${x.total ? ` / ${x.total}` : ""}` : x.year,
  });
  return (
    <>
      <Section>
        <Tiles>
          <Tile value={now.length} label="watching now" />
          <Tile value={done.length} label="finished" />
          <Tile value={total.toLocaleString("en-GB")} label={`${unit}s watched`} />
          {minutes > 0 && <Tile value={`${Math.round(minutes / 60)}h`} label="watch time" foot={`about ${Math.round(minutes / 1440)} days`} />}
          {scored.length > 0 && <Tile value={`★ ${(avg(scored.map((x) => x.score)) / 2).toFixed(1)}`} label="average score" />}
        </Tiles>
      </Section>
      {now.length > 0 && (
        <Section title="Watching now">
          <PosterGrid items={now.map(card)} />
        </Section>
      )}
      {done.length > 0 && (
        <Section title="Finished">
          <PosterGrid small items={done.map(card)} />
        </Section>
      )}
    </>
  );
}

export default function Watching(props) {
  const [tab, setTab] = useState(movies.items.length || (!tv.items.length && !anime.items.length) ? "movies" : tv.items.length ? "tv" : "anime");
  return (
    <SecretPage {...props} title="Watching" subtitle="films, shows and anime. logged as i go, and pulled in here every night.">
      <Tabs
        tabs={[
          { id: "movies", label: "films" },
          { id: "tv", label: "tv" },
          { id: "anime", label: "anime" },
        ]}
        active={tab}
        onChange={setTab}
      />
      {tab === "movies" && <Movies />}
      {tab === "tv" && <Shows data={tv} unit="episode" source="Trakt" />}
      {tab === "anime" && <Shows data={anime} unit="episode" source="AniList" />}
    </SecretPage>
  );
}
