import React from 'react';
import { Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import { Grid } from '@mui/material';


export const NotFoundPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const navigate = useNavigate();

  const handleClick = () => {
    enqueueSnackbar('HAKDOG', { variant: 'success' })
  }

  return (
    <>
      <Stack alignItems='center'>
        <Card sx={{ backgroundColor: 'transparent' }}>
          <CardMedia component="iframe" sx={{ minHeight: '450px', minWidth: '350px', height: '50vh', width: '40vw', border: 'none' }} src="https://embed.lottiefiles.com/animation/89922"></CardMedia>
          <Grid container justifyContent ='center'>
            <CardContent >
              <Button onClick={() => navigate(-1)}>Go Back</Button>
            </ CardContent>
          </Grid>
        </Card>
      </Stack>
    </>
  )
}