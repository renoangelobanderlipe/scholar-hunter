import { CircularProgress } from "@mui/material";
import React from "react";
const ValidateRequestPage = React.lazy(() => import('./../pages/AutComponents/ValidateRequestPage'));
import { Route, Routes } from 'react-router-dom';
import { ProgressIdicator } from './../fallback/ProgressIndicator';


export const PrimaryLayout = () => {

  return (
    <React.Fragment>
      <React.Suspense fallback={<ProgressIdicator />} >
        <Routes>
          <Route path="/" element={<ValidateRequestPage />} />
        </Routes>
      </React.Suspense>
    </React.Fragment>
  );
};
