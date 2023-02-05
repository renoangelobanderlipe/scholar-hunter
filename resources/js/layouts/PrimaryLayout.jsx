import { CircularProgress } from "@mui/material";
import React from "react";
import useAuthStore from './../utils/store';
import { Route, Routes } from 'react-router-dom';

const SignUpPage = React.lazy(() => import('./../pages/Auth/SignUpPage'));
const LoginPage = React.lazy(() => import('./../pages/Auth/LoginPage'));
const LeftSection = React.lazy(() => import("../layouts/LeftSection"));
const NotFoundPage = React.lazy(() => import('./../fallback/NotfoundPage'));
import ScholarshipListing from './../pages/ScholarshipListing';
import HomePage from './../pages/HomePage';

export const PrimaryLayout = () => {
  const { loggedIn, role, status } = useAuthStore();
  console.log('test', loggedIn ? 'true' : 'false');
  return (
    <React.Fragment>
      <React.Suspense fallback={<CircularProgress color="success" />}>
        {!loggedIn ?
          <Routes>
            <React.Fragment>
              <Route path="/register" element={<SignUpPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </React.Fragment>
          </Routes>
          :
          <React.Fragment>
            <LeftSection />
          </React.Fragment>
        }
      </React.Suspense>
    </React.Fragment>
  );
};
