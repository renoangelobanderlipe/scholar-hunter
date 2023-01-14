import React from "react";
import { Routes, Route } from 'react-router-dom';



import { NotFoundPage } from './NotFoundPage';
import { pageRoutes } from './../layouts/PrimaryLayout';

export const RightSection = () => {


  return (
    <React.Suspense fallback="Loading...">
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
