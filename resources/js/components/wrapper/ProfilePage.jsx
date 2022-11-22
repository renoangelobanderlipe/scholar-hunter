import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import { GenericAvatar } from "../GenericComponents/GenericAvatar";
import { GenericIconButton } from "../GenericComponents/GenericIconButton";
import { GenericMenuItem } from "../GenericComponents/GenericMenuItem";

export const ProfilePage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account Settings">
          <GenericIconButton
            handleClick={handleClick}
            variant={{
              size: "small",
            }}
            open={open}
          >
            <GenericAvatar
              title={"G"}
              variant={{
                width: 32,
                height: 32,
              }}
            />
          </GenericIconButton>
          {/* <GenericIconButton
          // onClick={handleClick}
          // variant={{
          //   size: "small",
          // }}
          >
          </GenericIconButton> */}

          {/* <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton> */}
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        // PaperProps={{
        //   elevation: 0,
        //   sx: {
        //     overflow: "visible",
        //     filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        //     mt: 1.5,
        //     "& .MuiAvatar-root": {
        //       width: 32,
        //       height: 32,
        //       ml: -0.5,
        //       mr: 1,
        //     },
        //     "&:before": {
        //       content: '""',
        //       display: "block",
        //       position: "absolute",
        //       top: 0,
        //       right: 14,
        //       width: 10,
        //       height: 10,
        //       bgcolor: "background.paper",
        //       transform: "translateY(-50%) rotate(45deg)",
        //       zIndex: 0,
        //     },
        //   },
        // }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <GenericMenuItem title={"Profile"}>
          <Avatar />
        </GenericMenuItem>

        <MenuItem>
          <Logout fontSize="small" />
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
