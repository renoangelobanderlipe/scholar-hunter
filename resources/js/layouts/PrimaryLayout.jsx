import React from "react";
import { Grid } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { LeftSection } from "../components/LeftSection";
import { RightSection } from "../components/RightSection";
import { AppbarComponent } from "../components/wrapper/AppbarComponent";
import { SidebarComponent } from "../components/wrapper/SidebarComponent";
import { WrapperContainer } from "../components/wrapper/WrapperContainer";
import { SignUpPage } from "../components/Auth/SignUpPage";
import { SignInPage } from "../components/Auth/SignInPage";

// const drawerWidth = 200;
export const PrimaryLayout = () => {
  return (
    <BrowserRouter>
      <Grid container spacing={2}>
        {/* <AppbarComponent drawerWidth={drawerWidth} /> */}
        <Grid item xs={2}>
          <RightSection />
        </Grid>
        <Grid item>
          <LeftSection />
        </Grid>

        {/* <SignInPage/> */}
      </Grid>
    </BrowserRouter>
  );
};
