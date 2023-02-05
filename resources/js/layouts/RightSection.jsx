import React from 'react';
import { Box, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import useAuthStore from './../utils/store';
import { Route, Routes } from 'react-router-dom';

const HomePage = React.lazy(() => import('./../pages/HomePage'));
const ScholarshipListing = React.lazy(() => import('./../pages/ScholarshipListing'));
const ProfilePage = React.lazy(() => import('./../pages/Profile/ProfilePage'));
const UserManagementPage = React.lazy(() => import('./../pages/UserManagementPage'));

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
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/listing" element={<ScholarshipListing />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users" element={<UserManagementPage />} />
          </Routes>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default RightSection;