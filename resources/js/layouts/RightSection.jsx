import React from 'react';
import { Box, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, Button } from '@mui/material';
import { Grid } from '@mui/material';
import useAuthStore from './../utils/store';
import { Route, Routes, useLocation, Link } from 'react-router-dom';

const ScholarshipListing = React.lazy(() => import('./../pages/ScholarshipListing'));
const ProfilePage = React.lazy(() => import('./../pages/Profile/ProfilePage'));
const UserManagementPage = React.lazy(() => import('./../pages/UserManagementPage'));
const ScholarsListPage = React.lazy(() => import('./../pages/ScholarsListPage'));
const ScholarshipsPage = React.lazy(() => import('./../pages/ScholarshipsPage'));
const FoundationsPage = React.lazy(() => import('./../pages/FoundationsPage'));

import HomePage from './../pages/HomePage';

import { LogoutIcon } from '@mui/icons-material/Logout';
import { profileShow } from './../utils/apisauce';


const RightSection = () => {
  const { role } = useAuthStore();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profile, setProfile] = React.useState();

  const handleFetchUser = async () => {
    const res = await profileShow();

    console.log('res', res);
    if (res.data.code == 200) {
      setProfile(res.data.data);
    }
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    handleFetchUser();
  }, []);


  return (
    <React.Fragment>
      <Box sx={{ width: '100%' }}>
        <Grid container backgroundColor="#263238"  >
          <Box px="2.5rem" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '10vh', width: '100%' }}>
            <Typography sx={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }}>
              {`${location.pathname.split('/')[1].toUpperCase()} PAGE`}
            </Typography>
          </Box >

          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/listing" element={<ScholarshipListing />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users" element={<UserManagementPage />} />
            <Route path="/scholars" element={<ScholarsListPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/foundations" element={<FoundationsPage />} />
          </Routes>
        </Grid >
      </Box >
    </React.Fragment >
  );
}

export default RightSection;

// (
// <Box px="2.5rem" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '10vh', width: '100%' }}>
//   <Typography sx={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }}>
//     {`${location.pathname.split('/')[1].toUpperCase()} PAGE`}
//   </Typography>


//   <Box sx={{flexGrow: 0}}>
//     <Tooltip title="Open settings">
//       <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//         <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//       </IconButton>
//     </Tooltip>
//     <Menu
//       sx={{ mt: "55px" }}
//       id="menu-appbar"
//       anchorEl={anchorElUser}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right"
//       }}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right"
//       }}
//       open={Boolean(anchorElUser)}
//       onClose={handleCloseUserMenu}
//     >
//       <Box sx={{ width: '22vw', backgroundColor: '#c8e6c9', boxShadow: '2' }}>
//         <Box
//           sx={{ borderRadius: '0 0 20px 20px', alignItems: 'center', backgroundColor: '#ffff', padding: '1rem' }}
//         >

//           <Grid container>
//             <Grid container item>
//               <Typography sx={{ fontWeight: 'bold', color: '#455a64' }}>
//                 {{ ...profile }.firstname} {{ ...profile }.lastname}
//               </Typography>

//             </Grid>
//             <Grid container item>
//               <Typography sx={{ fontWeight: 'medium', color: '#455a64' }}>
//                 {{ ...profile }.email}
//               </Typography>

//             </Grid>
//             <MenuItem onClick={handleCloseUserMenu} sx={{ border: '1px solid black', width: '100%', mt: '1.5rem' }} >
//               <Grid container item justifyContent={'center'} >
//                 <Link to='/profile' style={{ textDecoration: 'none' }} >
//                   <Typography sx={{ fontWeight: 'bold', color: "#263238" }}>Manage You Account Profile</Typography>
//                 </Link>
//               </Grid>
//             </MenuItem>
//           </Grid>

//         </Box>
//         <MenuItem onClick={handleCloseUserMenu}>
//           {/* <IconButton onClick={() => console.log('log')}> */}
//           <Typography py="0.5rem">
//             Logout
//             {/* <LogoutIcon /> */}
//           </Typography>
//           {/* </IconButton> */}
//         </MenuItem>
//       </Box>
//     </Menu>
//   </Box>
// </Box>)