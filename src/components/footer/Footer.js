import React from "react";
import "./Footer.css";
import { Fade } from 'react-awesome-reveal';
import { lightTheme } from "../../config/theme";
import styled from "styled-components";

// We keep ONLY the dynamic icon styling here because it needs your JS theme variables
const ThemeIcon = styled.svg`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  /* Bumped inactive opacity from 0.4 to 0.6 so it doesn't disappear */
  opacity: ${(props) => (props.$isActive ? 1 : 0.6)};
  
  /* Linked inactive state to secondaryText so it matches your copyright text perfectly */
  stroke: ${(props) => (props.$isActive ? props.theme.highlight : (props.theme.secondaryText || props.theme.text))};
  
  &:hover {
    opacity: 1;
    transform: scale(1.15);
    stroke: ${(props) => props.theme.highlight};
  }
`;

export default function Footer(props) {
  const isLightTheme = props.theme === lightTheme;

  return (
    <div className="footer-div">
      <Fade>
        <div className="footer-wrapper">
          
          <ThemeIcon
            theme={props.theme}
            $isActive={isLightTheme}
            onClick={() => { 
              if (!isLightTheme) props.onToggle(); 
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </ThemeIcon>

          {/* Inline margin style removed; handled by Footer.css now */}
          <p className="footer-text" style={{ color: props.theme.secondaryText }}>
            aju ani justus © 2026
          </p>

          <ThemeIcon
            theme={props.theme}
            $isActive={!isLightTheme}
            onClick={() => { 
              if (isLightTheme) props.onToggle(); 
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
          </ThemeIcon>

        </div>
      </Fade>
    </div>
  );
}