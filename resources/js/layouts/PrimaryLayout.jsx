import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import { WrapperComponent } from "./../components/GenericComponents/WrapperComponent";
import { DrawerComponent } from "./../components/DrawerComponent";
import { RightSection } from "./../components/RightSection";
import { AppbarComponent } from "./../components/AppbarComponent";
import { DashboardPage } from "./../components/DashboardPage";
import { SignInPage } from "./../pages/Auth/SignInPage";
import { SignUpPage } from "./../pages/Auth/SignUpPage";
import { AdminAccountPage } from "./../pages/AdminPages/AdminAccountPage";

const navLinks = ["Dashboard", "Scholar List", "User Management", "My Account"];

export const PrimaryLayout = () => {
  const isLoggedIn = true;
  return (
    <>
      <Routes>
        {isLoggedIn == true ? (
          <Route path="/" element={<DashboardPage />}>
            <Route path="/login" element={<AdminAccountPage />} />
          </Route>
        ) : (
          <Route path="/" element={<SignInPage />} />
        )}
      </Routes>
    </>

    // <Routes>

    // </Routes>

    // <Box
    //   sx={{
    //     display: "flex",
    //     width: "100%",
    //   }}
    // >
    //   <AppbarComponent>
    //     <Typography variant="body1" color="initial">
    //       profile page here
    //     </Typography>
    //   </AppbarComponent>

    //   <DrawerComponent navLinks={navLinks}>
    //     <Typography>Scholar Hunter</Typography>
    //   </DrawerComponent>

    //   <WrapperComponent>
    //     <RightSection />
    //   </WrapperComponent>
    // </Box>
  );
};
