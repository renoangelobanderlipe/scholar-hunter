import React from "react";
import ReactDOM from "react-dom/client";

import CssBaseline from "@mui/material/CssBaseline";
import { PrimaryLayout } from "./layouts/PrimaryLayout.jsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <SnackbarProvider autoHideDuration={3000} >
        <PrimaryLayout />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode >
);
