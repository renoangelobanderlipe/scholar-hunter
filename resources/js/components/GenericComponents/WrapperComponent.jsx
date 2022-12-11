import React from "react";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";

export const WrapperComponent = ({ children }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, bgcolor: "#f9fafb", p: 3, height: "100vh" }}>
        <Toolbar />
        <Box height="80vh">{children}</Box>
      </Box>
    </>
  );
};
