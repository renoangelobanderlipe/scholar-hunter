import { Grid, Button, Card, CardContent, CardMedia, Stack } from '@mui/material';
import React from 'react';

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <Stack alignItems='center'>
        <Card sx={{ backgroundColor: 'transparent' }}>
          <CardMedia component="iframe" sx={{ minHeight: '450px', minWidth: '350px', height: '50vh', width: '40vw', border: 'none' }} src="https://embed.lottiefiles.com/animation/89922"></CardMedia>
          <Grid container justifyContent='center'>
            <CardContent >
              <Button onClick={() => navigate(-1)}>Go Back</Button>
            </ CardContent>
          </Grid>
        </Card>
      </Stack>
    </React.Fragment>
  )
}

export default NotFoundPage;