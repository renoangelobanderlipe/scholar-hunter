import React from "react";
import { AppBar, Grid, Toolbar, Typography, Box } from "@mui/material";
import { ProfilePage } from "./ProfilePage";

export const AppbarComponent = ({ drawerWidth }) => {
  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#f3f4f6",
        }}
        elevation={0}
      >
        <Box sx={{ padding: "0.5rem" }}>
          <Grid container gap={0.5}>
            <Grid
              container
              marginRight="2rem"
              display="flex"
              justifyContent="end"
            >
              <ProfilePage />
            </Grid>
            {/* <GenericTypography title={"John Doe"} /> */}
          </Grid>
        </Box>
      </AppBar>
    </React.Fragment>
  );
};
