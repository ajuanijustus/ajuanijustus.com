import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { chosenTheme } from "./config/theme.js";
import { GlobalStyles } from "./config/global.js";
import { settings } from "./config/portfolio.js";

// Page Components
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
  return (
    <ThemeProvider theme={chosenTheme}>
      <>
        <GlobalStyles />
        <HashRouter basename="/">
          <Routes>
            {/* Dynamic Root Route based on Splash setting */}
            {settings.isSplash ? (
              <Route path="/" element={<Splash theme={chosenTheme} />} />
            ) : (
              <Route path="/" element={<Home theme={chosenTheme} />} />
            )}
            
            {/* Standard Pages */}
            <Route path="/home" element={<Home theme={chosenTheme} />} />
            <Route path="/contact" element={<Contact theme={chosenTheme} />} />

            {/* Fun Pages */}
            <Route path="/secret/" element={<PersonalHome theme={chosenTheme} />} />
            <Route path="/secret/home" element={<PersonalHome theme={chosenTheme} />} />
            <Route path="/secret/contact" element={<PersonalContact theme={chosenTheme} />} />
            <Route path="/secret/books" element={<Bookshelf theme={chosenTheme} />} />
            <Route path="/secret/bookstats" element={<ReadingStats theme={chosenTheme} />} />

            {/* Legacy Pages */}
            <Route path="/legacy/" element={<LegacyHome theme={chosenTheme} />} />
            <Route path="/legacy/home" element={<LegacyHome theme={chosenTheme} />} />
            <Route path="/legacy/contact" element={<LegacyContact theme={chosenTheme} />} />
            
            {/* Dedicated Splash Page (only if enabled) */}
            {settings.isSplash && (
              <Route path="/splash" element={<Splash theme={chosenTheme} />} />
            )}
          </Routes>
        </HashRouter>
      </>
    </ThemeProvider>
  );
}

export default App;