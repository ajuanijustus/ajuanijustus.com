import React, { useState } from "react";

// small svg charts. colours come from the css vars set by SecretPage

export function Bars({ data, height = 160, labelEvery = 1, format = (d) => `${d.label}: ${d.value}` }) {
  const [active, setActive] = useState(null);
  const w = 600;
  const max = Math.max(...data.map((d) => d.value), 1);
  const gap = data.length > 40 ? 1 : 3;
  const bw = w / data.length;
  return (
    <div className="sp-chart">
      <svg viewBox={`0 0 ${w} ${height + 18}`} role="img" onMouseLeave={() => setActive(null)}>
        <line className="grid" x1="0" x2={w} y1={height + 0.5} y2={height + 0.5} />
        {data.map((d, i) => {
          const h = Math.max((d.value / max) * height, d.value ? 2 : 0);
          return (
            <g key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}>
              <rect x={i * bw} y="0" width={bw} height={height} fill="transparent" />
              <rect
                className={`bar${active !== null && active !== i ? " dim" : ""}`}
                x={i * bw + gap / 2}
                y={height - h}
                width={Math.max(bw - gap, 1)}
                height={h}
                rx="2"
              />
              {i % labelEvery === 0 && (
                <text className="axis" x={i * bw + bw / 2} y={height + 14} textAnchor="middle">
                  {d.short ?? d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="sp-readout">{active !== null ? format(data[active]) : " "}</div>
    </div>
  );
}

export function HBars({ data, max }) {
  const top = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="sp-hbars">
      {data.map((d, i) => (
        <div className="sp-hbar" key={i} title={d.title}>
          <span className="sp-hbar-label">{d.label}</span>
          <span className="sp-hbar-value">{d.display ?? d.value}</span>
          <div className="sp-hbar-track">
            <div className="sp-hbar-fill" style={{ width: `${(d.value / top) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// github style calendar. days = { "2025-03-01": [label, ...] }
export function Heatmap({ year, days }) {
  const [active, setActive] = useState(null);
  const start = new Date(Date.UTC(year, 0, 1));
  const offset = (start.getUTCDay() + 6) % 7; // monday first
  const cells = [];
  for (let d = new Date(start); d.getUTCFullYear() === year; d.setUTCDate(d.getUTCDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    const idx = Math.round((d - start) / 864e5) + offset;
    cells.push({ key, col: Math.floor(idx / 7), row: idx % 7, items: days[key] || [], month: d.getUTCMonth(), date: d.getUTCDate() });
  }
  const s = 11;
  const g = 3;
  const cols = cells[cells.length - 1].col + 1;
  const w = cols * (s + g);
  const monthStarts = cells.filter((c) => c.date === 1);
  return (
    <div className="sp-chart sp-heatmap">
      <svg viewBox={`-22 -16 ${w + 22} ${7 * (s + g) + 16}`} role="img" onMouseLeave={() => setActive(null)}>
        {monthStarts.map((c) => (
          <text key={c.key} className="axis" x={c.col * (s + g)} y="-5">
            {MONTHS[c.month]}
          </text>
        ))}
        {["mon", "", "wed", "", "fri", "", ""].map((l, i) => (
          <text key={i} className="axis" x="-22" y={i * (s + g) + s - 2}>
            {l}
          </text>
        ))}
        {cells.map((c) => (
          <rect
            key={c.key}
            x={c.col * (s + g)}
            y={c.row * (s + g)}
            width={s}
            height={s}
            rx="2.5"
            style={{
              fill: c.items.length ? "var(--accent)" : "var(--line)",
              opacity: c.items.length ? Math.min(0.55 + c.items.length * 0.25, 1) : 1,
              stroke: active === c.key ? "var(--fg)" : "none",
              cursor: c.items.length ? "pointer" : "default",
            }}
            onMouseEnter={() => setActive(c.key)}
            onClick={() => setActive(c.key)}
          />
        ))}
      </svg>
      <div className="sp-readout">
        {active ? (
          (() => {
            const c = cells.find((x) => x.key === active);
            const label = new Date(active).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
            return c.items.length ? (
              <>
                {label}: finished <strong>{c.items.join(", ")}</strong>
              </>
            ) : (
              `${label}: nothing finished`
            );
          })()
        ) : (
          " "
        )}
      </div>
    </div>
  );
}

function arc(cx, cy, r, a0, a1) {
  const p = (a) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1}`;
}

// alternate red and the text colour so neighbouring slices stay distinct in both themes
const SHADES = [
  ["var(--accent)", 1],
  ["var(--fg)", 0.85],
  ["var(--accent)", 0.45],
  ["var(--fg)", 0.4],
  ["var(--fg)", 0.18],
];
const shade = (i) => SHADES[Math.min(i, SHADES.length - 1)];

export function Donut({ data, center, sub }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let a = 0;
  return (
    <div className="sp-donut">
      <svg viewBox="0 0 120 120" role="img">
        <circle cx="60" cy="60" r="46" fill="none" style={{ stroke: "var(--line)" }} strokeWidth="14" />
        {data.map((d, i) => {
          const a0 = a;
          a += (d.value / total) * Math.PI * 2;
          const a1 = Math.min(a, a0 + Math.PI * 2 - 0.0001);
          return (
            <path
              key={i}
              d={arc(60, 60, 46, a0 + 0.02, a1 - 0.02)}
              fill="none"
              style={{ stroke: shade(i)[0], strokeWidth: 14, opacity: shade(i)[1] }}
            >
              <title>{`${d.label}: ${d.value}`}</title>
            </path>
          );
        })}
        {center !== undefined && (
          <text x="60" y={sub ? 62 : 66} textAnchor="middle" style={{ fill: "var(--fg)", fontSize: 20, fontWeight: 800 }}>
            {center}
          </text>
        )}
        {sub && (
          <text x="60" y="78" textAnchor="middle" style={{ fill: "var(--muted)", fontSize: 9 }}>
            {sub}
          </text>
        )}
      </svg>
      <div className="sp-legend">
        {data.map((d, i) => (
          <span key={i}>
            <i style={{ background: shade(i)[0], opacity: shade(i)[1] }} />
            {d.label} <b style={{ color: "var(--muted)", fontWeight: 500 }}>{d.value}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Ring({ value, max, label, sub }) {
  const pct = Math.min(value / Math.max(max, 1), 1);
  return (
    <div className="sp-donut">
      <svg viewBox="0 0 120 120" role="img">
        <circle cx="60" cy="60" r="48" fill="none" style={{ stroke: "var(--line)" }} strokeWidth="10" />
        {pct > 0 && (
          <path
            d={arc(60, 60, 48, 0, Math.max(pct * Math.PI * 2 - 0.0001, 0.01))}
            fill="none"
            strokeLinecap="round"
            style={{ stroke: "var(--accent)", strokeWidth: 10 }}
          />
        )}
        <text x="60" y="60" textAnchor="middle" style={{ fill: "var(--fg)", fontSize: 24, fontWeight: 800 }}>
          {value}
        </text>
        <text x="60" y="76" textAnchor="middle" style={{ fill: "var(--muted)", fontSize: 10 }}>
          of {max}
        </text>
      </svg>
      <div className="sp-legend">
        <strong style={{ fontSize: 16 }}>{label}</strong>
        {sub && <span style={{ color: "var(--muted)" }}>{sub}</span>}
      </div>
    </div>
  );
}

// bars around a circle, for months or weekdays
export function Radial({ data }) {
  const [active, setActive] = useState(null);
  const max = Math.max(...data.map((d) => d.value), 1);
  // start the scale a bit below the smallest value so small differences still show
  const floor = Math.min(...data.map((d) => d.value)) * 0.6;
  const n = data.length;
  const step = (Math.PI * 2) / n;
  return (
    <div className="sp-chart" style={{ maxWidth: 300 }}>
      <svg viewBox="-110 -110 220 220" role="img" onMouseLeave={() => setActive(null)}>
        <circle r="28" fill="none" style={{ stroke: "var(--line)" }} />
        {data.map((d, i) => {
          const r = 30 + (Math.max(d.value - floor, 0) / Math.max(max - floor, 1)) * 60;
          const a0 = i * step + 0.06;
          const a1 = (i + 1) * step - 0.06;
          const p = (rad, a) => `${rad * Math.sin(a)} ${-rad * Math.cos(a)}`;
          const path = `M ${p(30, a0)} L ${p(r, a0)} A ${r} ${r} 0 0 1 ${p(r, a1)} L ${p(30, a1)} A 30 30 0 0 0 ${p(30, a0)} Z`;
          const mid = (a0 + a1) / 2;
          return (
            <g key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} style={{ cursor: "pointer" }}>
              <path d={path} className={`bar${active !== null && active !== i ? " dim" : ""}`} style={{ fill: "var(--accent)" }} />
              <text className="axis" x={100 * Math.sin(mid)} y={-100 * Math.cos(mid) + 3} textAnchor="middle">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="sp-readout" style={{ textAlign: "center" }}>
        {active !== null ? (
          <>
            {data[active].long || data[active].label}: <strong>{data[active].value}</strong>
          </>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
