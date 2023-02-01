import React from 'react';

import { CircularProgress } from '@mui/material';
import NotFoundPage from './../../fallback/NotfoundPage';
import { Routes, Route } from 'react-router-dom';
import { LeftSection } from './../../layouts/LeftSection';
import HomePage from './../HomePage';
import { DashboardRounded } from '@mui/icons-material';
import useAuthStore from './../../utils/store';

const LoginPage = React.lazy(() => import('./../Auth/LoginPage'));
const SignUpPage = React.lazy(() => import('./../Auth/SignUpPage'));
import { UnauthorizedPage } from './../../fallback/UnauthorizedPage';

export const pageRoutes = [
  {
    name: 'Home',
    path: '/',
    component: <HomePage />,
    role: 'all',
    icon: <DashboardRounded />
  }
]


const ValidateRequestPage = () => {
  const { loggedIn, role } = useAuthStore();

  console.log('test ', loggedIn, role.role);
  return (
    <React.Fragment>
      {
        role.role != 'user' ? !loggedIn ? (
          <React.Fragment>
            <React.Suspense fallback={<CircularProgress color="success" />}>
              <Routes>
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </React.Suspense>
          </React.Fragment>
        ) :
          (
            <LeftSection />
          ) : (<UnauthorizedPage />)
      }
    </React.Fragment>
  );
}


export default ValidateRequestPage;