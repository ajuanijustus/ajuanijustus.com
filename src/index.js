import React from "react";
import { createRoot } from "react-dom/client"; // Modern React 18 rendering package
import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import "./index.css";

import App from "./App";

const engine = new Styletron();
const container = document.getElementById("root");
const root = createRoot(container); // Initializes the modern React concurrent engine

root.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <App />
    </BaseProvider>
  </StyletronProvider>
);