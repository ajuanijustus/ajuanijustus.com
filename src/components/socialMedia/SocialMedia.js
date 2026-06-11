import React from "react";
import "./SocialMedia.css";
import { socialMediaLinks } from "../../config/portfolio";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* 1. Build the circle wrapper container here */
  background-color: ${({ theme }) => theme.body}; 
  border-radius: 50%;
  width: 42px;   /* Explicit sizing guarantees all your social buttons are uniform */
  height: 42px;  /* Perfect 1:1 aspect ratio circle */
  margin: 0 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    /* 2. Style the vector asset safely inside the circle boundary */
    color: ${({ theme }) => theme.text}; 
    font-size: 18px; /* Using font-size allows unequal aspect ratio logos to scale safely without clipping */
    width: auto;     /* Lets wide icons keep their shape */
    height: 18px;    /* Keeps heights uniform */
    transition: color 0.3s ease-in-out;
  }
  
  &:hover {
    /* 3. Smoothly animate the container wrapper layout directly */
    background-color: ${({ theme }) => theme.highlight};
    transform: scale(1.1);
    
    svg {
      color: ${({ theme }) => theme.text}; 
    }
  }
`;

export default function SocialMedia(props) {
  return (
    <div className="social-media-div">
      {socialMediaLinks.map((media, index) => {
        return (
          <a
            key={index}
            href={media.link}
            className="icon-button"
            target="_blank"
            rel="noopener noreferrer"
            title={media.name}
          >
            <IconWrapper theme={props.theme}>
              <FontAwesomeIcon icon={media.icon} />
            </IconWrapper>
          </a>
        );
      })}
    </div>
  );
}