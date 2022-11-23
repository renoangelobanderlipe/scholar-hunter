import {
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Collapse,
} from "@mui/material";
import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useAuthStore } from './appState';
// import Permission from './Permission';

const CustomLinkMenuItem = ({ children, to, end, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: end && true });

  return (
    <MenuItem component={NavLink} to={to} {...props} selected={match !== null}>
      <ListItemIcon>{match ? <ArrowForwardIosIcon /> : undefined}</ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  );
};

const ProtectedLinks = ({ children }) => {
  // const { loggedIn } = useAuthStore();
  return <Collapse in={loggedIn}>{children}</Collapse>;
};

export const LeftSection = () => {
  const loggedIn = true;
  // return { 'sadasdsa '};
};
