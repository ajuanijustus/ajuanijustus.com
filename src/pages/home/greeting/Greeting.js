import React, { useState, useEffect } from "react";
import "./Greeting.css";
import SocialMedia from "../../../components/socialMedia/SocialMedia";
import { greeting, socialMediaLinks } from "../../../config/portfolio";
import { Fade } from "react-awesome-reveal";
import profilePic from "../../../assets/images/linkedin_dp_overlay_round_repos.png";

import myResume from "../../../assets/resume.pdf";

export default function Greeting(props) {
  const theme = props.theme;
  const [seqIndex, setSeqIndex] = useState(0);

  useEffect(() => {
    const strings = greeting.sequenceStrings || ["Doctoral Researcher"];
    const interval = setInterval(() => {
      setSeqIndex((prevIndex) => (prevIndex + 1) % strings.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <Fade bottom duration={2000} distance="40px">
      <div className="greet-main" id="greeting">

        {/* TOP ROW: Split Title/Status Block & Profile Picture */}
        <div className="greeting-top-profile-row">
          <div className="greeting-title-block">
            <h1 className="greeting-name" style={{ color: theme.text }}>
              {greeting.title}
            </h1>
            <p className="greeting-subtitle-text" style={{ color: theme.secondaryText }}>
              {greeting.subTitle}
            </p>
            <p className="greeting-sequence-p" style={{ color: theme.text }}>
              Hi, I am a{" "}
              <span className="inline-sequence-span" style={{ color: theme.highlight }}>
                {greeting.sequenceStrings[seqIndex]}
              </span>
              .
            </p>

            {/* Academic Status Banner */}
            {greeting.statusBanner && (
              <div 
                className="greeting-status-banner" 
                style={{ 
                  backgroundColor: theme.highlight + "10", 
                  borderLeft: `4px solid ${theme.highlight}`,
                  color: theme.text 
                }}
              >
                <p className="banner-text">{greeting.statusBanner}</p>
                <div className="banner-links">
                  <a href={`mailto:${greeting.email}`} style={{ color: theme.highlight }}>{greeting.email}</a>
                  <span style={{ color: theme.secondaryText }}>•</span>
                  {/* Updated Link to use the local imported resume asset */}
                  <a href={myResume} target="_blank" rel="noopener noreferrer" style={{ color: theme.highlight }}>Resumé</a>
                </div>
              </div>
            )}
          </div>
          
          {/* Slightly larger, dedicated image container for photo */}
          <div className="greeting-image-block">
            <img alt={`${greeting.title}`} src={profilePic} />
          </div>
        </div>

        {/* BOTTOM SECTION: Full-Width Paragraph Blocks */}
        <div className="greeting-content-body-block">
          <div className="academic-bio-paragraphs" style={{ color: theme.text }}>
            <p>
              {greeting.phdInfo} I am advised by{" "}
              {greeting.advisors.map((advisor, i) => (
                <span key={i}>
                  <a href={advisor.link} className="academic-link" style={{ color: theme.highlight }}>
                    {advisor.name}
                  </a>
                  {i < greeting.advisors.length - 1 ? " and " : "."}
                </span>
              ))}
            </p>

            <p className="core-question-block" style={{ borderLeft: `3px solid ${theme.highlight}` }}>
              <strong>Core Thesis Question:</strong> <em>{greeting.coreQuestion}</em>
            </p>

            <p>{greeting.bioPast} {greeting.bioCombined}</p>
            
            {/* Splitting string map to dynamically inject the Pint of Science Link */}
            <p>
              {greeting.outreachAndTeaching.split("Pint of Science Team at Birmingham").map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <a 
                      href="https://pintofscience.co.uk/team/Birmingham%20Team/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: theme.highlight, fontWeight: 600 }}
                    >
                      Pint of Science Team at Birmingham
                    </a>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* Research Interests List */}
          <div className="interests-section">
            <h3 style={{ color: theme.text }}>Research Interests:</h3>
            <ul className="interests-list" style={{ color: theme.secondaryText }}>
              {greeting.researchInterests.map((interest, idx) => (
                <li key={idx}>
                  <span style={{ color: theme.highlight }}>•</span> {interest}
                </li>
              ))}
            </ul>
          </div>

          {/* Metadata Footer Utilities */}
          <div className="greeting-footer-links">
            <SocialMedia theme={theme} links={socialMediaLinks} />
            <div className="academic-meta-links" style={{ color: theme.secondaryText }}>
              For more info, browse my{" "}
              {/* Updated Link to use the local imported resume asset */}
              <a href={myResume} target="_blank" rel="noopener noreferrer" style={{ color: theme.highlight }}>Resumé</a>
              {" "}and{" "}
              <a href={greeting.googleScholar} target="_blank" rel="noopener noreferrer" style={{ color: theme.highlight }}>Google Scholar</a>.
            </div>
          </div>
        </div>

      </div>
    </Fade>
  );
}