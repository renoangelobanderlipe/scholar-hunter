import { Grid } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppbarComponent } from "../components/wrapper/AppbarComponent";
import { SidebarComponent } from "../components/wrapper/SidebarComponent";
import { WrapperContainer } from "../components/wrapper/WrapperContainer";

const drawerWidth = 200;
export const PrimaryLayout = () => {
  return (
    <BrowserRouter>
      <Grid container spacing={2}>
        <AppbarComponent drawerWidth={drawerWidth} />

        <Grid item xs={2}>
          <SidebarComponent />
        </Grid>
        <Grid item>
          <WrapperContainer />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
};
