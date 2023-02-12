import React from 'react';
import { Box, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import useAuthStore from './../utils/store';
import { Route, Routes, useLocation } from 'react-router-dom';

const HomePage = React.lazy(() => import('./../pages/HomePage'));
const ScholarshipListing = React.lazy(() => import('./../pages/ScholarshipListing'));
const ProfilePage = React.lazy(() => import('./../pages/Profile/ProfilePage'));
const UserManagementPage = React.lazy(() => import('./../pages/UserManagementPage'));
import ScholarshipsPage from './../pages/ScholarshipsPage';
import FoundationsPage from './../pages/FoundationsPage';

const RightSection = () => {
  const { role } = useAuthStore();
  const location = useLocation();
  return (
    <React.Fragment>
      <Box sx={{ width: '100%' }}>
        <Grid container  >
          <Grid item xs={12} backgroundColor={'#9ca3af'} height={'10vh'}>
            <Typography>
              {`${location.pathname.split('/')[1].toUpperCase()} PAGE`}
            </Typography>
          </Grid>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/listing" element={<ScholarshipListing />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users" element={<UserManagementPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/foundations" element={<FoundationsPage />} />
          </Routes>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default RightSection;