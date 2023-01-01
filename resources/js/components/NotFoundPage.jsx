import React from 'react';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'


export const NotFoundPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const navigate = useNavigate();

  const handleClick = () => {
    enqueueSnackbar('HAKDOG', { variant: 'success' })
  }

  return (
    <>
      NOT FOUNDSHIT
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </>
  )
}