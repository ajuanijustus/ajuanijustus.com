import React from "react";
import { Link } from "react-router-dom";
import "./News.css";
import { news } from "../../../config/portfolio";
import { Fade } from "react-awesome-reveal";

// a little nudge towards the footer easter egg, only on the full news page
const HINT = { date: "psst", text: "there's more to this site than the menu shows. the © down in the footer is worth a few taps. seven, to be exact.", hint: true };

export default function News({ theme, limit, full }) {
  if (!news || news.length === 0) return null;

  let items = limit ? news.slice(0, limit) : news;
  if (full && items.length > 2) items = [...items.slice(0, -1), HINT, items[items.length - 1]];

  return (
    <div className={`news-main-div${full ? " is-full" : ""}`} id="news">
      <Fade triggerOnce={full}>
        {!full && (
          <div className="news-header-div">
            <h1 className="news-heading" style={{ color: theme.text }}>
              News
            </h1>
          </div>
        )}

        <div className="news-body-div">
          <div className="news-list-container">
            {items.map((item, index) => (
              <div className={`news-item-row${item.hint ? " news-hint" : ""}`} key={index}>
                <div className="news-date-col">
                  <span className="news-date-text" style={{ color: theme.highlight }}>
                    {item.date}
                  </span>
                </div>

                <div className="news-text-col">
                  <p className="news-text" style={{ color: theme.secondaryText }}>
                    {item.text}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-link" style={{ color: theme.highlight }}>
                        {" "}[Link]
                      </a>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {limit && news.length > limit && (
            <Link to="/news/" className="news-view-all" style={{ color: theme.highlight }}>
              View all news →
            </Link>
          )}
        </div>
      </Fade>
    </div>
  );
}
