import React from "react";
import "./SocialMedia.css";
import { socialMediaLinks as defaultLinks } from "../../config/portfolio";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.body}; 
  border-radius: 50%;
  width: 42px;
  height: 42px;
  margin: 0 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    color: ${({ theme }) => theme.text}; 
    font-size: 18px; 
    width: auto;     
    height: 18px;    
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

export default function SocialMedia(props) {
  // 1. Check if the parent passed a specific 'links' array. If not, use defaultLinks.
  const linksToDisplay = props.links || defaultLinks;

  return (
    <div className="social-media-div">
      {/* 2. Map over our dynamic variable instead of the hardcoded import */}
      {linksToDisplay.map((media, index) => {
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