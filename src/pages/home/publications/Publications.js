import React, { useState } from "react";
import "./Publications.css";
import { publications } from "../../../config/portfolio";
import { Fade } from "react-awesome-reveal";

export default function Publications(props) {
  const theme = props.theme;

  // State management for BibTeX Modal and Clipboard Actions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBibtex, setActiveBibtex] = useState("");
  const [copied, setCopied] = useState(false);

  if (!publications || publications.length === 0) return null;

  const openModal = (e, bibtexText) => {
    e.preventDefault(); // Stop page from snapping to top
    setActiveBibtex(bibtexText);
    setIsModalOpen(true);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeBibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset button text after 2 seconds
  };

  return (
    /* Outer structural wrapper remains static to maintain perfect page layout rules */
    <div className="publications-main-div" id="publications">
      
      {/* 1. Header Animation Block */}
      <Fade>
        <div className="publications-header-div">
          <h1 className="publications-heading" style={{ color: theme.text }}>
            Selected Publications
          </h1>
        </div>

        {/* 2. Body List Animation Block */}
        <div className="publications-body-div">
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
                      {/* Updated BibTeX node trigger to safely pass data literal down to modal hook */}
                      {pub.links.bibtex && (
                        <a 
                          href="#" 
                          onClick={(e) => openModal(e, pub.links.bibtex)} 
                          style={{ color: theme.highlight, cursor: "pointer" }}
                        >
                          [BibTeX]
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </Fade>

      {/* THEMED BIBTEX POPUP MODAL */}
      {isModalOpen && (
        <div className="bibtex-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div 
            className="bibtex-modal-content" 
            style={{ 
              backgroundColor: theme.body, 
              color: theme.text, 
              border: `1px solid ${theme.secondaryText}30` 
            }}
            onClick={(e) => e.stopPropagation()} // Keeps modal open when clicking inside the window
          >
            <div className="bibtex-modal-header">
              <h3 style={{ color: theme.text }}>BibTeX Citation</h3>
              <button 
                className="bibtex-close-x" 
                onClick={() => setIsModalOpen(false)}
                style={{ color: theme.text }}
              >
                &times;
              </button>
            </div>
            
            <pre className="bibtex-pre" style={{ backgroundColor: theme.secondaryText + "12", color: theme.text }}>
              <code>{activeBibtex}</code>
            </pre>
            
            <div className="bibtex-modal-footer">
              <button 
                className="bibtex-copy-btn" 
                onClick={copyToClipboard}
                style={{ backgroundColor: theme.highlight, color: theme.body }}
              >
                {copied ? "✓ Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}