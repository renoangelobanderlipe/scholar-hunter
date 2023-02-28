import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

export const UnauthorizedPage = () => {
  return (
    <React.Fragment>
      <Box height="100vh" display={'flex'} justifyContent="center" alignItems={"center"}>
        <Grid >
          <Typography variant="body1" color="initial">
            Unauthorize Access Please Contact Admin/SAS... Thank You!
          </Typography>
          <Grid item display={'flex'} justifyContent={'center'} >
            {/* <Button variant="outline" onClick={() => window.location.reload(false)}>Refresh</Button> */}
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}