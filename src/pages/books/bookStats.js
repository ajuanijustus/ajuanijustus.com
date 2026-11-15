// everything on the reading stats page is worked out from books.json here

const LOTR_PAGES = 1178;
const MINUTES_PER_PAGE = 1.5;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const STOP = new Set(
  ("a an the and or but if so of to in on at by for with from as is was were be been are am i me my mine you your it its this that " +
    "these those he she him her his they them their we us our not no yes do does did have has had just very really so too " +
    "what which who whom when where why how all any both each few more most other some such only own same than then there " +
    "here into over under again out up down about also can will would could should one ones book books read reading story " +
    "dont doesnt didnt im ive its thats theres youre isnt wasnt because while even though much many well get got like " +
    "br made make way first still being after before through every something thing things lot bit time " +
    "cant wait back now know think want going say said see goes")
    .split(" ")
);

export const parseDate = (s) => (s ? new Date(s.replace(/\//g, "-") + "T12:00:00") : null);
const ymd = (d) => d.toISOString().slice(0, 10);
const stripHtml = (s) => (s || "").replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");

export function formatOf(b) {
  const f = (b.format || "").toLowerCase();
  if (!f) return "unknown";
  if (f.includes("kindle") || f.includes("ebook") || f.includes("nook")) return "ebook";
  if (f.includes("audio")) return "audio";
  if (f.includes("hardcover") || f.includes("hardback")) return "hardcover";
  if (f.includes("paperback") || f.includes("mass market")) return "paperback";
  return "other";
}

function countBy(list, fn) {
  const m = new Map();
  list.forEach((x) => {
    const k = fn(x);
    if (k === null || k === undefined) return;
    m.set(k, (m.get(k) || 0) + 1);
  });
  return m;
}

export default function computeStats(books) {
  const read = books.filter((b) => b.shelf === "read" || b.shelf === "before-goodreads");
  const dated = read
    .filter((b) => b.shelf === "read" && b.dateRead)
    .map((b) => ({ ...b, date: parseDate(b.dateRead) }))
    .sort((a, b) => a.date - b.date);
  const tbr = books.filter((b) => b.shelf === "to-read");
  const withPages = read.filter((b) => b.pages > 0);
  const rated = read.filter((b) => b.rating > 0);

  const totalPages = withPages.reduce((s, b) => s + b.pages, 0);

  // this year against the same point last year
  const now = new Date();
  const thisYear = now.getFullYear();
  const sameDayLastYear = new Date(now);
  sameDayLastYear.setFullYear(thisYear - 1);
  const thisYearCount = dated.filter((b) => b.date.getFullYear() === thisYear).length;
  const lastYearTotal = dated.filter((b) => b.date.getFullYear() === thisYear - 1).length;
  const lastYearByNow = dated.filter((b) => b.date.getFullYear() === thisYear - 1 && b.date <= sameDayLastYear).length;

  // calendar
  const byDay = {};
  dated.forEach((b) => {
    const k = ymd(b.date);
    (byDay[k] = byDay[k] || []).push(b.title);
  });
  const years = [...new Set(dated.map((b) => b.date.getFullYear()))].sort((a, b) => b - a);

  // per year cards
  const wrapped = years.map((y) => {
    const list = dated.filter((b) => b.date.getFullYear() === y);
    const pages = list.reduce((s, b) => s + (b.pages || 0), 0);
    const top = [...list].sort((a, b) => b.rating - a.rating || b.pages - a.pages)[0];
    const longest = [...list].sort((a, b) => b.pages - a.pages)[0];
    const authors = [...countBy(list, (b) => b.author)].sort((a, b) => b[1] - a[1]);
    const months = [...countBy(list, (b) => b.date.getMonth())].sort((a, b) => b[1] - a[1]);
    return {
      year: y,
      count: list.length,
      pages,
      top,
      longest,
      author: authors[0] && authors[0][1] > 1 ? authors[0] : null,
      month: months[0] ? [MONTHS[months[0][0]], months[0][1]] : null,
    };
  });

  // monthly timeline from first tracked month to now
  const timeline = [];
  if (dated.length) {
    const first = dated[0].date;
    const monthly = countBy(dated, (b) => `${b.date.getFullYear()}-${b.date.getMonth()}`);
    for (let d = new Date(first.getFullYear(), first.getMonth(), 1); d <= now; d.setMonth(d.getMonth() + 1)) {
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      timeline.push({
        label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
        short: d.getMonth() === 0 ? String(d.getFullYear()) : "",
        value: monthly.get(key) || 0,
      });
    }
  }

  // streaks and gaps
  let longestGap = null;
  for (let i = 1; i < dated.length; i++) {
    const days = Math.round((dated[i].date - dated[i - 1].date) / 864e5);
    if (!longestGap || days > longestGap.days) longestGap = { days, from: dated[i - 1], to: dated[i] };
  }
  let streak = 0;
  let best = 0;
  timeline.forEach((m) => {
    streak = m.value ? streak + 1 : 0;
    best = Math.max(best, streak);
  });
  const busiest = timeline.reduce((a, b) => (b.value > (a ? a.value : -1) ? b : a), null);

  const byMonth = countBy(dated, (b) => b.date.getMonth());
  const byWeekday = countBy(dated, (b) => (b.date.getDay() + 6) % 7);

  // publication years
  const withYear = read.filter((b) => b.pubYear);
  const decades = countBy(withYear, (b) => (b.pubYear < 1900 ? "pre-1900" : `${Math.floor(b.pubYear / 10) * 10}s`));
  const decadeList = [...decades]
    .sort((a, b) => (a[0] === "pre-1900" ? -1 : b[0] === "pre-1900" ? 1 : a[0].localeCompare(b[0])))
    .map(([label, value]) => ({ label, short: label.replace(/^(\d\d)(\d\d)s$/, "'$2"), value }));
  const oldest = [...withYear].sort((a, b) => a.pubYear - b.pubYear)[0];
  const ages = dated.filter((b) => b.pubYear).map((b) => b.date.getFullYear() - b.pubYear);
  const medianAge = ages.length ? [...ages].sort((a, b) => a - b)[Math.floor(ages.length / 2)] : null;
  const newestOnRelease = dated.filter((b) => b.pubYear && b.date.getFullYear() === b.pubYear).length;

  // sizes
  const buckets = [
    { label: "novella", sub: "under 200 pages", test: (p) => p < 200 },
    { label: "standard", sub: "200 to 399", test: (p) => p >= 200 && p < 400 },
    { label: "chunky", sub: "400 to 599", test: (p) => p >= 400 && p < 600 },
    { label: "doorstopper", sub: "600+", test: (p) => p >= 600 },
  ].map((x) => ({ label: x.label, display: `${withPages.filter((b) => x.test(b.pages)).length}`, value: withPages.filter((b) => x.test(b.pages)).length, title: x.sub }));
  // a few editions list silly page counts (1 page), ignore those for the shortest
  const bySize = [...withPages].filter((b) => b.pages >= 30).sort((a, b) => b.pages - a.pages);

  // ratings and authors
  const ratingDist = [5, 4, 3, 2, 1].map((r) => ({ label: "★".repeat(r), value: rated.filter((b) => b.rating === r).length }));
  const avgRating = rated.length ? rated.reduce((s, b) => s + b.rating, 0) / rated.length : 0;
  const authorMap = new Map();
  read.forEach((b) => {
    const a = authorMap.get(b.author) || { name: b.author, count: 0, rated: 0, sum: 0 };
    a.count++;
    if (b.rating) {
      a.rated++;
      a.sum += b.rating;
    }
    authorMap.set(b.author, a);
  });
  const authors = [...authorMap.values()].sort((a, b) => b.count - a.count || b.sum / (b.rated || 1) - a.sum / (a.rated || 1));
  const fiveStars = rated.filter((b) => b.rating === 5);

  // formats
  const formatCounts = [...countBy(read.filter((b) => b.format), formatOf)].sort((a, b) => b[1] - a[1]).map(([label, value]) => ({ label, value }));

  // series
  const seriesMap = new Map();
  books.forEach((b) => {
    if (!b.series) return;
    const s = seriesMap.get(b.series) || { name: b.series, read: [], next: [] };
    if (b.shelf === "read" || b.shelf === "before-goodreads") s.read.push(b);
    else if (b.shelf === "to-read" || b.shelf === "currently-reading") s.next.push(b);
    seriesMap.set(b.series, s);
  });
  const series = [...seriesMap.values()]
    .filter((s) => s.read.length)
    .map((s) => {
      const nums = s.read.map((b) => b.seriesNum).filter((n) => Number.isInteger(n));
      const next = s.next.filter((b) => Number.isInteger(b.seriesNum)).sort((a, b) => a.seriesNum - b.seriesNum)[0];
      const last = s.read.filter((b) => b.dateRead).sort((a, b) => (a.dateRead < b.dateRead ? 1 : -1))[0];
      return { name: s.name, count: s.read.length, upTo: nums.length ? Math.max(...nums) : null, next, author: s.read[0].author, lastRead: last ? last.dateRead : "" };
    })
    .sort((a, b) => b.count - a.count || (a.lastRead < b.lastRead ? 1 : -1));

  // tbr
  const yearAgo = new Date(now);
  yearAgo.setFullYear(thisYear - 1);
  const lastTwelve = dated.filter((b) => b.date >= yearAgo).length;
  const tbrMonths = lastTwelve ? Math.ceil(tbr.length / (lastTwelve / 12)) : null;
  const oldestTbr = tbr.filter((b) => b.dateAdded).sort((a, b) => (a.dateAdded < b.dateAdded ? -1 : 1))[0];
  const tbrPages = tbr.reduce((s, b) => s + (b.pages || 0), 0);

  // reviews
  const reviewed = read.filter((b) => stripHtml(b.review).trim());
  const words = (b) => stripHtml(b.review).trim().split(/\s+/).filter(Boolean).length;
  const longestReview = [...reviewed].sort((a, b) => words(b) - words(a))[0];
  const totalWords = reviewed.reduce((s, b) => s + words(b), 0);
  const wordCounts = new Map();
  reviewed.forEach((b) =>
    stripHtml(b.review)
      .toLowerCase()
      .replace(/[’']/g, "")
      .split(/[^a-z]+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
      .forEach((w) => wordCounts.set(w, (wordCounts.get(w) || 0) + 1))
  );
  const topWords = [...wordCounts].sort((a, b) => b[1] - a[1]).slice(0, 12);

  return {
    totals: {
      books: read.length,
      pages: totalPages,
      lotr: totalPages / LOTR_PAGES,
      hours: Math.round((totalPages * MINUTES_PER_PAGE) / 60),
      avgPages: withPages.length ? Math.round(totalPages / withPages.length) : 0,
      avgRating,
      tracked: dated.length,
    },
    pace: { thisYear, thisYearCount, lastYearTotal, lastYearByNow },
    byDay,
    years,
    wrapped,
    timeline,
    streaks: { longestGap, bestMonths: best, busiest },
    byMonth: MONTHS.map((m, i) => ({ label: m[0], long: m, value: byMonth.get(i) || 0 })),
    byWeekday: DAYS.map((d, i) => ({ label: d.slice(0, 2), long: d, value: byWeekday.get(i) || 0 })),
    decades: decadeList,
    oldest,
    medianAge,
    newestOnRelease,
    buckets,
    longest: bySize[0],
    shortest: bySize[bySize.length - 1],
    ratingDist,
    fiveStars,
    authors: authors.slice(0, 10),
    formats: formatCounts,
    series,
    tbr: { count: tbr.length, pages: tbrPages, months: tbrMonths, oldest: oldestTbr, perMonth: lastTwelve / 12 },
    reviews: { count: reviewed.length, longest: longestReview, longestWords: longestReview ? words(longestReview) : 0, totalWords, topWords },
    shelf: [...read].sort((a, b) => (a.dateRead || a.dateAdded || "").localeCompare(b.dateRead || b.dateAdded || "")),
    rereads: books.filter((b) => (b.shelves || []).includes("to-reread")),
    dnf: books.filter((b) => b.shelf === "lost-interest-dnf"),
    current: books.filter((b) => b.shelf === "currently-reading"),
  };
}
