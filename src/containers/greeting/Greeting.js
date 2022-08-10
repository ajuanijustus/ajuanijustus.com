import React from "react";
import "./Greeting.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
// import Button from "../../components/button/Button";
import { greeting } from "../../portfolio";
import { Fade } from "react-reveal";
// import FeelingProud from "./FeelingProud";

var example = [
  "Data Scientist",
  "Traveller",
  "Gamer",
  "Photographer",
  "Musician",
  "Artist",
];
// var example = ['Data Scientist 🧑🏽‍💻', 'Artist 👨🏽‍🎨', 'Traveller 🚵🏽‍♂️', 'Gamer 👾', 'Photographer 📸', 'Musician 🎸'];
// var example = ['🧑🏽‍💻', '👨🏽‍🎨', '🧎🏽‍♂️', '👾', '📸', '🎸'];
textSequence(0);
function textSequence(i) {
  if (example.length > i) {
    setTimeout(function () {
      try {
        document.getElementById("sequence").innerHTML = example[i];
      } catch {}
      textSequence(++i);
    }, 1000); // 1 second (in milliseconds)
  } else if (example.length === i) {
    // Loop
    textSequence(0);
  }
}

export default function Greeting(props) {
  const theme = props.theme;
  return (
    <Fade bottom duration={2000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <p className="greeting-text" style={{ color: theme.text }}>
                Hi, I am a{" "}
                <span style={{ color: "#e80000" }} id="sequence">
                  Data Scientist
                </span>
                .
              </p>
              <p
                className="greeting-text-p subTitle"
                style={{ color: theme.secondaryText }}
              >
                {greeting.subTitle}
              </p>
              <SocialMedia theme={theme} />
              {/* <div className="portfolio-repo-btn-div">
                <Button
                  text="⭐ Star Me On Github"
                  newTab={true}
                  href={greeting.portfolio_repository}
                  theme={theme}
                  className="portfolio-repo-btn"
                />
              </div> */}
              {/* <div className="button-greeting-div">
              <Button text="Contact me" href="#contact" />
              <Button text="See my resume" newTab={true} href={greeting.resumeLink} />
            </div> */}
            </div>
          </div>
          <div className="greeting-image-div">
            <img
              alt="aju multitasking"
              src={require("../../assests/images/multitasking.svg")}
            ></img>
            {/* <FeelingProud theme={theme} /> */}
          </div>
        </div>
      </div>
    </Fade>
  );
}
