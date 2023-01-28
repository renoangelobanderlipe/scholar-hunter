import React from 'react';
import { Grid } from '@mui/material';

export const AuthContainer = ({ child }) => {

  return (
    <React.Fragment>
      <Grid container
        height={'100vh'}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}>

        {...child}

      </Grid>
    </React.Fragment>
  )
}