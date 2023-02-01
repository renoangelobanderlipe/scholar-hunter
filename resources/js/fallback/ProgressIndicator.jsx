import React from 'react';
import { CircularProgress } from '@mui/material';
import { Grid } from '@mui/material';

export const ProgressIdicator = () => {
  return (
    <React.Fragment>
      <Grid
        alignItems="center"
        // justifyContent="center"
        sx={{ minHeight: '100vh', minWidth: '100vw' }}>
        <CircularProgress color="success" />
      </Grid>
    </React.Fragment>
  );
};