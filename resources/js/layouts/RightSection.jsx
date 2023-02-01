import React from 'react';
import { Box, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import NotFoundPage from './../fallback/NotfoundPage';
import HomePage from './../pages/HomePage';
import useAuthStore from './../utils/store';

const RightSection = () => {
  const { role } = useAuthStore();
  return (
    <React.Fragment>
      <Box sx={{ width: '100%' }}>
        <Grid container  >
          <Grid item xs={12} backgroundColor={'#9ca3af'} height={'10vh'}>
            <Typography>
              Home Page
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <React.Suspense fallback={<CircularProgress color="inherit" />}>
              {
                role.role != 'user' ? (<React.Fragment>
                  <Routes>
                    <Route path={'/home'} element={<HomePage />} />
                    {/* <Route path={'/scholar-list'} element={< />} />
                    <Route path={'/home'} element={<HomePage />} /> */}
                    {/* <Route path='*' element={<NotFoundPage />} /> */}
                  </Routes>
                </React.Fragment>
                ) : ""}
            </React.Suspense>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default RightSection;