import { Avatar } from "@mui/material";
import React from "react";

export const GenericAvatar = ({ variant, title }) => {
  return (
    <React.Fragment>
      <Avatar 
        sx={{ ...variant }}
      >
        {title}
      </Avatar>
    </React.Fragment>
  );
};
