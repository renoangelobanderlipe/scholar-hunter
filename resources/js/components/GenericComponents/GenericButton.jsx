import React from 'react';
import Button from '@mui/material/Button'


export const GenericButton = ({title, variant, onClick}) => {
  return (
    <React.Fragment>
      <Button
        {...variant}
        onClick={onClick}
      >
        {title}
      </Button>
    </React.Fragment>
  );
}