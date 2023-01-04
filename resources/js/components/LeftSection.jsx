import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';

import { Box, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Button } from '@mui/material';

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import { Dashboard, School, ManageAccounts, Menu, ChevronLeft, ChevronRight, Inbox, Mail } from '@mui/icons-material';

import { RightSection } from './RightSection';
import useAuthStore from '../config/store';
import { useSnackbar } from 'notistack';
import { logout } from '../config/apisauce';
import axios from 'axios';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export const LeftSection = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { setLoggedOut } = useAuthStore();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            {/* <Typography variant="h6" noWrap component="div">
              PAGE TITLE SANA TO 
            </Typography> */}
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>

          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <List>
            {['Home', 'Scholarship', 'Profile'].map((element, index) => (
              <ListItem key={element} disablePadding sx={{ display: 'block' }}>

                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? <Dashboard /> : <Mail />}
                  </ListItemIcon>

                  {/* <Link to={page}></Link> */}

                </ListItemButton>

              </ListItem>
            ))}
          </List>

          <Divider />
          <Button onClick={() => handleLogOut()}>LOGOUT</Button>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <RightSection />
        </Box>
      </Box>

    </React.Fragment>
  )
}
