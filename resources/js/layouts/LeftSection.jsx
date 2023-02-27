import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { DashboardRounded, SchoolRounded, ManageAccountsRounded } from '@mui/icons-material';
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ListIcon from '@mui/icons-material/List';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuthStore from './../utils/store';
import RightSection from './RightSection';
import { logout } from '../utils/apisauce';

const LeftSection = () => {
  const [open, setOpen] = React.useState(false);
  const { role,  } = useAuthStore();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();


    if (res.ok) {
      console.log('test logged out', res.data.data.message);
      localStorage.clear()
      navigate('/', { replace: true });
      window.location.reload(false);

    }
  }

  return (
    <React.Fragment>
      <Grid container height={'100vh'} backgroundColor="#263238">
        <Grid item xs={2}  >
          <List
            component="nav"
            subheader={
              <ListSubheader sx={{ height: '4.5rem' }} >
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', }}>
                  <Typography sx={{ fontWeight: 'bold', color: "#263238" }}>SCHOLAR HUNTER</Typography>
                </Box>
              </ListSubheader>
            }
          >
            <Grid py="2rem">
              <React.Suspense fallback={'Loading..'}>
                <Link to='/home' style={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }}  >
                  <ListItemButton selected={location.pathname === '/home' ? true : false} >
                    <ListItemIcon>
                      <DashboardRounded color='primary' />
                    </ListItemIcon>
                    Home
                  </ListItemButton>
                </Link>
              </React.Suspense>

              {role == 'user' || role == 'admin' ? <React.Fragment>
                <Link to='/listing' style={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }} >
                  <ListItemButton selected={location.pathname === '/listing' ? true : false}>
                    <ListItemIcon>
                      <ViewStreamIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary="Scholarship Listing" />
                  </ListItemButton>
                </Link>
              </React.Fragment> : <React.Fragment />}



              {role != 'user' ? <React.Fragment>
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ListItemIcon >
                    <ListIcon color='primary' />
                  </ListItemIcon>
                  <ListItemText sx={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }} primary="Management" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>

                  {
                    role !== 'user' && role !== 'admin' ? (
                      <React.Fragment>
                        <Link to='/scholarships' style={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }} >
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} selected={location.pathname === '/scholarships' ? true : false}>
                              <ListItemIcon>
                                <StarBorder color='primary' />
                              </ListItemIcon>
                              <ListItemText primary="Scholarship " />
                            </ListItemButton>
                          </List>
                        </Link>
                      </React.Fragment>
                    ) : (
                      <React.Fragment />
                    )
                  }

                  {
                    role != 'foundation' ? (
                      <React.Fragment>
                        <Link to='/foundations' style={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }} >
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} selected={location.pathname === '/foundations' ? true : false}>
                              <ListItemIcon>
                                <WorkspacePremiumIcon color='primary' />
                              </ListItemIcon>
                              <ListItemText primary="Foundations " />
                            </ListItemButton>
                          </List>
                        </Link>
                      </React.Fragment>
                    ) : (<React.Fragment />)
                  }

                  {
                    role == 'admin' ? (
                      <React.Fragment>
                        <Link to='/users' style={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }} >
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} selected={location.pathname === '/users' ? true : false}>
                              <ListItemIcon>
                                <ManageAccountsRounded color='primary' />
                              </ListItemIcon>
                              <ListItemText primary="User Management" />
                            </ListItemButton>
                          </List>
                        </Link>
                      </React.Fragment>
                    ) : (
                      <Link to='/scholars' style={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }} >
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }} selected={location.pathname === '/scholars' ? true : false}>
                            <ListItemIcon>
                              <SchoolRounded color='primary' />
                            </ListItemIcon>
                            <ListItemText primary="Scholars List" />
                          </ListItemButton>
                        </List>
                      </Link>
                    )
                  }
                </Collapse>
              </React.Fragment> : <></>}

              <Link to='/profile' style={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }} >
                <ListItemButton selected={location.pathname === '/profile' ? true : false}>
                  <ListItemIcon>
                    <PersonIcon color='primary' />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </Link>

              <ListItemButton onClick={() => handleLogout()} style={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }}>
                <ListItemIcon >
                  <LogoutIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </Grid>

          </List>
        </Grid>
        <Grid item xs={10} backgroundColor={'#f9fafb'} >
          <RightSection />
        </Grid>
      </Grid >
    </React.Fragment >
  );
}


export default LeftSection;