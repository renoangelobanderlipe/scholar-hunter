import React from "react";
import { Routes, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('./../pages/HomePage'));
const AccountPage = React.lazy(() => import('./../pages/AccountPage'));
const ScholarshipListPage = React.lazy(() => import('./../pages/ScholarshipListPage'));
const ScholarListPage = React.lazy(() => import('./../pages/ScholarListPage'));
import { NotFoundPage } from './NotFoundPage';
import { LeftSection } from './LeftSection';


const pagesComponent = [
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
];


export const RightSection = () => {
  
  
  return (
    <React.Suspense fallback="Loading...">
      <Routes>
        {
          pagesComponent.map((page, index) => (
            <Route key={index} path={page.path} element={page.component} />
          )
          )
        }
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
};
