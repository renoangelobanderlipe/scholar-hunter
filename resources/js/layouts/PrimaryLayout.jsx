import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import useAuthStore from './../utils/store';
import { Route, Routes, useNavigate, redirect } from 'react-router-dom';

import { UnauthorizedPage } from "../fallback/UnauthorizedPage";
const SignUpPage = React.lazy(() => import('./../pages/Auth/SignUpPage'));
const LoginPage = React.lazy(() => import('./../pages/Auth/LoginPage'));
const LeftSection = React.lazy(() => import("../layouts/LeftSection"));
const NotFoundPage = React.lazy(() => import('./../fallback/NotfoundPage'));
// import HomePage from './../pages/HomePage';
// import { UnauthorizedPage } from './../fallback/UnauthorizedPage';

export const PrimaryLayout = () => {
  const { loggedIn, role } = useAuthStore();
  const [status, setStatus] = useState();

  const navigate = useNavigate();

  const checkStatus = () => {
    const resStatus = localStorage.getItem('status');

    setStatus(resStatus);
  }

  useEffect(() => {
    checkStatus();
  }, [])

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
            {status ? <LeftSection /> : <UnauthorizedPage />}
            {/* <LeftSection /> */}
          </React.Fragment>
        }
      </React.Suspense>
    </React.Fragment>
  );
};
