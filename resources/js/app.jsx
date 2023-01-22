import React from "react";
import ReactDOM from "react-dom/client";
import "../css/app.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PrimaryLayout } from "./layouts/PrimaryLayout.jsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SnackbarProvider   autoHideDuration={3000} >
          <PrimaryLayout />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode >
);
