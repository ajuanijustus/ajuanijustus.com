import React from "react";
import "./Publications.css";
import { publications } from "../../../config/portfolio";
import { Fade } from "react-awesome-reveal";

export default function Publications(props) {
  const theme = props.theme;

  if (!publications || publications.length === 0) return null;

  return (
    /* Outer structural wrapper remains static to maintain perfect page layout rules */
    <div className="publications-main-div" id="publications">
      
      {/* 1. Header Animation Block */}
      <Fade direction="up" duration={1200} fraction={0.2}>
        <div className="publications-header-div">
          <h1 className="publications-heading" style={{ color: theme.text }}>
            Selected Publications
          </h1>
        </div>
      </Fade>

      {/* 2. Body List Animation Block */}
      <div className="publications-body-div">
        <Fade direction="up" duration={1500} fraction={0.1}>
          {/* Inner block container prevents flex-child collapse glitches */}
          <div className="publications-list-container">
            {publications.map((pub, index) => {
              return (
                <div className="pub-item-row" key={index}>
                  
                  {/* Left Column: Fixed Venue Identifier Tag */}
                  <div className="pub-venue-col">
                    <span 
                      className="pub-venue-badge"
                      style={{ 
                        background: theme.highlight, 
                        color: theme.body 
                      }}
                    >
                      {pub.venue}
                    </span>
                  </div>

                  {/* Right Column: Title, Authors, Citation Meta & Links */}
                  <div className="pub-details-col">
                    <h3 className="pub-title" style={{ color: theme.text }}>
                      {pub.title}
                    </h3>
                    
                    <p className="pub-authors" style={{ color: theme.text }}>
                      {/* Splitting logic maps through strings to explicitly bold your identity */}
                      {pub.authors.split("Aju Ani Justus").map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && <strong>Aju Ani Justus</strong>}
                        </React.Fragment>
                      ))}
                    </p>

                    <p className="pub-full-venue" style={{ color: theme.secondaryText }}>
                      {pub.fullVenue}
                    </p>

                    {/* Action Item Nodes */}
                    <div className="pub-links-div">
                      {pub.links.pdf && (
                        <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" style={{ color: theme.highlight }}>
                          [PDF]
                        </a>
                      )}
                      {pub.links.code && (
                        <a href={pub.links.code} target="_blank" rel="noopener noreferrer" style={{ color: theme.highlight }}>
                          [Code]
                        </a>
                      )}
                      {pub.links.website && (
                        <a href={pub.links.website} target="_blank" rel="noopener noreferrer" style={{ color: theme.highlight }}>
                          [Website]
                        </a>
                      )}
                      {pub.links.bibtex && (
                        <a href={pub.links.bibtex} style={{ color: theme.highlight }}>
                          [BibTeX]
                        </a>
                      )}
                    </div>
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