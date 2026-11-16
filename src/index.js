import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";

// old links used hash urls (/#/secret/books), send them to the real path
if (window.location.hash.startsWith("#/")) {
  window.history.replaceState(null, "", window.location.hash.slice(1));
}

const root = createRoot(document.getElementById("root"));

root.render(<App />);
