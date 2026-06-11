import React, { useState, useMemo, useEffect } from "react";
import "./Bookshelf.css";
import booksData from "../../config/books.json";
import { Fade } from "react-awesome-reveal";
import Header from "../../components/personal_header/Header";

const BookCard = ({ book, theme, onClick }) => {
  const stripHtml = (html) => html ? html.replace(/<[^>]*>?/gm, '') : "";

  return (
    <div className="book-card-small" onClick={() => onClick(book)}>
      <div className="book-cover-container">
        
        {book.coverUrl ? (
          <img 
            src={book.coverUrl} 
            alt={`${book.title} cover`} 
            loading="lazy" 
            decoding="async" 
          />
        ) : (
          /* Render colorful text fallback if no cover exists anywhere on OpenLibrary */
          <div className="missing-cover-fallback" style={{ backgroundColor: theme.highlight + "20", color: theme.text, border: `1px solid ${theme.highlight}40` }}>
            <span className="missing-cover-title">{book.title}</span>
            <span className="missing-cover-author">{book.author}</span>
          </div>
        )}

        {/* Rich Hover Overlay */}
        <div className="book-hover-layer" style={{ backgroundColor: theme.body + "E6" }}>
          <div className="hover-rating">
            <span style={{ color: "#FFD700" }}>{"★".repeat(book.rating)}</span>
            <span className="empty-stars">{"★".repeat(5 - book.rating)}</span>
          </div>
          <p className="hover-review-snippet" style={{ color: theme.text }}>
            {book.review ? stripHtml(book.review) : "No review left for this book."}
          </p>
          <span className="read-more-btn" style={{ color: theme.highlight }}>Read More</span>
        </div>

      </div>
    </div>
  );
};

