import React, { Fragment } from 'react';
import { Card, Box, CardContent, Typography, Grid } from '@mui/material';

export const CardComponent = ({ title, content }) => {
  return (
    <Fragment>
      <Grid container xs={4} justifyContent="center" >
        <Grid item sx={{ display: 'flex' }}>
          <Card sx={{ display: 'flex', height: '200px', width: '250px', justifyContent: "center", alignItems: 'center', justifyItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
              <CardContent sx={{ height: '100%', justifyContent: 'center' }}>
                <Box mb="1rem">
                  <Typography component="div" variant="h5">
                    {title}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Total : {content}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Fragment >
  );
}