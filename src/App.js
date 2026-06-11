import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { chosenTheme, lightTheme, darkTheme } from "./config/theme.js";
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
  // 1. Initialize your dynamic theme state using the configuration's chosenTheme as default
  const [currentTheme, setCurrentTheme] = useState(chosenTheme);

  // 2. Define the toggle engine that alternates between light and dark objects
  const handleThemeToggle = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={currentTheme}> {/* ◄ Swapped chosenTheme out for currentTheme state */}
      <>
        <GlobalStyles />
        <HashRouter basename="/">
          <Routes>
            {/* Dynamic Root Route based on Splash setting */}
            {settings.isSplash ? (
              <Route path="/" element={<Splash theme={currentTheme} onToggle={handleThemeToggle} />} />
            ) : (
              <Route path="/" element={<Home theme={currentTheme} onToggle={handleThemeToggle} />} />
            )}
            
            {/* Standard Pages */}
            <Route path="/home" element={<Home theme={currentTheme} onToggle={handleThemeToggle} />} />
            <Route path="/contact" element={<Contact theme={currentTheme} onToggle={handleThemeToggle} />} />

            {/* Fun Pages */}
            <Route path="/secret/" element={<PersonalHome theme={currentTheme} onToggle={handleThemeToggle} />} />
            <Route path="/secret/home" element={<PersonalHome theme={currentTheme} onToggle={handleThemeToggle} />} />
            <Route path="/secret/contact" element={<PersonalContact theme={currentTheme} onToggle={handleThemeToggle} />} />
            <Route path="/secret/books" element={<Bookshelf theme={currentTheme} onToggle={handleThemeToggle} />} />
            <Route path="/secret/bookstats" element={<ReadingStats theme={currentTheme} onToggle={handleThemeToggle} />} />

            {/* Legacy Pages */}
            <Route path="/legacy/" element={<LegacyHome theme={currentTheme} onToggle={handleThemeToggle} />} />
            <Route path="/legacy/home" element={<LegacyHome theme={currentTheme} onToggle={handleThemeToggle} />} />
            <Route path="/legacy/contact" element={<LegacyContact theme={currentTheme} onToggle={handleThemeToggle} />} />
            
            {/* Dedicated Splash Page (only if enabled) */}
            {settings.isSplash && (
              <Route path="/splash" element={<Splash theme={currentTheme} onToggle={handleThemeToggle} />} />
            )}
          </Routes>
        </HashRouter>
      </>
    </ThemeProvider>
  );
}

export default App;