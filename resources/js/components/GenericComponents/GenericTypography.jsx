import { Typography } from "@mui/material";
import React from "react";

export const GenericTypography = ({ title, variant }) => {
  return <Typography {...variant}>{title}</Typography>;
};
