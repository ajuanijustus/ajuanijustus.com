import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { chosenTheme, lightTheme, darkTheme } from "./config/theme.js";
import { GlobalStyles } from "./config/global.js";
import { settings } from "./config/portfolio.js";
import SeoHeader from "./components/seoHeader/SeoHeader";
import EasterEgg from "./components/easterEgg/EasterEgg";

import Home from "./pages/home/HomeComponent";
import Contact from "./pages/contact/ContactComponent";

import PersonalHome from "./pages/personal_home/HomeComponent";
import PersonalContact from "./pages/personal_contact/ContactComponent";
import Bookshelf from "./pages/books/Bookshelf.js";
import ReadingStats from "./pages/books/ReadingStats.js";

import LegacyHome from "./pages/legacy_home/HomeComponent.js";
import LegacyContact from "./pages/legacy_contact/ContactComponent";

import Splash from "./pages/splash/Splash";

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
        <Routes>
          <Route path="/" element={landing} />
          <Route path="/splash" element={landing} />
          <Route path="/home" element={<Home {...pageProps} />} />
          <Route path="/contact" element={<Contact {...pageProps} />} />

          <Route path="/secret" element={<PersonalHome {...pageProps} />} />
          <Route path="/secret/home" element={<PersonalHome {...pageProps} />} />
          <Route path="/secret/contact" element={<PersonalContact {...pageProps} />} />
          <Route path="/secret/books" element={<Bookshelf {...pageProps} />} />
          <Route path="/secret/bookstats" element={<ReadingStats {...pageProps} />} />

          <Route path="/legacy" element={<LegacyHome {...pageProps} />} />
          <Route path="/legacy/home" element={<LegacyHome {...pageProps} />} />
          <Route path="/legacy/contact" element={<LegacyContact {...pageProps} />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
