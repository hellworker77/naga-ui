import {createRoot} from "react-dom/client"
import App from "./App"
import {StrictMode} from "react";
import "./index.css"
import React from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)