import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { InboxSharp, Dashboard } from "@mui/icons-material";
import { GenericTypography } from "../GenericComponents/GenericTypography";

const sidebarList = ["Dashboard", "Scholars", "Account"];

const iconList = [
  <Dashboard />,
  <InboxSharp />,
  <InboxSharp />,
  <InboxSharp />,
];

export const DrawerComponent = ({ drawerWidth, variant }) => {
  return (
    <React.Fragment>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        {...variant}
      >
        <Toolbar>
          <GenericTypography
            title={"Scholar Hunter"}
            variant={{
              variant: "h6",
              // align : 'right'
            }}
          />
        </Toolbar>

        <List>
          {sidebarList.map((element, index) => (
            <ListItem key={element} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {iconList[index]}
                </ListItemIcon>
                <ListItemText primary={element} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
};
