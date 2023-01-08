import React from "react";
import Button from "@mui/material/Button";

export const GenericButton = ({ title, variant, onClick, others }) => {
  return (
    <React.Fragment>
      <Button {...variant} {...others} onClick={onClick}>
        {title}
      </Button>
    </React.Fragment>
  );
};
