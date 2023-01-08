import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { ProfileInformation } from '../components/ProfileComponent/ProfileInformation';
import { Password } from './../components/ProfileComponent/Password';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AccountPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log('value', newValue);
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', }}>
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
          <ProfileInformation />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Password />
        </TabPanel>

      </Box>
    </React.Fragment>
  )
}

export default AccountPage;