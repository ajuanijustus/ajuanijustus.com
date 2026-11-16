import React from "react";
import "./Header.css";
import { Fade } from "react-awesome-reveal";
import { NavLink, Link } from "react-router-dom";
import { greeting } from "../../config/portfolio.js";

const LINKS = [
  { to: "/home", label: "Home" },
  { to: "/research", label: "Research" },
  { to: "/teaching", label: "Teaching & Outreach" },
  { to: "/contact", label: "Contact Me" },
];

export default function Header({ theme }) {
  return (
    <Fade direction="down" duration={500}>
      <div>
        <header className="header main-header">
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
                <NavLink to={l.to} style={({ isActive }) => ({ color: theme.text, fontWeight: isActive ? 700 : 400 })}>
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
