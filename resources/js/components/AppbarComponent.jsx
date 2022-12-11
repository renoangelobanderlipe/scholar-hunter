import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const AppbarComponent = ({ children }) => {
  return (
    <>
      <AppBar
        color="transparent"
        position="fixed"
        sx={{
          boxShadow: "none",
        }}
      >
        {/* <Toolbar variant="regular" sx={{ backgroundColor: "orange" }}> */}
        {/* <Box sx={{ height: "10%", backgroundColor: "orange" }}> */}
        {/* <Typography variant="body1" color="initial">
          asdasdasvadsfvbfdsfgbnvf asdasdasvadsfvbfdsfgbnvf
          asdasdasvadsfvbfdsfgbnvf asdasdasvadsfvbfdsfgbnvf
          asdasdasvadsfvbfdsfgbnvf
        </Typography> */}
        {/* </Box> */}
        {/* </Toolbar> */}
      </AppBar>
    </>
  );
};
