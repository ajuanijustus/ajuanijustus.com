import React, { useMemo } from "react";
import "./ReadingStats.css";
import statsData from "../../config/stats.json";
import { Fade } from "react-awesome-reveal";
import Header from "../../components/personal_header/Header";

export default function ReadingStats({ theme }) {
  
  // Calculate global baseline metrics
  const globalAggregates = useMemo(() => {
    let books = 0; let pages = 0; let scoreSum = 0; let scoredCount = 0;
    Object.values(statsData.byYear).forEach(y => {
      books += y.totalBooks;
      pages += y.totalPages;
      Object.entries(y.ratings).forEach(([rate, count]) => {
        scoreSum += (int(rate) * count);
        scoredCount += count;
      });
    });
    return {
      totalBooks: books,
      totalPages: pages,
      avgRating: scoredCount > 0 ? (scoreSum / scoredCount).toFixed(2) : "0.00"
    };
  }, []);

  // Compute boundaries safely for math normalization layouts
  const maxBooksInMonth = Math.max(...statsData.timeline.map(d => d.booksCount), 1);
  const maxPagesInMonth = Math.max(...statsData.timeline.map(d => d.pagesCount), 1);

  return (
    <>
      <Header theme={theme} />
      <div className="stats-main-div" style={{ backgroundColor: theme.body }}>
        <Fade direction="up" duration={1000} triggerOnce>
          <div className="stats-header">
            <h1 className="stats-title" style={{ color: theme.text }}>Reading Insights</h1>
            <p className="stats-subtitle" style={{ color: theme.secondaryText }}>Data analytics extracted from my lifelong library archive.</p>
          </div>
        </Fade>

        {/* Grid Summary Row */}
        <div className="stats-summary-grid">
            <div className="stat-metric-card" style={{ backgroundColor: theme.highlight + "10", border: `1px solid ${theme.highlight}30` }}>
            <span className="metric-num" style={{ color: theme.highlight }}>{globalAggregates.totalBooks}</span>
            <span className="metric-lbl" style={{ color: theme.text }}>Books Devoured</span>
          </div>
          <div className="stat-metric-card" style={{ backgroundColor: theme.highlight + "10", border: `1px solid ${theme.highlight}30` }}>
            <span className="metric-num" style={{ color: theme.highlight }}>{globalAggregates.totalPages.toLocaleString()}</span>
            <span className="metric-lbl" style={{ color: theme.text }}>Pages Logged</span>
          </div>
          <div className="stat-metric-card" style={{ backgroundColor: theme.highlight + "10", border: `1px solid ${theme.highlight}30` }}>
            <span className="metric-num" style={{ color: theme.highlight }}>★ {globalAggregates.avgRating}</span>
            <span className="metric-lbl" style={{ color: theme.text }}>Lifetime Rating</span>
          </div>
        </div>

        {/* Year over Year Performance Log */}
        <div className="stats-section">
          <h2 className="section-title" style={{ color: theme.text }}>Yearly Milestones</h2>
        <div className="table-responsive">
          <table className="stats-table" style={{ color: theme.text }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${theme.highlight}40` }}>
                <th>Year</th>
                <th>Books Read</th>
                <th>Total Pages</th>
                <th>Ratings Distribution (1★ - 5★)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(statsData.byYear).sort((a,b) => b.localeCompare(a)).map(year => {
                const data = statsData.byYear[year];
                return (
                  <tr key={year} style={{ borderBottom: `1px solid ${theme.secondaryText}20` }}>
                    <td style={{ fontWeight: "700" }}>{year}</td>
                    <td>{data.totalBooks}</td>
                    <td>{data.totalPages.toLocaleString()}</td>
                    <td>
                      <div className="rating-spread-row">
                        {list(range(1, 6)).map(star => (
                          <span key={star} className="spread-pill" style={{ backgroundColor: theme.highlight + (data.ratings[star] > 0 ? "30" : "05"), color: data.ratings[star] > 0 ? theme.text : theme.secondaryText }}>
                            {star}★: <strong>{data.ratings[star]}</strong>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Histograms Time Series Row */}
      <div className="stats-charts-row">
        <div className="chart-wrapper-box">
          <h3 className="chart-box-title" style={{ color: theme.text }}>Books Over Time (Histogram)</h3>
          <div className="histogram-container">
            {statsData.timeline.map((item, idx) => (
              <div key={idx} className="histogram-bar-column" title={`${item.date}: ${item.booksCount} books`}>
                <div className="bar-fill" style={{ height: `${(item.booksCount / maxBooksInMonth) * 100}%`, backgroundColor: theme.highlight }} />
                <span className="bar-label" style={{ color: theme.secondaryText }}>{item.date.substring(5,7) === "01" ? item.date.substring(2,4) : ""}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-wrapper-box">
          <h3 className="chart-box-title" style={{ color: theme.text }}>Pages Over Time (Histogram)</h3>
          <div className="histogram-container">
            {statsData.timeline.map((item, idx) => (
              <div key={idx} className="histogram-bar-column" title={`${item.date}: ${item.pagesCount} pages`}>
                <div className="bar-fill" style={{ height: `${(item.pagesCount / maxPagesInMonth) * 100}%`, backgroundColor: theme.text }} />
                <span className="bar-label" style={{ color: theme.secondaryText }}>{item.date.substring(5,7) === "01" ? item.date.substring(2,4) : ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scatter/Dot Graph Visualization */}
      <div className="stats-section">
        <h2 className="section-title" style={{ color: theme.text }}>Reading Recency vs Book Publication Year</h2>
        <p className="chart-desc" style={{ color: theme.secondaryText }}>Each point represents a book mapped by when you read it (X) vs when the book was originally published (Y).</p>
        <div className="scatter-chart-container" style={{ borderLeft: `2px solid ${theme.text}40`, borderBottom: `2px solid ${theme.text}40` }}>
          {statsData.scatterPlot.map((pt, index) => {
            // Standard bounding normalization logic to scatter elements elegantly
            const yearNorm = Math.max(1950, Math.min(2026, pt.y)); 
            const yPercent = ((yearNorm - 1950) / (2026 - 1950)) * 100;
            const xPercent = (statsData.timeline.findIndex(t => t.date === pt.x) / statsData.timeline.length) * 100;

            return (
              <div 
                key={index} 
                className="scatter-dot" 
                style={{ left: `${xPercent}%`, bottom: `${yPercent}%`, backgroundColor: theme.highlight }}
                title={`"${pt.title}" (Pub: ${pt.y}) Read: ${pt.x}`}
              />
            );
          })}
        </div>
        <div className="scatter-axis-labels" style={{ color: theme.secondaryText }}>
          <span>Past Logs</span>
          <span>Timeline Read Axis</span>
          <span>Present</span>
        </div>
      </div>

      {/* Authors, Publishers, and Fun Stats Distribution Layouts */}
      <div className="stats-leaderboard-row">
        <div className="leaderboard-block">
          <h3 className="chart-box-title" style={{ color: theme.text }}>Top Authors</h3>
          {statsData.byAuthor.map((author, i) => (
            <div key={i} className="leaderboard-item" style={{ color: theme.text }}>
              <div className="lb-header">
                <span>{author.name}</span>
                <strong>{author.count} books <small style={{ color: theme.secondaryText }}>({author.avgRating} ★ avg)</small></strong>
              </div>
              <div className="lb-bar-bg" style={{ backgroundColor: theme.secondaryText + "20" }}>
                <div className="lb-bar-fill" style={{ width: `${(author.count / statsData.byAuthor[0].count) * 100}%`, backgroundColor: theme.highlight }} />
              </div>
            </div>
          ))}
        </div>

        <div className="leaderboard-block">
          <h3 className="chart-box-title" style={{ color: theme.text }}>Top Publishers</h3>
          {statsData.byPublisher.map((pub, i) => (
            <div key={i} className="leaderboard-item" style={{ color: theme.text }}>
              <div className="lb-header">
                <span>{pub.name}</span>
                <strong>{pub.count} books</strong>
              </div>
              <div className="lb-bar-bg" style={{ backgroundColor: theme.secondaryText + "20" }}>
                <div className="lb-bar-fill" style={{ width: `${(pub.count / statsData.byPublisher[0].count) * 100}%`, backgroundColor: theme.text }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Analytics Blocks */}
      <div className="fun-stats-section" style={{ borderTop: `1px solid ${theme.secondaryText}30` }}>
        <h3 className="chart-box-title" style={{ color: theme.text, marginTop: "2rem" }}>Library Superlatives</h3>
        <div className="stats-summary-grid">
          <div className="fun-stat-card" style={{ border: `1px solid ${theme.secondaryText}30` }}>
            <span className="fun-lbl" style={{ color: theme.secondaryText }}>Thickest Tome</span>
            <h4 style={{ color: theme.text }}>{statsData.funStats.longestBook.title}</h4>
            <p style={{ color: theme.highlight }}>{statsData.funStats.longestBook.pages} pages — by {statsData.funStats.longestBook.author}</p>
          </div>
          <div className="fun-stat-card" style={{ border: `1px solid ${theme.secondaryText}30` }}>
            <span className="fun-lbl" style={{ color: theme.secondaryText }}>Shortest Read</span>
            <h4 style={{ color: theme.text }}>{statsData.funStats.shortestBook.title}</h4>
            <p style={{ color: theme.highlight }}>{statsData.funStats.shortestBook.pages} pages — by {statsData.funStats.shortestBook.author}</p>
          </div>
          <div className="fun-stat-card" style={{ border: `1px solid ${theme.secondaryText}30` }}>
            <span className="fun-lbl" style={{ color: theme.secondaryText }}>Preferred Mediums</span>
            <div className="binding-list" style={{ color: theme.text }}>
              {Object.entries(statsData.funStats.bindingDistribution).map(([medium, count]) => (
                <div key={medium} className="medium-row">
                  <span>{medium}</span>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

// Quick inline array validation mappings
function int(str) { return parseInt(str, 10); }
function range(start, end) { return Array.from({ length: end - start }, (_, i) => start + i); }
function list(val) { return val; }