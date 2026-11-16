import React from "react";
import { Link } from "react-router-dom";
import SecretPage, { Section } from "../../components/secret/SecretPage";
import books from "../../data/books.json";
import movies from "../../data/movies.json";
import tv from "../../data/tv.json";
import anime from "../../data/anime.json";
import manga from "../../data/manga.json";
import travel from "../../data/travel.json";
import games from "../../data/games.json";
import plants from "../../data/plants.json";
import recipes from "../../data/recipes.json";
import media from "../../data/media.json";

const read = books.filter((b) => b.shelf === "read" || b.shelf === "before-goodreads");
const reading = books.find((b) => b.shelf === "currently-reading");
const watchedCounts = [
  [movies.items.length, "film"],
  [tv.items.length, "show"],
  [anime.items.length, "anime"],
]
  .filter(([n]) => n)
  .map(([n, w]) => `${n} ${w}${n === 1 || w === "anime" ? "" : "s"}`)
  .join(", ");
const readingManga = manga.items.find((x) => x.status === "reading");

const sections = [
  {
    to: "/secret/books",
    icon: "📚",
    title: "Bookshelf",
    teaser: reading ? `${read.length} books read. reading ${reading.title} right now.` : `${read.length} books read, with my reviews.`,
  },
  { to: "/secret/bookstats", icon: "📊", title: "Reading stats", teaser: "every chart i could squeeze out of my reading history." },
  {
    to: "/secret/watching",
    icon: "🎬",
    title: "Watching",
    teaser: watchedCounts ? `${watchedCounts} so far.` : "films, shows and anime.",
    soon: !movies.items.length && !tv.items.length && !anime.items.length,
  },
  {
    to: "/secret/manga",
    icon: "🗯️",
    title: "Manga",
    teaser: readingManga ? `reading ${readingManga.title}.` : "what i'm reading and what i've finished.",
    soon: !manga.items.length,
  },
  {
    to: "/secret/travel",
    icon: "🌍",
    title: "Travel",
    teaser: `${travel.visited.length} ${travel.visited.length === 1 ? "country" : "countries"} so far.`,
  },
  { to: "/secret/games", icon: "🎮", title: "Games", teaser: "favourites, and why.", soon: !games.games.length },
  { to: "/secret/plants", icon: "🪴", title: "Plants", teaser: plants.plants.length ? `${plants.plants.length} plants, all still alive.` : "the green roommates.", soon: !plants.plants.length },
  { to: "/secret/kitchen", icon: "🍳", title: "Kitchen", teaser: recipes.length ? `${recipes.length} go-to recipes.` : "my go-to recipes.", soon: !recipes.length },
  {
    to: "/secret/videos",
    icon: "📺",
    title: "Videos",
    teaser: "streams, clips and videos.",
    soon: !media.youtube.length && !media.twitch.length,
  },
];

export default function SecretHome(props) {
  return (
    <SecretPage
      {...props}
      title="You found it"
      subtitle="this is the part of the site that's just for fun: what i'm reading, watching, playing, growing and cooking. i update it every now and then, and backlog things as i remember them, so it's never quite complete."
    >
      <Section>
        <div className="sp-cards">
          {sections.map((s) => (
            <Link key={s.to} to={s.to} className={`sp-card${s.soon ? " is-soon" : ""}`}>
              {s.soon && <span className="sp-card-soon">soon</span>}
              <span className="sp-card-icon" aria-hidden="true">
                {s.icon}
              </span>
              <span className="sp-card-title">{s.title}</span>
              <span className="sp-card-teaser">{s.teaser}</span>
            </Link>
          ))}
        </div>
      </Section>
    </SecretPage>
  );
}
