import React from "react";
import "./News.css";
import { news } from "../../../config/portfolio";
import { Fade } from "react-awesome-reveal";

export default function News(props) {
  const theme = props.theme;

  // Gracefully handle an empty or non-existent array
  if (!news || news.length === 0) return null;

  return (
    /* Outer structural wrapper remains completely static to anchor the page layout rules */
    <div className="news-main-div" id="news">
      
      <Fade>
        <div className="news-header-div">
          <h1 className="news-heading" style={{ color: theme.text }}>
            News
          </h1>
        </div>

        <div className="news-body-div">
            {/* Inner block wrapper guarantees layout dimensions remain uncollapsed */}
            <div className="news-list-container">
              {news.map((item, index) => {
                return (
                  <div className="news-item-row" key={index}>
                    
                    {/* Left Parameter: Explicit Time Window */}
                    <div className="news-date-col">
                      <span className="news-date-text" style={{ color: theme.highlight }}>
                        {item.date}
                      </span>
                    </div>
                    
                    {/* Right Parameter: Core Content Log */}
                    <div className="news-text-col">
                      <p className="news-text" style={{ color: theme.secondaryText }}>
                        {item.text}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="news-link"
                            style={{ color: theme.highlight }}
                          >
                            {" "}[Link]
                          </a>
                        )}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
        </div>
      </Fade>
    
    </div>
  );
}