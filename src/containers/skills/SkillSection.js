import React, { Component } from "react";
import "./Skills.css";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { skills } from "../../portfolio";
import { Fade } from 'react-awesome-reveal';

import DataScienceImg from "./DataScienceImg";
import FullStackImg from "./FullStackImg";
import CloudInfraImg from "./CloudInfraImg";
import DesignImg from "./DesignImg";
import studentSvg from "../../assests/images/student.svg";
import hobbiesSvg from "../../assests/images/hobbies.svg";

function GetSkillSvg(props) {
  if (props.fileName === "DataScienceImg")
    return <DataScienceImg theme={props.theme} />;
  else if (props.fileName === "FullStackImg")
    return <FullStackImg theme={props.theme} />;
  else if (props.fileName === "CloudInfraImg")
    return <CloudInfraImg theme={props.theme} />;
  else if (props.fileName === "StudentImg")
    return <img alt="aju student" src={studentSvg} />;
  else if (props.fileName === "HobbiesImg")
    return <img alt="aju hobbies" src={hobbiesSvg} />;
  return <DesignImg theme={props.theme} />;
}

class SkillSection extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div>
        {skills.data.map((skill, index) => {
          return (
            <div className="skills-main-div" key={index}>
              {/* Image is on the left, so it should slide rightward into place */}
              <Fade direction="right" duration={2000}>
                <div className="skills-image-div">
                  <GetSkillSvg fileName={skill.fileName} theme={theme} />
                </div>
              </Fade>
              
              <div className="skills-text-div">
                {/* Text is on the right, so it should slide leftward into place */}
                <Fade direction="left" duration={1000}>
                  <h1 className="skills-heading" style={{ color: theme.text }}>
                    {skill.title}
                  </h1>
                </Fade>
                
                {/* Wrapped in a div so custom component doesn't drop the animation styles */}
                <Fade direction="left" duration={1500}>
                  <div>
                    <SoftwareSkill logos={skill.softwareSkills} />
                  </div>
                </Fade>
                
                {/* Wrapped in a div so the mapping array animates cleanly as a single block */}
                <Fade direction="left" duration={2000}>
                  <div>
                    {skill.skills.map((skillSentence, sIndex) => {
                      return (
                        <p
                          key={sIndex}
                          className="subTitle skills-text"
                          style={{ color: theme.secondaryText }}
                        >
                          {skillSentence}
                        </p>
                      );
                    })}
                  </div>
                </Fade>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SkillSection;
