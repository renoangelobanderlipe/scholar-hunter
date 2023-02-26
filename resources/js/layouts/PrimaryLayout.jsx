import { CircularProgress } from "@mui/material";
import React from "react";
import useAuthStore from './../utils/store';
import { Route, Routes } from 'react-router-dom';
import { roleListener } from "../utils/apisauce";

const SignUpPage = React.lazy(() => import('./../pages/Auth/SignUpPage'));
const LoginPage = React.lazy(() => import('./../pages/Auth/LoginPage'));
const LeftSection = React.lazy(() => import("../layouts/LeftSection"));
const NotFoundPage = React.lazy(() => import('./../fallback/NotfoundPage'));
// import HomePage from './../pages/HomePage';
// import { UnauthorizedPage } from './../fallback/UnauthorizedPage';

export const PrimaryLayout = () => {

  const fetchRole = async () => {
    const res = await roleListener();

    console.log(res.data);
  }

  const { loggedIn, role } = useAuthStore();
  console.log(loggedIn, role)
  React.useEffect(() => {
    fetchRole();
  }, []);

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
            {/* {status == 'active' ? <LeftSection /> : <UnauthorizedPage />} */}
            <LeftSection />
          </React.Fragment>
        }
      </React.Suspense>
    </React.Fragment>
  );
};
