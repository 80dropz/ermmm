import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you're using `createRoot` correctly
import App from "./App";
import "./index.css";

// This is the entry point for the app
const root = ReactDOM.createRoot(document.getElementById("root")); // This should match the id of your root div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
