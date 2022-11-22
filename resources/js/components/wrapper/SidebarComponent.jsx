import React from "react";
import { DrawerComponent } from "./DrawerComponent";

const drawerWidth = 200;
export const SidebarComponent = () => {
  return (
    <React.Fragment>
      <DrawerComponent
        drawerWidth={drawerWidth}
        variant={{
          variant: "permanent",
          anchor: "left",
        }}
      />
    </React.Fragment>
  );
};
