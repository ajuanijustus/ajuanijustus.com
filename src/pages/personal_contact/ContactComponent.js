import React from "react";
import "./ContactComponent.css";
import PersonalHeader from "../../components/personal_header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Button from "../../components/button/Button";
import { Fade } from "react-awesome-reveal";
import { greeting, contactPageData, socialMediaLinksPersonal } from "../../config/portfolio.js";
import myResume from "../../assets/resume.pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

const CompactIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.body}; 
  border-radius: 50%;
  width: 32px;
  height: 32px;
  
  flex-shrink: 0; 
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    color: ${({ theme }) => theme.text}; 
    font-size: 14px; 
    width: auto;     
    height: 14px;    
    transition: color 0.3s ease-in-out;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.highlight};
    transform: scale(1.1);
    
    svg {
      color: ${({ theme }) => theme.text}; 
    }
  }
`;

const ContactData = contactPageData.contactSection;

export default function Contact(props) {
  const theme = props.theme;
  const mapsUrl = "https://maps.google.com/?q=School+of+Computer+Science+University+of+Birmingham";

  return (
    <div className="contact-main">
      <PersonalHeader theme={theme} />
      
      <div className="basic-contact">
        <Fade>
          <div className="contact-card-container" style={{ backgroundColor: theme.body }}>
            
            {/* Left Side: Profile Image */}
            <div className="contact-image-panel">
              <img
                src={require(`../../assets/images/${ContactData["profile_image_path"]}`)}
                alt={`${greeting.title}`}
                className="contact-profile-img"
              />
            </div>

            {/* Right Side: Details */}
            <div className="contact-info-panel">
              <h1 className="contact-title" style={{ color: theme.text }}>
                {ContactData["title"]}
              </h1>
              <p className="contact-description" style={{ color: theme.secondaryText, lineHeight: "1.6" }}>
                Always up for a chat. Hit me up on&nbsp;
                <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                  <a 
                    href="mailto:hello@ajuanijustus.com" 
                    style={{ 
                      color: theme.highlight, 
                      textDecoration: "none",
                      fontWeight: "600",
                      transition: "text-decoration 0.2s"
                    }}
                    onMouseOver={(e) => e.target.style.textDecoration = "underline"}
                    onMouseOut={(e) => e.target.style.textDecoration = "none"}
                  >
                    hello@ajuanijustus.com
                  </a>
                </span>
                , or drop me a message on Instagram, Bluesky, Twitch, Goodreads or any of my other socials below. I'll eventually get to you, but email is best.
              </p>

              <hr className="contact-divider" style={{ borderColor: theme.secondaryText + "30" }} />

              {/* Address Section */}
              <div className="contact-address-section" style={{ color: theme.text }}>
                <h3 className="section-subtitle" style={{ color: theme.highlight }}>Location & Mailing</h3>
                <p className="address-text">
                  School of Computer Science<br />
                  University of Birmingham, Edgbaston<br />
                  Birmingham, B15 2TT
                </p>
                <p className="office-text" style={{ color: theme.secondaryText }}>
                  <strong>Office:</strong> 144 (First Floor)
                </p>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="maps-link-text" style={{ color: theme.highlight }}>
                  View on Google Maps ↗
                </a>
              </div>

              <hr className="contact-divider" style={{ borderColor: theme.secondaryText + "30" }} />

              {/* SELFCONTAINED COMPACT SOCIAL DIRECTORY */}
              <div className="contact-social-directory">
                <h3 className="section-subtitle" style={{ color: theme.highlight }}>Digital Profiles</h3>
                <div className="compact-social-grid">
                  {socialMediaLinksPersonal.map((media, idx) => (
                    <a 
                      key={idx} 
                      href={media.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="compact-social-item"
                      style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
                    >
                      <CompactIconWrapper theme={theme}>
                        <FontAwesomeIcon icon={media.icon} />
                      </CompactIconWrapper>
                      
                      <span style={{ color: theme.text, fontWeight: "500" }}>{media.name}</span>
                      
                    </a>
                  ))}
                </div>
        
                {/* Action Button */}
                <div className="contact-resume-action">
                  <Button text="See My Resume" newTab={true} href={myResume} theme={theme} />
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>

      <Footer theme={theme} onToggle={props.onToggle} />
      <TopButton theme={theme} />
    </div>
  );
}