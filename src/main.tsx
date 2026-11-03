// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

// Self-hosted variable fonts (replaces the Google Fonts @import).
// The browser downloads only the Latin subset files it actually needs.
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);