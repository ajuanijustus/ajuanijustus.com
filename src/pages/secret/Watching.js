import React, { useState } from "react";
import SecretPage, { Section, Tiles, Tile, Tabs, PosterGrid, Empty } from "../../components/secret/SecretPage";
import { Bars, HBars } from "../../components/secret/charts";
import movies from "../../data/movies.json";
import tv from "../../data/tv.json";
import anime from "../../data/anime.json";
import "./secret-pages.css";

const DROPPED =
  "and how far i got, where i remember. if it says not logged, i don't remember exactly, but i watched a good chunk of it, or everything that was out at the time, before i dropped it. trust me bro.";

const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

let languageNames = null;
try {
  languageNames = new Intl.DisplayNames(["en"], { type: "language" });
} catch (e) {}
const languageName = (code) => {
  if (!code) return null;
  try {
    return languageNames ? languageNames.of(code) : code;
  } catch (e) {
    return code;
  }
};

const titleCase = (s) => s.replace(/(^|[\s-])\w/g, (c) => c.toUpperCase());

function tally(values, top = 8) {
  const m = new Map();
  values.filter(Boolean).forEach((v) => m.set(v, (m.get(v) || 0) + 1));
  return [...m]
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([label, value]) => ({ label, value }));
}

function byDecade(items) {
  const m = {};
  items.forEach((x) => x.year && (m[Math.floor(x.year / 10) * 10] = (m[Math.floor(x.year / 10) * 10] || 0) + 1));
  return Object.entries(m)
    .sort()
    .map(([d, v]) => ({ label: `${d}s`, short: `'${String(d).slice(2)}`, value: v }));
}

function Breakdown({ items, unit }) {
  const genres = tally(items.flatMap((x) => (x.genres || []).map((g) => titleCase(g))));
  const languages = tally(items.map((x) => languageName(x.language)));
  const decades = byDecade(items);
  if (!genres.length && languages.length < 2 && decades.length < 2) return null;
  return (
    <div className="sp-row">
      {genres.length > 0 && (
        <Section title="Genres">
          <HBars data={genres} />
        </Section>
      )}
      {languages.length > 1 && (
        <Section title="Languages">
          <HBars data={languages} />
        </Section>
      )}
      {decades.length > 1 && (
        <Section title="By decade">
          <Bars data={decades} height={120} format={(d) => `${d.label}: ${d.value} ${unit}`} />
        </Section>
      )}
    </div>
  );
}

function Movies() {
  const items = movies.items;
  if (!items.length) return <Empty>nothing here yet.</Empty>;
  const rated = items.filter((m) => m.rating);
  const minutes = items.reduce((s, m) => s + (m.runtime || 0), 0);
  const languages = new Set(items.map((m) => m.language).filter(Boolean));
  const years = items.map((m) => m.year).filter(Boolean);
  const favourites = [...rated].sort((a, b) => b.rating - a.rating || (b.year || 0) - (a.year || 0)).slice(0, 12);
  return (
    <>
      <Section>
        <Tiles>
          <Tile value={items.length} label="films" />
          {minutes > 0 && <Tile value={`${Math.round(minutes / 60)}h`} label="of films" foot={`about ${(minutes / 1440).toFixed(1)} days`} />}
          {languages.size > 0 && <Tile value={languages.size} label={languages.size === 1 ? "language" : "languages"} />}
          {years.length > 0 && (
            <Tile
              value={Math.min(...years) === Math.max(...years) ? Math.min(...years) : `${Math.min(...years)}–${Math.max(...years)}`}
              label={Math.min(...years) === Math.max(...years) ? "release year" : "release years"}
            />
          )}
          {rated.length > 0 && <Tile value={`★ ${avg(rated.map((m) => m.rating)).toFixed(1)}`} label="average rating" />}
        </Tiles>
      </Section>
      <Section title="Films" desc="newest releases first.">
        <PosterGrid items={items.map((m) => ({ title: m.title, image: m.poster, rating: m.rating, meta: m.year, badge: m.liked ? "♥" : null }))} />
      </Section>
      <Breakdown items={items} unit="films" />
      {favourites.length > 0 && (
        <Section title="Highest rated">
          <PosterGrid small items={favourites.map((m) => ({ title: m.title, image: m.poster, rating: m.rating }))} />
        </Section>
      )}
    </>
  );
}

