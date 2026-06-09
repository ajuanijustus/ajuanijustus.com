import React from "react";
import "./SoftwareSkill.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class SoftwareSkill extends React.Component {
  // ⚡ Force icon scan when the component first appears on screen
  componentDidMount() {
    try {
      if (window.Iconify) {
        window.Iconify.scan();
      }
    } catch (e) {
      console.error("Iconify failed to scan on mount:", e);
    }
  }

  // ⚡ Force icon scan if the skills change or finish loading late
  componentDidUpdate() {
    try {
      if (window.Iconify) {
        window.Iconify.scan();
      }
    } catch (e) {
      console.error("Iconify failed to scan on update:", e);
    }
  }

  render() {
    return (
      <div>
        <div className="software-skills-main-div">
          <ul className="dev-icons">
            {this.props.logos && this.props.logos.map((logo, index) => {
              return (
                <OverlayTrigger
                  key={logo.skillName || index}
                  placement={"top"}
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      <strong>{logo.skillName}</strong>
                    </Tooltip>
                  }
                >
                  <li className="software-skill-inline" name={logo.skillName}>
                    <span
                      className="iconify"
                      data-icon={logo.fontAwesomeClassname}
                      style={logo.style}
                      data-inline="false"
                    ></span>
                  </li>
                </OverlayTrigger>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default SoftwareSkill;