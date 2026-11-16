import React, { useEffect, useState } from "react";

// natural earth outlines, fetched only when the travel page opens
const MAP_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

const ALIASES = {
  usa: "united states of america",
  "united states": "united states of america",
  us: "united states of america",
  uk: "united kingdom",
  england: "united kingdom",
  scotland: "united kingdom",
  wales: "united kingdom",
  "czech republic": "czechia",
  uae: "united arab emirates",
  "south korea": "south korea",
  "bosnia and herzegovina": "bosnia and herz.",
  "dominican republic": "dominican rep.",
  "democratic republic of the congo": "dem. rep. congo",
};

export const normalise = (name) => {
  const n = name.trim().toLowerCase();
  return ALIASES[n] || n;
};

// natural earth projection
function project([lon, lat]) {
  const l = (lon * Math.PI) / 180;
  const p = (lat * Math.PI) / 180;
  const p2 = p * p;
  const p4 = p2 * p2;
  const x = l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)));
  const y = p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)));
  return [x * 160 + 490, 255 - y * 160];
}

function toPaths(topo) {
  const [sx, sy] = topo.transform.scale;
  const [tx, ty] = topo.transform.translate;
  const arcs = topo.arcs.map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * sx + tx, y * sy + ty];
    });
  });
  const ring = (ids) => {
    const pts = [];
    ids.forEach((i, k) => {
      const a = i < 0 ? [...arcs[~i]].reverse() : arcs[i];
      (k ? a.slice(1) : a).forEach((p) => pts.push(p));
    });
    // countries that cross the date line jump from +180 to -180, start a new piece there
    return (
      pts
        .map((p, k) => {
          const jump = k === 0 || Math.abs(p[0] - pts[k - 1][0]) > 180;
          return (jump ? "M" : "L") + project(p).map((v) => v.toFixed(1)).join(",");
        })
        .join("") + "Z"
    );
  };
  return topo.objects.countries.geometries
    .filter((g) => g.id !== "010" && g.arcs)
    .map((g) => {
      const polys = g.type === "Polygon" ? [g.arcs] : g.arcs;
      return { name: g.properties.name, d: polys.map((rings) => rings.map(ring).join("")).join("") };
    });
}

export default function WorldMap({ visited }) {
  const [paths, setPaths] = useState(null);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(MAP_URL)
      .then((r) => r.json())
      .then((topo) => alive && setPaths(toPaths(topo)))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const byName = new Map(visited.map((v) => [normalise(v.country), v]));

  if (failed) return null;
  return (
    <div className="sp-chart tr-map">
      <svg viewBox="0 0 980 500" role="img" aria-label="map of countries i've visited" onMouseLeave={() => setActive(null)}>
        {paths ? (
          paths.map((p) => {
            const v = byName.get(p.name.toLowerCase());
            return (
              <path
                key={p.name}
                d={p.d}
                className={v ? "tr-land is-visited" : "tr-land"}
                onMouseEnter={() => setActive(v ? v : { country: p.name, none: true })}
                onClick={() => setActive(v ? v : { country: p.name, none: true })}
              />
            );
          })
        ) : (
          <text x="490" y="250" textAnchor="middle" className="axis">
            loading the map...
          </text>
        )}
      </svg>
      <div className="sp-readout" style={{ textAlign: "center" }}>
        {active ? (
          active.none ? (
            `${active.country}: not yet`
          ) : (
            <>
              <strong>
                {active.flag ? `${active.flag} ` : ""}
                {active.country}
              </strong>
              {active.year ? `, ${active.year}` : ""}
              {active.note ? `: ${active.note}` : ""}
            </>
          )
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
