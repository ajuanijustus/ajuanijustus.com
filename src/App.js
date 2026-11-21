import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { chosenTheme, lightTheme, darkTheme } from "./config/theme.js";
import { GlobalStyles } from "./config/global.js";
import { settings } from "./config/portfolio.js";
import SeoHeader from "./components/seoHeader/SeoHeader";
import EasterEgg from "./components/easterEgg/EasterEgg";

import Home from "./pages/home/HomeComponent";
import Contact from "./pages/contact/ContactComponent";

import PersonalContact from "./pages/personal_contact/ContactComponent";

import LegacyHome from "./pages/legacy_home/HomeComponent.js";
import LegacyContact from "./pages/legacy_contact/ContactComponent";

import Splash from "./pages/splash/Splash";
import Research from "./pages/academic/Research";
import Outreach from "./pages/academic/Outreach";
import NewsPage from "./pages/academic/NewsPage";

// secret pages carry most of the data, so they load only when someone opens one
const SecretHome = lazy(() => import("./pages/secret/SecretHome"));
const Bookshelf = lazy(() => import("./pages/books/Bookshelf"));
const ReadingStats = lazy(() => import("./pages/books/ReadingStats"));
const Watching = lazy(() => import("./pages/secret/Watching"));
const Manga = lazy(() => import("./pages/secret/Manga"));
const Travel = lazy(() => import("./pages/secret/Travel"));
const Games = lazy(() => import("./pages/secret/Games"));
const Live = lazy(() => import("./pages/secret/Live"));
const Plants = lazy(() => import("./pages/secret/Plants"));
const Kitchen = lazy(() => import("./pages/secret/Kitchen"));

function App() {
  const [currentTheme, setCurrentTheme] = useState(chosenTheme);

  const handleThemeToggle = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  const pageProps = { theme: currentTheme, onToggle: handleThemeToggle };
  const landing = settings.isSplash ? <Splash {...pageProps} /> : <Home {...pageProps} />;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <SeoHeader />
        <EasterEgg theme={currentTheme} />
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Routes>
            <Route path="/" element={landing} />
            <Route path="/splash" element={landing} />
            <Route path="/home" element={<Home {...pageProps} />} />
            <Route path="/contact" element={<Contact {...pageProps} />} />
            <Route path="/research" element={<Research {...pageProps} />} />
            <Route path="/teaching" element={<Outreach {...pageProps} />} />
            <Route path="/news" element={<NewsPage {...pageProps} />} />

            <Route path="/secret" element={<SecretHome {...pageProps} />} />
            <Route path="/secret/home" element={<SecretHome {...pageProps} />} />
            <Route path="/secret/contact" element={<PersonalContact {...pageProps} />} />
            <Route path="/secret/books" element={<Bookshelf {...pageProps} />} />
            <Route path="/secret/bookstats" element={<ReadingStats {...pageProps} />} />
            <Route path="/secret/watching" element={<Watching {...pageProps} />} />
            <Route path="/secret/manga" element={<Manga {...pageProps} />} />
            <Route path="/secret/travel" element={<Travel {...pageProps} />} />
            <Route path="/secret/games" element={<Games {...pageProps} />} />
            <Route path="/secret/live" element={<Live {...pageProps} />} />
            <Route path="/secret/plants" element={<Plants {...pageProps} />} />
            <Route path="/secret/kitchen" element={<Kitchen {...pageProps} />} />
            <Route path="/secret/videos" element={<Navigate to="/secret/games/" replace />} />

            <Route path="/legacy" element={<LegacyHome {...pageProps} />} />
            <Route path="/legacy/home" element={<LegacyHome {...pageProps} />} />
            <Route path="/legacy/contact" element={<LegacyContact {...pageProps} />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
