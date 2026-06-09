import React from "react";
import "./Teaching.css";
import { teaching } from "../../../config/portfolio";
import { Fade } from "react-awesome-reveal";

export default function Teaching(props) {
  const theme = props.theme;

  if (!teaching || teaching.length === 0) return null;

  return (
    /* Outer structural layout wrapper remains static on the page */
    <div className="teaching-main-div" id="teaching">
      
      {/* 1. Header Animation Block */}
      <Fade direction="up" duration={1200}>
        <div className="teaching-header-div">
          <h1 className="teaching-heading" style={{ color: theme.text }}>
            Teaching
          </h1>
        </div>
      </Fade>

      {/* 2. Body List Animation Block */}
      <div className="teaching-body-div">
        <Fade direction="up" duration={1500}>
          {/* Inner block wrapper ensures layout widths remain uncollapsed */}
          <div className="teaching-list-container">
            {teaching.map((item, index) => {
              return (
                <div className="teaching-item-row" key={index}>
                  
                  {/* Left Column: Timeline Bounds */}
                  <div className="teaching-duration-col">
                    <span className="teaching-duration-text" style={{ color: theme.highlight }}>
                      {item.duration}
                    </span>
                  </div>

                  {/* Right Column: Role Title, Course Context & Affiliation */}
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
        </Fade>
      </div>

    </div>
  );
}