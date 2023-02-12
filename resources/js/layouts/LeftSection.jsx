import React from 'react';
import { Grid } from '@mui/material';
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
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from './../utils/store';
import RightSection from './RightSection';
import { logout } from '../utils/apisauce';


const LeftSection = () => {
  const [open, setOpen] = React.useState(false);
  const { role } = useAuthStore();

  const handleLogout = async () => {
    const res = await logout();

    if (res.data.code == 200) {
      console.log('loggoute');
    }
  }


  const location = useLocation();

  return (
    <React.Fragment>
      <Grid container height={'100vh'}>
        <Grid item xs={2}  >

          <List
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                SCHOLAR HUNTER
              </ListSubheader>
            }
          >
            <Grid py="2rem">
              <React.Suspense fallback={'Loading..'}>
                <Link to='/home' style={{ textDecoration: 'none', color: '#1f2937' }} >
                  {/* <ListItemButton selected={location.pathname === element.path ? true : false}> */}
                  <ListItemButton selected={location.pathname === '/home' ? true : false} >
                    <ListItemIcon>
                      <DashboardRounded />
                    </ListItemIcon>
                    Home
                    {/* {
                    Object.values(pageRoutes)[0]['name'] === 'Home' ?
                      <ListItemText primary={Object.values(pageRoutes)[0]['name']} /> : ''
                  } */}
                  </ListItemButton>
                </Link>
              </React.Suspense>

              <Link to='/listing' style={{ textDecoration: 'none', color: '#1f2937' }} >
                <ListItemButton selected={location.pathname === '/listing' ? true : false}>
                  <ListItemIcon>
                    <ManageAccountsRounded />
                  </ListItemIcon>
                  <ListItemText primary="Scholarship Listing" />
                </ListItemButton>
              </Link>



              {role != 'user' ? <React.Fragment>
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ListItemIcon>
                    <SchoolRounded />
                  </ListItemIcon>
                  <ListItemText primary="Scholar" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  {
                    role !== 'user' && role !== 'admin' ?
                      <Link to='/scholars' style={{ textDecoration: 'none', color: '#1f2937' }} >
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }} selected={location.pathname === '/scholars' ? true : false}>
                            <ListItemIcon>
                              <SchoolRounded />
                            </ListItemIcon>
                            <ListItemText primary="Scholars List" />
                          </ListItemButton>
                        </List>
                      </Link> : <></>
                  }

                  <Link to='/scholarships' style={{ textDecoration: 'none', color: '#1f2937' }} >
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} selected={location.pathname === '/scholarships' ? true : false}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Scholarship " />
                      </ListItemButton>
                    </List>
                  </Link>

                  <Link to='/foundations' style={{ textDecoration: 'none', color: '#1f2937' }} >
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} selected={location.pathname === '/foundations' ? true : false}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Foundations " />
                      </ListItemButton>
                    </List>
                  </Link>

                  <Link to='/users' style={{ textDecoration: 'none', color: '#1f2937' }} >
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} selected={location.pathname === '/users' ? true : false}>
                        <ListItemIcon>
                          <ManageAccountsRounded />
                        </ListItemIcon>
                        <ListItemText primary="User Management" />
                      </ListItemButton>
                    </List>
                  </Link>
                </Collapse>
              </React.Fragment> : <></>}

              <Link to='/profile' style={{ textDecoration: 'none', color: '#1f2937' }} >
                <ListItemButton selected={location.pathname === '/profile' ? true : false}>
                  <ListItemIcon>
                    <ManageAccountsRounded />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </Link>

              <ListItemButton onClick={() => handleLogout()}>
                <ListItemIcon >
                  <ManageAccountsRounded />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </Grid>

          </List>
        </Grid>
        <Grid item xs={10} backgroundColor={'#f9fafb'} >
          <RightSection />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


export default LeftSection;