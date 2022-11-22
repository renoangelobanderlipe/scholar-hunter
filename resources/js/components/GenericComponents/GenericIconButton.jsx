import React from "react";
import { IconButton } from "@mui/material";

export const GenericIconButton = ({ variant, handleClick, children }) => {
  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        {...variant}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {children}
      </IconButton>
    </React.Fragment>
  );
};
