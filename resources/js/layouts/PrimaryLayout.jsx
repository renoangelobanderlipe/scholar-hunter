import React from "react";

import { Route, Routes } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { NotFoundPage } from './../components/NotFoundPage';

import { LeftSection } from './../components/LeftSection';
import useAuthStore from "../config/store";

const SignInPage = React.lazy(() => import('./../pages/Auth/SignInPage'));
const SignUpPage = React.lazy(() => import("../pages/Auth/SignUpPage"));

const wrapper = {
  height: '100vh',
}

const first = {
  width: '50%',
  height: '100vh',
  backgroundColor: 'green'
}
const second = {
  width: '50%',
  height: '100vh',
}

const signInDesign = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const PrimaryLayout = () => {
  const { loggedIn } = useAuthStore();

  console.log('test', loggedIn);
  
  return (
    <React.Fragment>
      {
        !loggedIn ? (<Box sx={wrapper}>
          <Grid container justifyContent='space-between'>
            <Grid item sx={first}>
              <Box>
                LOTTIE FALLBACK HERE!
              </Box>
            </Grid>

            <Grid item sx={second}>
              <Box sx={signInDesign} >
                <React.Suspense fallback='Loading...'>
                  <Routes>
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/register" element={<SignUpPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </React.Suspense>
              </Box>
            </Grid>
          </Grid>
        </Box>)
          :
          (
            <React.Fragment>
              <Grid container>
                <Grid item>
                  <LeftSection />
                </Grid>
              </Grid>
            </React.Fragment>
          )
      }
    </React.Fragment>
  );
};
