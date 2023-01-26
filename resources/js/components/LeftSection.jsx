import React from 'react';

import { AppBar, Box, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Grid } from '@mui/material';

import useAuthStore from '../config/store';
import { useSnackbar } from 'notistack';
import { logout } from '../config/apisauce';
import RightSection from './RightSection';
import { Link, useLocation } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { pageRoutes } from './../layouts/PrimaryLayout';

const drawerWidth = 240;

const LeftSection = () => {
  const { setLoggedOut } = useAuthStore();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const location = useLocation();
  const pathName = location.pathname.split('/')[1];

  const handleLogout = async () => {
    const res = await logout();

    if (res.data.code == 200) {
      setLoggedOut(true);
      enqueueSnackbar('Success', { variant: 'success' });
      navigate('/', { replace: true });
    }
    console.log('logout error', res.data.message);
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#86efac' }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {location.pathname.split('/')[1].split('-').length > 1 ? `${pathName.split('-')[0].toUpperCase()} ${pathName.split('-')[1].toUpperCase()} ` : location.pathname.split('/')[1].split('-')[0].toUpperCase()}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {
              pageRoutes.map((element, index) => (
                <Link key={index} to={element.path} style={{ textDecoration: 'none', color: '#1f2937' }} >
                  <ListItem disablePadding >
                    <ListItemButton selected={location.pathname === element.path ? true : false} >
                      <ListItemIcon>
                        {element.icon}
                      </ListItemIcon>
                      <ListItemText primary={element.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))
            }
          </ List>
          <Divider />
          <List>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </List>
        </Drawer>

        <Grid width={'100%'} height={'100%'} p={4}>
          <Toolbar />
          <RightSection />
        </Grid>
      </Box >
    </React.Fragment >
  )
}

export default LeftSection;