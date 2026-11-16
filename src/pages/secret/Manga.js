import React from "react";
import SecretPage, { Section, Tiles, Tile, PosterGrid, Empty } from "../../components/secret/SecretPage";
import manga from "../../data/manga.json";

const DROPPED_MANGA =
  "and how far i got, where i remember. if it says not logged, i don't remember exactly, but i read a good chunk of it, or everything that was out at the time, before i dropped it. trust me bro.";

const card = (x) => ({
  title: x.title,
  image: x.poster,
  rating: x.score ? x.score / 2 : null,
  meta:
    x.status === "dropped" && !x.progress
      ? "not logged"
      : x.status !== "completed" && x.progress
      ? `ch ${x.progress}${x.total ? ` / ${x.total}` : ""}`
      : x.year,
});

export default function Manga(props) {
  const items = manga.items;
  const reading = items.filter((x) => x.status === "reading");
  const done = items.filter((x) => x.status === "completed");
  const paused = items.filter((x) => x.status === "paused");
  const dropped = items.filter((x) => x.status === "dropped");
  const chapters = items.reduce((s, x) => s + (x.progress || 0), 0);
  return (
    <SecretPage {...props} title="Manga" subtitle="what i'm reading, what i've finished and what i gave up on. updated every so often, with older stuff added as i remember it.">
      {!items.length ? (
        <Empty>nothing here yet.</Empty>
      ) : (
        <>
          <Section>
            <Tiles>
              <Tile value={reading.length} label="reading" />
              <Tile value={done.length} label="finished" />
              <Tile value={chapters.toLocaleString("en-GB")} label="chapters read" />
            </Tiles>
          </Section>
          {reading.length > 0 && (
            <Section title="Reading">
              <PosterGrid items={reading.map(card)} />
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
            <Section title="Dropped" desc={DROPPED_MANGA}>
              <PosterGrid small items={dropped.map(card)} />
            </Section>
          )}
        </>
      )}
    </SecretPage>
  );
}
