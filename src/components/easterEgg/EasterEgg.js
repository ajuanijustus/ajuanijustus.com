import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EasterEgg.css";

const SIZE = 5;
const START = [0, 0];
const GOAL = [4, 4];
const WORK = [2, 3];
const WALLS = ["1,1", "2,1", "3,3", "1,3"];
const STEP_COST = 0.04;
const FACE = `${process.env.PUBLIC_URL}/favicon-96x96.png`;
const TREATS = ["📚", "🎬", "🎮", "🍿"];

const MOVES = {
  ArrowUp: [-1, 0], w: [-1, 0],
  ArrowDown: [1, 0], s: [1, 0],
  ArrowLeft: [0, -1], a: [0, -1],
  ArrowRight: [0, 1], d: [0, 1],
};

const same = (a, b) => a[0] === b[0] && a[1] === b[1];

function GridWorld({ theme, onClose }) {
  const navigate = useNavigate();
  const [pos, setPos] = useState(START);
  const [episode, setEpisode] = useState(1);
  const [steps, setSteps] = useState(0);
  const [status, setStatus] = useState("playing");
  const [treat] = useState(() => TREATS[Math.floor(Math.random() * TREATS.length)]);
  const touchStart = useRef(null);

  const move = useCallback(
    ([dr, dc]) => {
      if (status !== "playing") return;
      const next = [pos[0] + dr, pos[1] + dc];
      if (next[0] < 0 || next[1] < 0 || next[0] >= SIZE || next[1] >= SIZE) return;
      if (WALLS.includes(next.join(","))) return;
      setPos(next);
      setSteps((s) => s + 1);
      if (same(next, WORK)) setStatus("fell");
      if (same(next, GOAL)) setStatus("won");
    },
    [pos, status]
  );

  useEffect(() => {
    if (status === "fell") {
      const t = setTimeout(() => {
        setPos(START);
        setSteps(0);
        setEpisode((e) => e + 1);
        setStatus("playing");
      }, 1200);
      return () => clearTimeout(t);
    }
    if (status === "won") {
      const t = setTimeout(() => {
        onClose();
        navigate("/secret/");
      }, 1600);
      return () => clearTimeout(t);
    }
  }, [status, navigate, onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      const dir = MOVES[e.key] || MOVES[e.key.toLowerCase()];
      if (dir) {
        e.preventDefault();
        move(dir);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, onClose]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = [t.clientX, t.clientY];
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current[0];
    const dy = t.clientY - touchStart.current[1];
    touchStart.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) move([0, dx > 0 ? 1 : -1]);
    else move([dy > 0 ? 1 : -1, 0]);
  };

  const ret = status === "won" ? 1 - steps * STEP_COST : status === "fell" ? -1 - steps * STEP_COST : -steps * STEP_COST;

  let message = `get me to the ${treat}. avoid work.`;
  if (status === "fell") message = "got pulled into work. -1. resetting the episode...";
  if (status === "won") message = "+1 reward. the fun stuff is this way.";

  const cells = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const key = `${r},${c}`;
      let content = null;
      let cls = "egg-cell";
      if (WALLS.includes(key)) cls += " egg-wall";
      if (same([r, c], GOAL)) content = treat;
      if (same([r, c], WORK)) content = "💼";
      cells.push(
        <div
          key={key}
          className={cls}
          style={{ borderColor: theme.secondaryText + "30", backgroundColor: WALLS.includes(key) ? theme.secondaryText + "55" : "transparent" }}
        >
          {content}
        </div>
      );
    }
  }

  return (
    <div className="egg-backdrop" onClick={onClose}>
      <div
        className="egg-panel"
        role="dialog"
        aria-modal="true"
        aria-label="secret grid world"
        style={{ backgroundColor: theme.body, color: theme.text, borderColor: theme.highlight }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="egg-close" onClick={onClose} aria-label="close" style={{ color: theme.secondaryText }}>
          ×
        </button>

        <div className="egg-stats" style={{ color: theme.secondaryText }}>
          <span>episode {episode}</span>
          <span>steps {steps}</span>
          <span>
            return <strong style={{ color: theme.highlight }}>{ret.toFixed(2)}</strong>
          </span>
        </div>

        <div className="egg-board" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {cells}
          <div
            className={`egg-agent${status === "fell" ? " egg-agent-fell" : ""}${status === "won" ? " egg-agent-won" : ""}`}
            style={{ transform: `translate(${pos[1] * 100}%, ${pos[0] * 100}%)` }}
          >
            <img src={FACE} alt="me" draggable="false" />
          </div>
        </div>

        <p className="egg-message" style={{ color: status === "won" ? theme.highlight : theme.text }}>
          {message}
        </p>

        <div className="egg-pad">
          <button onClick={() => move([-1, 0])} style={{ color: theme.text, borderColor: theme.secondaryText + "60" }} aria-label="up">↑</button>
          <div>
            <button onClick={() => move([0, -1])} style={{ color: theme.text, borderColor: theme.secondaryText + "60" }} aria-label="left">←</button>
            <button onClick={() => move([1, 0])} style={{ color: theme.text, borderColor: theme.secondaryText + "60" }} aria-label="down">↓</button>
            <button onClick={() => move([0, 1])} style={{ color: theme.text, borderColor: theme.secondaryText + "60" }} aria-label="right">→</button>
          </div>
        </div>

        <p className="egg-hint" style={{ color: theme.secondaryText }}>arrow keys, wasd, swipe or tap</p>
      </div>
    </div>
  );
}

// opens with 7 taps on the footer © (Footer dispatches "secret:open")
export default function EasterEgg({ theme }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("secret:open", onOpen);
    return () => window.removeEventListener("secret:open", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return open ? <GridWorld theme={theme} onClose={close} /> : null;
}
