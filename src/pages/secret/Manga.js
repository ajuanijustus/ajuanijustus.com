import React from "react";
import SecretPage, { Section, Tiles, Tile, PosterGrid, Empty } from "../../components/secret/SecretPage";
import manga from "../../data/manga.json";

const card = (x) => ({
  title: x.title,
  image: x.poster,
  url: x.url,
  rating: x.score ? x.score / 2 : null,
  meta: x.status === "reading" && x.progress ? `ch ${x.progress}${x.total ? ` / ${x.total}` : ""}` : x.year,
});

export default function Manga(props) {
  const items = manga.items;
  const reading = items.filter((x) => x.status === "reading");
  const done = items.filter((x) => x.status === "completed");
  const paused = items.filter((x) => x.status === "paused");
  const chapters = items.reduce((s, x) => s + (x.progress || 0), 0);
  return (
    <SecretPage {...props} title="Manga" subtitle="what i'm reading right now and what i've finished. synced from AniList every night.">
      {!items.length ? (
        <Empty>nothing here yet. this fills in a day after i log something on AniList.</Empty>
      ) : (
        <>
          <Section>
            <Tiles>
              <Tile value={reading.length} label="reading now" />
              <Tile value={done.length} label="finished" />
              <Tile value={chapters.toLocaleString("en-GB")} label="chapters read" />
            </Tiles>
          </Section>
          {reading.length > 0 && (
            <Section title="Reading now">
              <PosterGrid items={reading.map(card)} />
            </Section>
          )}
          {done.length > 0 && (
            <Section title="Finished">
              <PosterGrid small items={done.map(card)} />
            </Section>
          )}
          {paused.length > 0 && (
            <Section title="On hold">
              <PosterGrid small items={paused.map(card)} />
            </Section>
          )}
        </>
      )}
    </SecretPage>
  );
}