export default function Bookshelf(props) {
  const theme = props.theme;
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedBook ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedBook]);

  const groupedBooks = useMemo(() => {
    const validBooks = booksData.filter(b => b.shelf === "read" || b.shelf === "before-goodreads");
    validBooks.sort((a, b) => new Date(b.dateRead || b.dateAdded) - new Date(a.dateRead || a.dateAdded));

    const groups = {};
    validBooks.forEach((book) => {
      let year = book.shelf === "before-goodreads" ? "Before Tracking" : ((book.dateRead || book.dateAdded)?.substring(0, 4) || "Unknown Year");
      if (!groups[year]) groups[year] = [];
      groups[year].push(book);
    });
    return groups;
  }, []);

  const sortedYears = Object.keys(groupedBooks).sort((a, b) => {
    if (a === "Before Tracking") return 1;
    if (b === "Before Tracking") return -1;
    if (a === "Unknown Year") return 1;
    if (b === "Unknown Year") return -1;
    return b - a; 
  });

  // Calculate the dynamic "Last Updated" date from your JSON data
  const lastUpdatedDate = useMemo(() => {
      const validBooks = booksData.filter(b => b.shelf === "read" || b.shelf === "before-goodreads");

      const timestamps = validBooks
      .map(book => book.dateRead || book.dateAdded)
      .filter(Boolean) // Ignores entries missing a date string
      .map(dateStr => new Date(dateStr).getTime());

      if (timestamps.length === 0) return "Recently";

      const latestTimestamp = Math.max(...timestamps);

      // Formats to a clean aesthetic style like "May 31, 2026"
      return new Date(latestTimestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      });
  }, []);

  return (
    <>
      <Header theme={theme} />
      <div className="bookshelf-main-div" id="bookshelf">
        <Fade direction="up" duration={1200} triggerOnce>
          <div className="bookshelf-header-div">
            <h1 className="bookshelf-heading" style={{ color: theme.text }}>
            Reading Log
            </h1>
            
            <p className="bookshelf-subtitle" style={{ color: theme.secondaryText, lineHeight: "1.6" }}>
            A chronological archive of the books I've devoured, loved, and reviewed. This log was last 
            updated on <strong style={{ color: theme.text }}>{lastUpdatedDate}</strong>. As much as I 
            absolutely hate Amazon and all it has done for books and Goodreads; you will find my most up to date 
            updates on <a href="https://www.goodreads.com/user/show/50358068-aju-ani-justus" target="_blank" rel="noopener noreferrer" style={{ color: theme.highlight, textDecoration: "underline" }}>Goodreads</a>. 
            I'm also on <a href="https://fable.co/fabler/aju-174512380413?referralID=r5kkUPaqRR" target="_blank" rel="noopener noreferrer" style={{ color: theme.highlight, textDecoration: "underline" }}>Fable</a> and <a href="https://app.thestorygraph.com/profile/ajuanijustus" target="_blank" rel="noopener noreferrer" style={{ color: theme.highlight, textDecoration: "underline" }}>Storygraph</a> (but 
            those, much like this website I only periodically updated based on my Goodreads data export). Also, if you're anything like me, and love looking at the stats, look at my <a href="#/secret/bookstats" style={{ color: theme.highlight, textDecoration: "underline" }}>reading stats</a>. If you 
            want something similar to this for your website, <a href="#/secret/contact" style={{ color: theme.highlight, textDecoration: "underline" }}>contact me</a>.
            </p>

            {/* Quick Navigation Bar */}
            <div className="bookshelf-nav-bar">
              {sortedYears.map((year) => (
                <button 
                  key={year} 
                  onClick={() => {
                    const targetId = `year-${year.replace(/\s+/g, '-')}`;
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="year-nav-link"
                  style={{ 
                    backgroundColor: theme.highlight + "15", 
                    color: theme.text,
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    fontFamily: "inherit"
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
        </div>
      </Fade>

      <div className="bookshelf-timeline">
        {sortedYears.map((year, yearIndex) => (
          <div className="bookshelf-year-section" key={yearIndex} id={`year-${year.replace(/\s+/g, '-')}`}>
            
            <Fade direction="up" duration={1000} triggerOnce>
              <h2 className="year-heading" style={{ color: theme.text, borderBottomColor: theme.highlight + "40" }}>
                {year}
              </h2>
            </Fade>

            <Fade direction="up" duration={1000} triggerOnce>
              <div className="bookshelf-grid">
                {groupedBooks[year].map((book, index) => (
                  <BookCard key={index} book={book} theme={theme} onClick={setSelectedBook} />
                ))}
              </div>
            </Fade>

          </div>
        ))}
      </div>

      {/* Pop-Up Modal */}
      {selectedBook && (
        <div className="book-modal-overlay" onClick={() => setSelectedBook(null)}>
          <div 
            className="book-modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: theme.body, boxShadow: `0 20px 40px ${theme.text}33` }}
          >
            <button className="close-modal-btn" onClick={() => setSelectedBook(null)} style={{ color: theme.text }}>×</button>
            <div className="modal-inner-layout">
              <div className="modal-book-cover">
                <BookCard book={selectedBook} theme={theme} onClick={() => {}} />
              </div>
              <div className="modal-book-details">
                <h2 className="modal-title" style={{ color: theme.text }}>{selectedBook.title}</h2>
                <h3 className="modal-author" style={{ color: theme.highlight }}>{selectedBook.author}</h3>
                <div className="modal-rating">
                  {"★".repeat(selectedBook.rating)}
                  <span className="empty-stars">{"★".repeat(5 - selectedBook.rating)}</span>
                </div>
                <div className="modal-review-content" style={{ color: theme.secondaryText }}>
                    {selectedBook.review ? (
                        <p dangerouslySetInnerHTML={{ __html: selectedBook.review }}></p>
                    ) : (
                        <p><em>No detailed review written for this book.</em></p>
                    )}
                    
                    {/* Injecting requested reading duration logs directly below the entry review body */}
                    <div className="modal-reading-duration" style={{ color: theme.highlight, marginTop: "1.5rem", fontSize: "13px", fontWeight: "600", fontFamily: "Montserrat", letterSpacing: "0.5px", opacity: 0.85 }}>
                        [{selectedBook.dateAdded || "Not Logged"} — {selectedBook.dateRead || "Before Tracking"}]
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}