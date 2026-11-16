import React, { useState } from "react";
import SecretPage, { Section } from "../../components/secret/SecretPage";
import games from "../../data/games.json";
import media from "../../data/media.json";
import "./secret-pages.css";

// steam game: give its app id (the number in the store url) and the cover comes from steam.
// anything else: put an image in public/secret/games/ and set "cover" to the file name.
const coverOf = (g) =>
  g.cover
    ? `${process.env.PUBLIC_URL}/secret/games/${g.cover}`
    : g.steam
    ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.steam}/header.jpg`
    : null;

// shows a thumbnail first and only loads the player when someone presses play
function Facade({ title, thumb, src, source }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="vd-card">
      <div className="vd-frame">
        {playing ? (
          <iframe src={src} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <>
            {thumb && <img src={thumb} alt="" loading="lazy" />}
            <button className="vd-play" onClick={() => setPlaying(true)} aria-label={`play ${title}`}>
              <span>▶</span>
            </button>
          </>
        )}
      </div>
      <span className="vd-title">{title}</span>
      <span className="vd-source">{source}</span>
    </div>
  );
}

export default function Games(props) {
  const { youtube, twitch } = media;
  const host = typeof window !== "undefined" ? window.location.hostname : "www.ajuanijustus.com";
  return (
    <SecretPage {...props} title="Games" subtitle="the ones that stuck with me, and where i stream them.">
      <Section title="Favourites">
        <div className="gm-grid">
          {games.games.map((g) => {
            const cover = coverOf(g);
            return (
              <article className="gm-card" key={g.title}>
                <div className={`gm-cover${cover ? "" : " is-text"}`}>{cover ? <img src={cover} alt="" loading="lazy" /> : <span>{g.title}</span>}</div>
                <div className="gm-body">
                  <h3>{g.title}</h3>
                  {(g.platform || g.year || g.hours) && (
                    <span className="gm-meta">{[g.platform, g.year, g.hours && `${g.hours}h played`].filter(Boolean).join(" · ")}</span>
                  )}
                  {g.note && <p>{g.note}</p>}
                </div>
              </article>
            );
          })}
        </div>
        {games.games.some((g) => g.credit) && (
          <p className="gm-credit">
            {games.games
              .filter((g) => g.credit)
              .map((g, i) => (
                <React.Fragment key={g.title}>
                  {i > 0 && " · "}
                  <a href={g.credit.url} target="_blank" rel="noopener noreferrer">
                    {g.credit.text}
                  </a>
                </React.Fragment>
              ))}
          </p>
        )}
      </Section>

      <Section
        title="Streams and videos"
        desc="i stream as ajewdor and put the odd video up too. i became a Twitch affiliate in 2025, which i'm still quietly proud of."
      >
        <div className="gm-channels">
          <a className="gm-channel" href="https://www.twitch.tv/ajewdor" target="_blank" rel="noopener noreferrer">
            <span className="gm-channel-name">Twitch</span>
            <span className="gm-channel-handle">twitch.tv/ajewdor</span>
            <span className="gm-channel-badge">affiliate</span>
          </a>
          <a className="gm-channel" href="https://www.youtube.com/@ajewdor" target="_blank" rel="noopener noreferrer">
            <span className="gm-channel-name">YouTube</span>
            <span className="gm-channel-handle">youtube.com/@ajewdor</span>
          </a>
        </div>
        {(youtube.length > 0 || twitch.length > 0) && (
          <div className="vd-grid" style={{ marginTop: "2rem" }}>
            {youtube.map((v) => (
              <Facade
                key={v.id}
                title={v.title}
                source="YouTube"
                thumb={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
              />
            ))}
            {twitch.map((c) => (
              <Facade
                key={c.clip}
                title={c.title}
                source="Twitch clip"
                thumb={c.thumb ? `${process.env.PUBLIC_URL}/secret/games/${c.thumb}` : null}
                src={`https://clips.twitch.tv/embed?clip=${c.clip}&parent=${host}&autoplay=true`}
              />
            ))}
          </div>
        )}
      </Section>
    </SecretPage>
  );
}
