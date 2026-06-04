import React, { Component } from "react";
import "./Skills.css";
import SoftwareSkill from "../../../components/softwareSkills/SoftwareSkill";
import { skills } from "../../../config/portfolio";
import { Fade } from 'react-awesome-reveal';

import DataScienceImg from "./DataScienceImg";
import FullStackImg from "./FullStackImg";
import CloudInfraImg from "./CloudInfraImg";
import DesignImg from "./DesignImg";
import studentSvg from "../../../assets/images/student.svg";
import hobbiesSvg from "../../../assets/images/hobbies.svg";

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
              
              {/* Image Column: Keeps layout stable, contents animate */}
              <div className="skills-image-div">
                <Fade direction="left" duration={2000} triggerOnce>
                  <div>
                    <GetSkillSvg fileName={skill.fileName} theme={theme} />
                  </div>
                </Fade>
              </div>
              
              {/* Text Column: Keeps layout stable, contents animate */}
              <div className="skills-text-div">
                <Fade direction="right" duration={1500} triggerOnce>
                  {/* Single block wrapper ensures width never collapses to 0px */}
                  <div style={{ width: "100%" }}>
                    <h1 className="skills-heading" style={{ color: theme.text }}>
                      {skill.title}
                    </h1>
                    
                    <SoftwareSkill logos={skill.softwareSkills} />
                    
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
