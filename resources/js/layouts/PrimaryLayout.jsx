import React from "react";

import { Route, Routes } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import useAuthStore from "../config/store";

import { Inbox, Mail, DashboardRounded, SchoolRounded, ManageAccountsRounded } from '@mui/icons-material';

const HomePage = React.lazy(() => import('./../pages/HomePage'));
const ScholarshipListPage = React.lazy(() => import('./../pages/ScholarshipListPage'));
const ScholarListPage = React.lazy(() => import('./../pages/ScholarListPage'));
const AccountPage = React.lazy(() => import('./../pages/AccountPage'));
const UserManagementPage = React.lazy(() => import('./../pages/UserManagementPage'));
const ScholarshipManagementPage = React.lazy(() => import('./../pages/ScholarshipManagementPage'));
const SignInPage = React.lazy(() => import('./../pages/Auth/SignInPage'));
const SignUpPage = React.lazy(() => import('./../pages/Auth/SignUpPage'));
const NotFoundPage = React.lazy(() => import('./../components/NotFoundPage'))
const UnauthorizePage = React.lazy(() => import('./../components/UnauthorizedPage'));
import LeftSection from './../components/LeftSection';

const wrapper = {
  height: '100vh',
}

const signInDesign = {
  height: '100%',
  display: 'flex',
  alignItems: 'center'
}

export const pageRoutes = [
  {
    name: 'Home',
    path: '/',
    component: <HomePage />,
    role: 'all',
    icon: <DashboardRounded />
  },
  {
    name: 'Scholarships',
    path: '/scholarship-list',
    component: <ScholarshipListPage />,
    role: '',
    icon: <SchoolRounded />
  },
  {
    name: 'Scholars',
    path: '/scholars-list',
    component: <ScholarListPage />,
    icon: <SchoolRounded />
  },
  {
    name: 'Scholarship',
    path: '/scholarship-management',
    component: <ScholarshipManagementPage />,
    icon: <SchoolRounded />
  },
  {
    name: 'Users',
    path: '/user-management',
    component: <UserManagementPage />,
    icon: <ManageAccountsRounded />
  },

  {
    name: 'Profile',
    path: '/profile',
    component: <AccountPage />,
    icon: <ManageAccountsRounded />
  },
];

export const PrimaryLayout = () => {
  const { loggedIn } = useAuthStore();

  return (
    <React.Fragment>
      {
        !loggedIn ? (
          <Box sx={wrapper}>
            <Box sx={signInDesign} >
              <React.Suspense fallback={'Loading...'}>
                <Routes>
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
              <LeftSection />
            </Grid>
          )
      }
    </React.Fragment>
  );
};
