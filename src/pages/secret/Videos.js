import React, { useState } from "react";
import SecretPage, { Section, Empty } from "../../components/secret/SecretPage";
import media from "../../data/media.json";
import "./secret-pages.css";

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

export default function Videos(props) {
  const { youtube, twitch, photos } = media;
  const host = typeof window !== "undefined" ? window.location.hostname : "www.ajuanijustus.com";
  return (
    <SecretPage
      {...props}
      title="Videos"
      subtitle={
        <>
          bits from my <a href="https://www.youtube.com/@ajewdor" target="_blank" rel="noopener noreferrer">YouTube</a> and{" "}
          <a href="https://www.twitch.tv/ajewdor" target="_blank" rel="noopener noreferrer">Twitch</a>.
        </>
      }
    >
      {!youtube.length && !twitch.length && !photos.length && <Empty>coming soon.</Empty>}
      {(youtube.length > 0 || twitch.length > 0) && (
        <Section>
          <div className="vd-grid">
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
                thumb={c.thumb ? `${process.env.PUBLIC_URL}/secret/videos/${c.thumb}` : null}
                src={`https://clips.twitch.tv/embed?clip=${c.clip}&parent=${host}&autoplay=true`}
              />
            ))}
          </div>
        </Section>
      )}
      {photos.length > 0 && (
        <Section title="Photos" desc={<>more on <a href="https://www.instagram.com/ajuanijustus/" target="_blank" rel="noopener noreferrer">Instagram</a>.</>}>
          <div className="ph-wall">
            {photos.map((p) => (
              <a key={p.file} href={p.link || "https://www.instagram.com/ajuanijustus/"} target="_blank" rel="noopener noreferrer">
                <img src={`${process.env.PUBLIC_URL}/secret/photos/${p.file}`} alt={p.alt || ""} loading="lazy" />
              </a>
            ))}
          </div>
        </Section>
      )}
    </SecretPage>
  );
}
