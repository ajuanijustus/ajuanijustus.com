import React from "react";
import "./ContactComponent.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Button from "../../components/button/Button";
import { Fade } from "react-awesome-reveal";
import { greeting, contactPageData, socialMediaLinks } from "../../config/portfolio.js";
import myResume from "../../assets/resume.pdf";

const ContactData = contactPageData.contactSection;

export default function Contact(props) {
  const theme = props.theme;
  const mapsUrl = "https://maps.google.com/?q=School+of+Computer+Science+University+of+Birmingham";

  return (
    <div className="contact-main">
      <Header theme={theme} />
      
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
              <p className="contact-description" style={{ color: theme.secondaryText }}>
                {ContactData["description"]}
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
                  {socialMediaLinks.map((media, idx) => (
                    <a key={idx} href={media.link} target="_blank" rel="noopener noreferrer" className="compact-social-item">
                      <i className={`fab ${media.fontAwesomeIcon}`} style={{ backgroundColor: media.backgroundColor }}></i>
                      <span style={{ color: theme.text }}>{media.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="contact-resume-action">
                <Button text="See My Resume" newTab={true} href={myResume} theme={theme} />
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