import React from "react";
import "./Header.css";
import { Fade } from "react-awesome-reveal";
import { NavLink, Link } from "react-router-dom";
import { greeting } from "../../config/portfolio.js";

// plants and kitchen are reachable from the secret home cards
const LINKS = [
  { to: "/secret", label: "Home", end: true },
  { to: "/secret/books", label: "Books" },
  { to: "/secret/bookstats", label: "Stats" },
  { to: "/secret/watching", label: "Watching" },
  { to: "/secret/manga", label: "Manga" },
  { to: "/secret/travel", label: "Travel" },
  { to: "/secret/games", label: "Games" },
  { to: "/secret/contact", label: "Contact" },
];

export default function PersonalHeader({ theme }) {
  return (
    <Fade direction="down" duration={500}>
      <div>
        <header className="header personal-header">
          <Link to="/" className="logo">
            <span className="logo-name" style={{ color: theme.text }}>
              {greeting.logo_name}
            </span>
          </Link>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn">
            <span className="navicon"></span>
          </label>
          <ul className="menu" style={{ backgroundColor: theme.body, "--hover": theme.highlight }}>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  style={({ isActive }) => ({ color: isActive ? theme.highlight : theme.text, fontWeight: isActive ? 700 : 400 })}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </header>
      </div>
    </Fade>
  );
}