function ShowCard({ show }) {
  const left = (show.total || 0) - (show.progress || 0);
  return (
    <article className="tv-card">
      <div className="tv-poster">{show.poster ? <img src={show.poster} alt="" loading="lazy" /> : <span>{show.title}</span>}</div>
      <div className="tv-body">
        <h3>{show.title}</h3>
        <span className="tv-meta">
          {[show.year, show.network, show.showStatus === "ended" || show.showStatus === "canceled" ? show.showStatus : null].filter(Boolean).join(" · ")}
        </span>
        {show.status === "watching" && show.progress === 0 && <span className="tv-left">not started yet</span>}
        {show.status === "watching" && show.progress > 0 && left > 0 && (
          <span className="tv-left">
            {left} episode{left === 1 ? "" : "s"} to go
          </span>
        )}
        {show.status === "dropped" && !show.progress && <span className="tv-left">not logged</span>}
        {show.seasons && show.seasons.length > 0 && !(show.status === "dropped" && !show.progress) && (
          <div className="tv-seasons">
            {show.seasons.map((s) => {
              const full = s.watched >= s.aired;
              const none = s.watched === 0;
              return (
                <span key={s.n} className={`tv-season${full ? " is-full" : none ? " is-none" : ""}`} title={`season ${s.n}: ${s.watched} of ${s.aired}`}>
                  S{s.n}
                  {full ? " ✓" : ` ${s.watched}/${s.aired}`}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}

function Shows() {
  const items = tv.items;
  if (!items.length) return <Empty>nothing here yet.</Empty>;
  const watching = items.filter((x) => x.status === "watching");
  const caughtUp = items.filter((x) => x.status === "caught up");
  const completed = items.filter((x) => x.status === "completed");
  const dropped = items.filter((x) => x.status === "dropped" || x.status === "done");
  const episodes = items.reduce((s, x) => s + (x.progress || 0), 0);
  const minutes = items.reduce((s, x) => s + (x.minutes || 0), 0);
  const group = (title, list, desc) =>
    list.length > 0 && (
      <Section title={title} desc={desc}>
        <div className="tv-grid">
          {list.map((x) => (
            <ShowCard key={x.title} show={x} />
          ))}
        </div>
      </Section>
    );
  return (
    <>
      <Section>
        <Tiles>
          <Tile value={items.length} label="shows" />
          <Tile value={episodes.toLocaleString("en-GB")} label="episodes watched" />
          {minutes > 0 && <Tile value={`${Math.round(minutes / 60)}h`} label="of tv" foot={`about ${(minutes / 1440).toFixed(1)} days`} />}
        </Tiles>
      </Section>
      {group("Still watching", watching, "shows with episodes i haven't seen yet, new seasons, and ones i'm about to start.")}
      {group("Caught up", caughtUp, "seen everything that's out so far. these move back up when a new season drops.")}
      {group("Completed", completed, "seen it all.")}
      {group("Dropped", dropped, DROPPED)}
      <Breakdown items={items} unit="shows" />
    </>
  );
}

function Anime() {
  const items = anime.items;
  if (!items.length) return <Empty>nothing here yet.</Empty>;
  const now = items.filter((x) => x.status === "watching");
  const done = items.filter((x) => x.status === "completed");
  const paused = items.filter((x) => x.status === "paused");
  const dropped = items.filter((x) => x.status === "dropped");
  const scored = items.filter((x) => x.score);
  const total = items.reduce((s, x) => s + (x.progress || 0), 0);
  const minutes = items.reduce((s, x) => s + (x.minutes || 0), 0);
  const card = (x) => ({
    title: x.title,
    image: x.poster,
    rating: x.score ? x.score / 2 : null,
    meta:
      x.status === "dropped" && !x.progress
        ? "not logged"
        : x.status !== "completed" && x.progress
        ? `ep ${x.progress}${x.total ? ` / ${x.total}` : ""}`
        : x.year,
  });
  return (
    <>
      <Section>
        <Tiles>
          <Tile value={now.length} label="watching" />
          <Tile value={done.length} label="finished" />
          <Tile value={total.toLocaleString("en-GB")} label="episodes watched" />
          {minutes > 0 && <Tile value={`${Math.round(minutes / 60)}h`} label="watch time" foot={`about ${(minutes / 1440).toFixed(1)} days`} />}
          {scored.length > 0 && <Tile value={`★ ${(avg(scored.map((x) => x.score)) / 2).toFixed(1)}`} label="average score" />}
        </Tiles>
      </Section>
      {now.length > 0 && (
        <Section title="Watching">
          <PosterGrid items={now.map(card)} />
        </Section>
      )}
      {done.length > 0 && (
        <Section title="Finished" desc="newest releases first.">
          <PosterGrid small items={done.map(card)} />
        </Section>
      )}
      {paused.length > 0 && (
        <Section title="On hold">
          <PosterGrid small items={paused.map(card)} />
        </Section>
      )}
      {dropped.length > 0 && (
        <Section title="Dropped" desc={DROPPED}>
          <PosterGrid small items={dropped.map(card)} />
        </Section>
      )}
      <Breakdown items={items} unit="anime" />
    </>
  );
}

export default function Watching(props) {
  const [tab, setTab] = useState(movies.items.length || (!tv.items.length && !anime.items.length) ? "movies" : tv.items.length ? "tv" : "anime");
  return (
    <SecretPage {...props} title="Watching" subtitle="films, shows and anime. i only update this every so often, and backlog things as i remember them, so it's far from everything.">
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
      {tab === "tv" && <Shows />}
      {tab === "anime" && <Anime />}
    </SecretPage>
  );
}
