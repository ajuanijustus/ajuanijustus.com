import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { chosenTheme } from "./config/theme.js";
import { GlobalStyles } from "./config/global.js";
import { settings } from "./config/portfolio.js";

// Page Components
import Home from "./pages/home/HomeComponent";
import Splash from "./pages/splash/Splash";
import Contact from "./pages/contact/ContactComponent";

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