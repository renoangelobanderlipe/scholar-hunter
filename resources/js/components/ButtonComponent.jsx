import React from 'react';
import { Button } from '@mui/material';

export const ButtonComponent = ({ title, variant, onClick, others }) => {

  return (
    <React.Fragment>
      <Button
        {...variant}
        {...others}
        onClick={onClick}>
        {title}
      </Button>
    </React.Fragment>
  )
}