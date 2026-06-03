import React, { Component } from "react";
import { HashRouter, Routes, Route } from "react-router-dom"; // Swapped Switch for Routes
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Contact from "../pages/contact/ContactComponent";
import { settings } from "../portfolio.js";

export default class Main extends Component {
  render() {
    const theme = this.props.theme;
    console.log(theme);

    if (settings.isSplash) {
      return (
        <div>
          <HashRouter basename="/">
            <Routes>
              {/* Changed 'render' functions to 'element' layout blocks and removed 'exact' */}
              <Route path="/" element={<Splash theme={theme} />} />
              <Route path="/home" element={<Home theme={theme} />} />
              <Route path="/contact" element={<Contact theme={theme} />} />
              <Route path="/splash" element={<Splash theme={theme} />} />
            </Routes>
          </HashRouter>
        </div>
      );
    } else {
      return (
        <div>
          <HashRouter basename="/">
            <Routes>
              <Route path="/" element={<Home theme={theme} />} />
              <Route path="/home" element={<Home theme={theme} />} />
              <Route path="/contact" element={<Contact theme={theme} />} />
            </Routes>
          </HashRouter>
        </div>
      );
    }
  }
}