import React from "react";

import { Route, Routes } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import useAuthStore from "../config/store";

import { Inbox, Mail } from '@mui/icons-material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';

const HomePage = React.lazy(() => import('./../pages/HomePage'));
const ScholarshipListPage = React.lazy(() => import('./../pages/ScholarshipListPage'));
const ScholarListPage = React.lazy(() => import('./../pages/ScholarListPage'));
const AccountPage = React.lazy(() => import('./../pages/AccountPage'));
const UserManagementPage = React.lazy(() => import('./../pages/UserManagementPage'));
const ScholarshipManagementPage = React.lazy(() => import('./../pages/ScholarshipManagementPage'));
const SignInPage = React.lazy(() => import('./../pages/Auth/SignInPage'));
const SignUpPage = React.lazy(() => import('./../pages/Auth/SignUpPage'));
const LeftSection = React.lazy(() => import('./../components/LeftSection'))
const NotFoundPage = React.lazy(() => import('./../components/NotFoundPage'))
const UnauthorizePage = React.lazy(() => import('./../components/UnauthorizedPage'));

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
    component: <HomePage />,
    icon: ''
  },
  {
    name: 'Scholarships',
    path: '/scholarship-list',
    component: <ScholarshipListPage />,
    icon: ''
  },
  {
    name: 'Scholars',
    path: '/scholars-list',
    component: <ScholarListPage />,
    icon: ''
  },
  {
    name: 'Scholarship',
    path: '/scholarship-management',
    component: <ScholarshipManagementPage />,
    icon: ''
  },
  {
    name: 'Users',
    path: '/user-management',
    component: <UserManagementPage />,
    icon: ''
  },

  {
    name: 'Profile',
    path: '/profile',
    component: <AccountPage />,
    icon: ''
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
