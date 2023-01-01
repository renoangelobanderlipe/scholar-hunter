import React from 'react';
import { Typography } from '@mui/material';

export const GenericTypography = ({variant,title, others}) => {
  return (
    <React.Fragment>
      <Typography
        {...variant}
        {...others}
      >
        {title}
      </Typography>
    </React.Fragment>
  )
} 