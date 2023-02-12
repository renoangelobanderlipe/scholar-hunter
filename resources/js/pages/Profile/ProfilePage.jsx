import React from 'react';
import { Box, Tab, Tabs, Typography, Grid } from '@mui/material';
import { ProfileInfo } from './ProfileInfo';
import { PasswordInfo } from './PasswordInfo';
import { updateProfile } from '../../utils/apisauce';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Grid>
      )}
    </Grid>
  );
}

const ProfilePage = () => {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <React.Fragment>
      <Grid container p={4} backgroundColor="#c8e6c9">
        <Grid container item backgroundColor="#fff" sx={{ minHeight: '80vh', borderRadius: '10px' }}>
          <Grid container p={'2rem'}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label="Profile" />
              <Tab label="Password" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <ProfileInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PasswordInfo />
            </TabPanel>
          </Grid>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}

export default ProfilePage;