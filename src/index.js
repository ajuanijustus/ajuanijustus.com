import React from "react";
import { createRoot } from "react-dom/client";
import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import "./index.css";

import App from "./App";

// old links used hash urls (/#/secret/books), send them to the real path
if (window.location.hash.startsWith("#/")) {
  window.history.replaceState(null, "", window.location.hash.slice(1));
}

const engine = new Styletron();
const root = createRoot(document.getElementById("root"));

root.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <App />
    </BaseProvider>
  </StyletronProvider>
);
