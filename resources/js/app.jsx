import "./bootstrap.js";
import React from "react";
import ReactDOM from "react-dom/client";
import "../css/app.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PrimaryLayout } from "./layouts/PrimaryLayout.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <PrimaryLayout />
    </ThemeProvider>
  </React.StrictMode>
);
