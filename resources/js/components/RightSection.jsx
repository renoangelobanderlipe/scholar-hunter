import React from "react";
import { Routes, Route } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';
import { pageRoutes } from './../layouts/PrimaryLayout';
import { CircularProgress } from "@mui/material";

const RightSection = () => {
  return (
    <React.Suspense fallback={<CircularProgress color="inherit" />}>
      <Routes>
        {
          pageRoutes.map((page, index) => (
            <Route key={index} path={page.path} element={page.component} />
          )
          )
        }
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
};


export default RightSection;