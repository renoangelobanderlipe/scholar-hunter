import React from "react";

import { Route, Routes } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import useAuthStore from "../config/store";

const HomePage = React.lazy(() => import('./../pages/HomePage'));
const ScholarshipListPage = React.lazy(() => import('./../pages/HomePage'));
const ScholarListPage = React.lazy(() => import('./../pages/HomePage'));
const AccountPage = React.lazy(() => import('./../pages/HomePage'));
const UserManagementPage = React.lazy(() => import('./../pages/HomePage'));
const ScholarshipManagementPage = React.lazy(() => import('./../pages/HomePage'));
const SignInPage = React.lazy(() => import('./../pages/Auth/SignInPage'));
const SignUpPage = React.lazy(() => import('./../pages/Auth/SignUpPage'));
const LeftSection = React.lazy(() => import('./../components/LeftSection'))
const NotFoundPage = React.lazy(() => import('./../components/NotFoundPage'))

const wrapper = {
  height: '100vh',
}

const signInDesign = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const pageRoutes = [
  {
    name: 'Home',
    path: '/home',
    component: <HomePage />
  },
  {
    name: 'Scholarship List',
    path: '/scholarship-list',
    component: <ScholarshipListPage />
  },
  {
    name: 'Scholars',
    path: '/scholars-list',
    component: <ScholarListPage />
  },
  {
    name: 'Profile',
    path: '/profile',
    component: <AccountPage />
  },
  {
    name: 'User Management',
    path: '/user-management',
    component: <UserManagementPage />
  },
  {
    name: 'Scholarship Management',
    path: '/scholarship-management',
    component: <ScholarshipManagementPage />
  },
];

export const PrimaryLayout = () => {
  const { loggedIn } = useAuthStore();
  console.log('login status', loggedIn);
  return (
    <React.Fragment>
      {
        !loggedIn ? (
          <Box sx={wrapper}>
            <Box sx={signInDesign} >
              <React.Suspense fallback='Loading...'>
                <Routes>
                  {/* <Route key={index} path={element.path} element={element.component} /> */}
                  <Route path="/" element={<SignInPage />} />
                  <Route path="/register" element={<SignUpPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </React.Suspense>
            </Box>
          </Box>
        )
          :
          (
            <Grid container>
              <Grid item>
                <LeftSection />
              </Grid>
            </Grid>
          )
      }
    </React.Fragment>
  );
};
