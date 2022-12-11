import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";



const drawerWidth = 240;
export const DrawerComponent = ({ navLinks, children }) => {
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "#f9fafb",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>{children}</Toolbar>
        <List>
          {navLinks.map((element, index) => (
            <ListItem key={element} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <TimelineOutlinedIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={element} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
