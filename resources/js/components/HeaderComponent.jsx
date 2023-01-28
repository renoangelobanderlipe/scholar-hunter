import React from 'react';
import Typography from '@mui/material/Typography'


export const HeaderComponent = ({ title, variant }) => {
  return (
    <React.Fragment>
      <Typography
        sx={{ textAlign: 'center' }}
        {...variant}
      >
        {title}
      </Typography>
    </React.Fragment>
  );
}