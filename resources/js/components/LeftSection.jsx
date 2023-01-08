import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import { AppBar, Box, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, MenuItem } from '@mui/material';

import { Inbox, Mail } from '@mui/icons-material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';

import useAuthStore from '../config/store';
import { useSnackbar } from 'notistack';
import { logout } from '../config/apisauce';
import { RightSection } from './RightSection';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const drawerWidth = 240;

const linkPages = [
  {
    name: 'Home',
    path: '/home',
    icon: <DashboardRoundedIcon />
  },
  {
    name: 'Scholars',
    path: '/scholars-list',
    icon: <SchoolRoundedIcon />
  },
  {
    name: 'Scholarship',
    path: '/scholarship-management',
    icon: <SchoolRoundedIcon />
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: <ManageAccountsRoundedIcon />
  },
];


export const LeftSection = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { setLoggedOut } = useAuthStore();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { drawerName, setDrawerName } = useState('');


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = async () => {
    const test = JSON.parse(localStorage.getItem('authStorage'));

    return;
    const res = await logout();
    console.log(res);
    if (res.data.code != 200) {
      enqueueSnackbar(res.data.message, { variant: 'info' })
      return;
    }

    setLoggedOut(true);
    enqueueSnackbar('Success', { variant: 'success' });

    navigate('/login', { replace: true });
  }

  const handleLogout = async () => {
    console.log('logout');
  }

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
              {drawerName}
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
          <List >
            {
              linkPages.map((element, index) => (
                <Link key={index} to={element.path} >
                  <ListItem disablePadding>
                    <ListItemButton  >
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
