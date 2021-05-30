import React from "react";
import "./ComingSoon.css";
import SkillSection from "./SkillSection";
import { Fade } from "react-reveal";

export default function ComingSoon(props) {
  const theme = props.theme;
  return (
    <div className="main" id="skills">
      <div className="skills-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="skills-header" style={{ color: theme.text }}>
            Coming Soon.
          </h1>
        </Fade>
      </div>
      <SkillSection theme={theme} />
    </div>
  );
}
