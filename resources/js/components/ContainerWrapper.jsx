import React, { Fragment } from 'react';
import { Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';


export const ContainerWrapper = ({ children }) => {

  const location = useLocation();

  return (
    <Fragment>
      <Grid container p={1} backgroundColor="#c8e6c9">
        <Grid container item backgroundColor="#fff" sx={{ borderRadius: '10px' }}>

          <Grid p={'1rem'} display="flex" alignItems='center'>
            <Typography sx={{ fontSize: '24px', color: "#424242", fontWeight: 'bold' }}>
              {`${location.pathname.split('/')[1].toUpperCase()} PAGE`}
            </Typography>
          </Grid>
          <Grid container p={'1rem'} minHeight='80vh'>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}