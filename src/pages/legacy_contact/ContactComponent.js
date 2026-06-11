import React, { Component } from "react";
import LegacyHeader from "../../components/legacy_header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import BlogsImg from "./BlogsImg";
import { Fade } from 'react-awesome-reveal';
import "./ContactComponent.css";
import { contactPageData, socialMediaLinksLegacy } from "../../config/portfolio.js";

import myResume from "../../assets/resume.pdf";

const ContactData = contactPageData.contactSection;
const blogSection = contactPageData.blogSection;

class LegacyContact extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="contact-main">
        <LegacyHeader theme={theme} />
        <div className="basic-contact">
          <Fade direction="right">
            <div className="contact-heading-div">
              <div className="contact-heading-img-div">
                <img
                  src={require(`../../assets/images/${ContactData["profile_image_path"]}`)}
                  alt=""
                />
              </div>
              <div className="contact-heading-text-div">
                <h1
                  className="contact-heading-text"
                  style={{ color: theme.text }}
                >
                  {ContactData["title"]}
                </h1>
                <p
                  className="contact-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  Feel free to reach out to me on any of my social media. Always up for a chat.
                </p>
                <SocialMedia theme={theme} links={socialMediaLinksLegacy} />
                <div className="resume-btn-div">
                  <Button
                    text="See My Resume"
                    newTab={true}
                    href={myResume}
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          </Fade>
          <Fade direction="left">
            <div className="blog-heading-div">
              <div className="blog-heading-text-div">
                <h1 className="blog-heading-text" style={{ color: theme.text }}>
                  {blogSection["title"]}
                </h1>
                <p
                  className="blog-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {blogSection["subtitle"]}
                </p>
                <div className="blogsite-btn-div">
                  <Button
                    text="Visit My Blogsite"
                    newTab={true}
                    href={blogSection.link}
                    theme={theme}
                  />
                </div>
              </div>
              <div className="blog-heading-img-div">
                <BlogsImg theme={theme} />
              </div>
            </div>
          </Fade>
        </div>
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default LegacyContact;
