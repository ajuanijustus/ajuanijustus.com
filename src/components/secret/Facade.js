import React, { useState } from "react";

// shows a thumbnail first and only loads the player when someone presses play
export default function Facade({ title, thumb, src, source, meta, square, note }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="vd-card">
      <div className={`vd-frame${square ? " is-square" : ""}`}>
        {playing ? (
          <iframe src={src} title={title} allow="autoplay; encrypted-media; clipboard-write; picture-in-picture; fullscreen" allowFullScreen loading="lazy" />
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
      {(source || meta) && <span className="vd-source">{[source, meta].filter(Boolean).join(" · ")}</span>}
      {note && <span className="vd-note">{note}</span>}
    </div>
  );
}
