import React from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/material';

export const ButtonComponent = ({ title, variant, onClick, others }) => {

  return (
    <React.Fragment>
      <Box sx={{ py: '1rem' }}>
        <Button
          disableElevation
          fullWidth
          {...variant}
          {...others}
          onClick={onClick}>
          {title}
        </Button>
      </Box>
    </React.Fragment>
  )
}