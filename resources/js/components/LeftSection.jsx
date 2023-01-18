import React, { useState } from 'react';

import { AppBar, Box, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer } from '@mui/material';

import useAuthStore from '../config/store';
import { useSnackbar } from 'notistack';
import { logout } from '../config/apisauce';
import RightSection from './RightSection';
import { Link, Router, useLocation } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { pageRoutes } from './../layouts/PrimaryLayout';

const drawerWidth = 240;


const LeftSection = () => {
  const [open, setOpen] = useState(false);
  const { setLoggedOut } = useAuthStore();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { drawerName, setDrawerName } = useState('');

  const handleLogOut = async () => {
    const res = await logout();
    console.log(res);
    if (res.data.code != 200) {
      enqueueSnackbar(res.data.message, { variant: 'info' })
      return;
    }

    setLoggedOut(true);
    enqueueSnackbar('Success', { variant: 'success' });

    navigate('/', { replace: true });
  }

  const handleLogout = async () => {
    console.log('logout');
  }
  const location = useLocation();
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#e5e7eb' }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {/* {


              } */}
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
            <ListItemButton onClick={() => handleLogout()}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </List>
        </Drawer>

        <Box
          sx={{ backgroundColor: '#f9fafb', p: 4 }}
        >
          <Toolbar />
          <Box sx={{ height: 600, width: '1225px' }}>
            <RightSection />
          </Box>
        </Box>
      </Box >
    </React.Fragment >
  )
}

export default LeftSection;