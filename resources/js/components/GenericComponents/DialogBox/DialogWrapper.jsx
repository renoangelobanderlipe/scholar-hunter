import React from 'react';
import { Dialog } from '@mui/material';


export const DialogWrapper = ({ open, close, children, ...others }) => {
  return (
    <Dialog fullWidth open={open} onClose={close} {...others}>
      {children}
    </Dialog>
  )
}