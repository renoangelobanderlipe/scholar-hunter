import React from 'react';
import { Button, Card, CardContent, CardMedia, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';


const NotFoundPage = () => {
  const navigate = useNavigate();

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