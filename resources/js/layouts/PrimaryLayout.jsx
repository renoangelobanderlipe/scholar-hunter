import { Grid } from '@mui/material';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { AppbarComponent } from '../components/wrapper/AppbarComponent';
import { ContentWrapper } from '../components/wrapper/ContentWrapper';
import { SidebarComponent } from '../components/wrapper/SidebarComponent';

export const PrimaryLayout = () =>{
  return (
  <BrowserRouter>
    <AppbarComponent />
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <SidebarComponent />
      </Grid>
      <Grid item xs={10}>
    <ContentWrapper />
      </Grid>
    </Grid>
  </BrowserRouter>
  )
}