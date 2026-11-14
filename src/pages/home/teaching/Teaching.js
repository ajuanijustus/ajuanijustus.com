import React from "react";
import "./Teaching.css";
import { teaching } from "../../../config/portfolio";
import { Fade } from "react-awesome-reveal";

export default function Teaching(props) {
  const theme = props.theme;

  if (!teaching || teaching.length === 0) return null;

  return (
    <div className="teaching-main-div" id="teaching">
      
      <Fade>
        <div className="teaching-header-div">
          <h1 className="teaching-heading" style={{ color: theme.text }}>
            Teaching
          </h1>
        </div>

        <div className="teaching-body-div">
            <div className="teaching-list-container">
              {teaching.map((item, index) => {
                return (
                  <div className="teaching-item-row" key={index}>
                    
                    <div className="teaching-duration-col">
                      <span className="teaching-duration-text" style={{ color: theme.highlight }}>
                        {item.duration}
                      </span>
                    </div>

                    <div className="teaching-details-col">
                      <p className="teaching-text" style={{ color: theme.text }}>
                        <span className="teaching-role" style={{ color: theme.text }}>
                          {item.role}
                        </span>
                        <span className="teaching-meta" style={{ color: theme.secondaryText }}>
                          {" "}— {item.course} at {item.institution}
                        </span>
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
        </div>
      </Fade>
    </div>
  );
}