import React, { useState, useEffect } from "react";
import "./Greeting.css";
import SocialMedia from "../../../components/socialMedia/SocialMedia";
import { greetingLegacy, socialMediaLinksLegacy } from "../../../config/portfolio";
import { Fade } from 'react-awesome-reveal';
import multitaskingSvg from "../../../assets/images/multitasking.svg";

const example = [
  "Data Scientist",
  "Traveller",
  "Gamer",
  "Photographer",
  "Musician",
];

export default function Greeting(props) {
  const theme = props.theme;
  
  const [currentText, setCurrentText] = useState(example[0]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let index = 0;

    const sequenceInterval = setInterval(() => {
      // Step 1: Start snappy fade-out
      setIsFading(true);

      // Step 2: Swap text
      setTimeout(() => {
        index = (index + 1) % example.length;
        setCurrentText(example[index]);
        // Step 3: Fade back in
        setIsFading(false);
      }, 0);

    }, 1000); // Changed to exactly 1 second (1000ms)

    return () => clearInterval(sequenceInterval);
  }, []);

  return (
    <Fade bottom duration={2000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <p className="greeting-text" style={{ color: theme.text }}>
                Hi, I am a <br />
                <span 
                  style={{ color: "#e80000" }} 
                  className={`sequence-span ${isFading ? "fade-out" : "fade-in"}`}
                >
                  {currentText}
                </span>
                .
              </p>
              <p
                className="greeting-text-p subTitle"
                style={{ color: theme.secondaryText }}
              >
                {greetingLegacy.subTitle}
              </p>
              <SocialMedia theme={theme} links={socialMediaLinksLegacy} />
            </div>
          </div>
          <div className="greeting-image-div">
            <img alt="aju multitasking" src={multitaskingSvg} />
          </div>
        </div>
      </div>
    </Fade>
  );
}