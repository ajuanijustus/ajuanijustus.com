import React, { Component } from "react";
import "./ComingSoon.css";
import { Fade } from "react-reveal";

class SkillSection extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div>
        <div className="skills-main-div">
          <div className="skills-text-div">
            <Fade right duration={2000}>
              <p
                className="subTitle skills-text"
                style={{ color: theme.secondaryText }}
              >
                ___________________________________________________________________________________________________________________________
              </p>
            </Fade>
          </div>
        </div>
      </div>
    );
  }
}

export default SkillSection;
