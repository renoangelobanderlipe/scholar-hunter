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
                  <Typography sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '20px', mb: '0.5rem' }}>
                    {title}
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 'bold', color: '#424242', fontSize: '16px' }}>
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