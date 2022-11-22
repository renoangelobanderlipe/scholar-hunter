import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

export const GenericMenuItem = ({ title, children }) => {
  return (
    <React.Fragment>
      <Grid container spacing={0.5}>
        <MenuItem>
          <Grid item padding={0.5}>
            {children}
          </Grid>
          <Grid item spacing={0.5}>
            {title}
          </Grid>
        </MenuItem>
      </Grid>
    </React.Fragment>
  );
};
