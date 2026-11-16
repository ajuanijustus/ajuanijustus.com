import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./ReadingStats.css";
import books from "../../data/books.json";
import computeStats from "./bookStats";
import SecretPage, { Section, Tiles, Tile, Tabs, PosterGrid } from "../../components/secret/SecretPage";
import { Bars, HBars, Heatmap, Donut, Ring, Radial } from "../../components/secret/charts";

const fmt = (n) => Math.round(n).toLocaleString("en-GB");
const shortDate = (s) =>
  s ? new Date(s.replace(/\//g, "-")).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
const asPosters = (list) => list.map((b) => ({ title: b.title, image: b.coverUrl, meta: b.author }));

function Shelf({ list }) {
  const [hover, setHover] = useState(null);
  return (
    <>
      <div className="rs-shelf" onMouseLeave={() => setHover(null)}>
        {list.map((b, i) => {
          const pages = b.pages || 300;
          return (
            <span
              key={b.id}
              className={`rs-spine rs-r${b.rating || 0}`}
              style={{ "--h": `${Math.min(56 + pages / 9, 130)}px`, "--w": `${Math.min(Math.max(pages / 45, 5), 18)}px` }}
              onMouseEnter={() => setHover(i)}
              onClick={() => setHover(i)}
            />
          );
        })}
      </div>
      <div className="sp-readout">
        {hover !== null ? (
          <>
            <strong>{list[hover].title}</strong> by {list[hover].author}
            {list[hover].pages ? `, ${list[hover].pages} pages` : ""}
            {list[hover].rating ? `, ${"★".repeat(list[hover].rating)}` : ""}
          </>
        ) : (
          "every book i've read, oldest on the left. taller = more pages, red = five stars"
        )}
      </div>
    </>
  );
}

export default function ReadingStats(props) {
  const s = useMemo(() => computeStats(books), []);
  const [year, setYear] = useState(s.years[0]);
  const [allFive, setAllFive] = useState(false);
  const { totals, pace } = s;

  return (
    <SecretPage
      {...props}
      title="Reading stats"
      subtitle={
        <>
          all of this is worked out from my <Link to="/secret/books/">bookshelf</Link>. {fmt(totals.tracked)} of the{" "}
          {fmt(totals.books)} books have a finish date, the rest were read before i started tracking.
        </>
      }
    >
      <Section>
        <Tiles>
          <Tile value={fmt(totals.books)} label="books read" foot={`${s.series.length} different series`} />
          <Tile value={fmt(totals.pages)} label="pages" foot={`about ${totals.lotr.toFixed(0)} Lord of the Rings, back to back`} />
          <Tile value={`${fmt(totals.hours)}h`} label="spent reading" foot={`roughly ${fmt(totals.hours / 24)} full days`} />
          <Tile value={fmt(totals.avgPages)} label="pages per book" foot="on average" />
          <Tile value={`★ ${totals.avgRating.toFixed(2)}`} label="average rating" foot={`${s.fiveStars.length} five star reads`} />
          <Tile value={fmt(s.tbr.count)} label="on the to-read pile" foot={s.tbr.months ? `about ${s.tbr.months} months at my current pace` : ""} />
        </Tiles>
      </Section>

      <Section title={`${pace.thisYear} so far`}>
        <div className="sp-row">
          <Ring
            value={pace.thisYearCount}
            max={pace.lastYearTotal}
            label={`${pace.thisYearCount} books this year`}
            sub={`${pace.lastYearTotal} in all of ${pace.thisYear - 1}, and ${pace.lastYearByNow} by this point last year`}
          />
          <div>
            <h3 className="sp-h3">books finished per month</h3>
            <Bars data={s.timeline} format={(d) => `${d.label}: ${d.value} book${d.value === 1 ? "" : "s"}`} />
          </div>
        </div>
      </Section>

      <Section title="Reading calendar" desc="a square for every day i finished a book. tap one to see what it was.">
        <Tabs tabs={s.years.map((y) => ({ id: y, label: y }))} active={year} onChange={setYear} />
        <Heatmap year={year} days={s.byDay} />
      </Section>

      <Section title="Year in books">
        <div className="rs-wrapped">
          {s.wrapped.map((w) => (
            <div className="rs-year" key={w.year}>
              <span className="rs-year-label">{w.year}</span>
              <span className="rs-year-big">{w.count}</span>
              <span className="rs-year-sub">books, {fmt(w.pages)} pages</span>
              <dl>
                {w.top && w.top.rating > 0 && (
                  <>
                    <dt>favourite</dt>
                    <dd>{w.top.title}</dd>
                  </>
                )}
                {w.longest && w.longest.pages > 0 && (
                  <>
                    <dt>longest</dt>
                    <dd>
                      {w.longest.title} ({w.longest.pages}p)
                    </dd>
                  </>
                )}
                {w.author && (
                  <>
                    <dt>most read</dt>
                    <dd>
                      {w.author[0]} ×{w.author[1]}
                    </dd>
                  </>
                )}
                {w.month && (
                  <>
                    <dt>busiest month</dt>
                    <dd>
                      {w.month[0]} ({w.month[1]})
                    </dd>
                  </>
                )}
              </dl>
            </div>
          ))}
        </div>
      </Section>

      <Section title="The shelf">
        <Shelf list={s.shelf} />
      </Section>

      <Section title="When i read" desc="which months and days of the week i tend to finish books.">
        <div className="sp-row">
          <Radial data={s.byMonth} />
          <Radial data={s.byWeekday} />
          <Tiles>
            {s.streaks.busiest && <Tile value={s.streaks.busiest.value} label="busiest month ever" foot={s.streaks.busiest.label} />}
            <Tile value={s.streaks.bestMonths} label="months in a row" foot="finishing at least one book" />
            {s.streaks.longestGap && (
              <Tile
                value={`${s.streaks.longestGap.days}d`}
                label="longest dry spell"
                foot={`between ${s.streaks.longestGap.from.title} and ${s.streaks.longestGap.to.title}`}
              />
            )}
          </Tiles>
        </div>
      </Section>

      {s.series.length > 0 && (
        <Section title="Series" desc="series i've started, with the next one on my list if it's there.">
          <div className="rs-series">
            {s.series.slice(0, 18).map((x) => (
              <div className="rs-series-row" key={x.name}>
                <div>
                  <strong>{x.name}</strong>
                  <span>{x.author}</span>
                </div>
                <div className="rs-series-dots" aria-label={`${x.count} read`}>
                  {Array.from({ length: Math.min(x.count, 20) }).map((_, i) => (
                    <i key={i} />
                  ))}
                </div>
                <span className="rs-series-next">{x.next ? `next: #${x.next.seriesNum}` : x.upTo ? `up to #${x.upTo}` : ""}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title="Time travel" desc="when the books i read were first published.">
        <div className="sp-row">
          <Bars data={s.decades} height={140} format={(d) => `${d.label}: ${d.value} books`} />
          <Tiles>
            {s.oldest && <Tile value={s.oldest.pubYear} label="oldest book" foot={`${s.oldest.title}, ${s.oldest.author}`} />}
            {s.medianAge !== null && <Tile value={`${s.medianAge}y`} label="typical age" foot="of a book when i get to it" />}
            <Tile value={s.newestOnRelease} label="read the year they came out" />
          </Tiles>
        </div>
      </Section>

      <Section title="Size">
        <div className="sp-row">
          <div>
            <h3 className="sp-h3">by length</h3>
            <HBars data={s.buckets} />
          </div>
          <Tiles>
            {s.longest && <Tile value={s.longest.pages} label="longest" foot={s.longest.title} />}
            {s.shortest && <Tile value={s.shortest.pages} label="shortest" foot={s.shortest.title} />}
          </Tiles>
        </div>
      </Section>

      <Section title="How i rate">
        <div className="sp-row">
          <div>
            <h3 className="sp-h3">stars given</h3>
            <HBars data={s.ratingDist} />
          </div>
          <div>
            <h3 className="sp-h3">authors i keep coming back to</h3>
            <HBars
              data={s.authors.map((a) => ({
                label: a.name,
                value: a.count,
                display: `${a.count}${a.rated ? ` · ★${(a.sum / a.rated).toFixed(1)}` : ""}`,
              }))}
            />
          </div>
          {s.formats.length > 0 && (
            <div>
              <h3 className="sp-h3">formats</h3>
              <Donut data={s.formats} />
            </div>
          )}
        </div>
      </Section>

      <Section title="Five stars" desc={`${s.fiveStars.length} books i'd hand to anyone.`}>
        <PosterGrid small items={asPosters(allFive ? s.fiveStars : s.fiveStars.slice(0, 16))} />
        {s.fiveStars.length > 16 && (
          <button className="sp-tab rs-more" onClick={() => setAllFive(!allFive)}>
            {allFive ? "show fewer" : `show all ${s.fiveStars.length}`}
          </button>
        )}
      </Section>

      <Section title="The to-read pile">
        <Tiles>
          <Tile value={fmt(s.tbr.count)} label="books waiting" foot={`${fmt(s.tbr.pages)} pages`} />
          <Tile value={s.tbr.perMonth.toFixed(1)} label="books a month" foot="my pace over the last year" />
          {s.tbr.months && <Tile value={`${(s.tbr.months / 12).toFixed(1)}y`} label="to clear it" foot="if i never added another (i will)" />}
          {s.tbr.oldest && <Tile value={shortDate(s.tbr.oldest.dateAdded)} label="waiting the longest" foot={s.tbr.oldest.title} />}
        </Tiles>
      </Section>

      <Section title="Reviews">
        <div className="sp-row">
          <Tiles>
            <Tile value={s.reviews.count} label="reviews written" foot={`${fmt(s.reviews.totalWords)} words in total`} />
            {s.reviews.longest && <Tile value={s.reviews.longestWords} label="words in my longest" foot={s.reviews.longest.title} />}
          </Tiles>
          <div>
            <h3 className="sp-h3">words i use the most</h3>
            <div className="rs-words">
              {s.reviews.topWords.map(([w, n]) => (
                <span key={w}>
                  {w} <b>{n}</b>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {(s.current.length > 0 || s.rereads.length > 0 || s.dnf.length > 0) && (
        <Section title="Odds and ends">
          <div className="sp-row">
            {s.current.length > 0 && (
              <div>
                <h3 className="sp-h3">reading now</h3>
                <PosterGrid small items={asPosters(s.current)} />
              </div>
            )}
            {s.rereads.length > 0 && (
              <div>
                <h3 className="sp-h3">want to reread</h3>
                <PosterGrid small items={asPosters(s.rereads)} />
              </div>
            )}
            {s.dnf.length > 0 && (
              <div>
                <h3 className="sp-h3">gave up on</h3>
                <PosterGrid small items={asPosters(s.dnf)} />
              </div>
            )}
          </div>
        </Section>
      )}
    </SecretPage>
  );
}
