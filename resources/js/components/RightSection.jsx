import React from "react";
import { Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { SignInPage } from './../pages/Auth/SignInPage';

export const RightSection = () => {
  const rows = [
    {
      id: 1,
      name: "Name",
    },
    {
      id: 2,
      name: "181-1794-2",
    },
    {
      id: 2,
      name: "Age",
    },
    {
      id: 2,
      name: "Gender",
    },
    {
      id: 3,
      name: "Action",
    },
  ];

  const columns = [
    { field: "name", width: 150 },
    { field: "id", width: 150 },
    { field: "age", width: 150 },
    { field: "gender", width: 150 },
    { field: "stars", width: 150 },
  ];

  return (
    <Box
      sx={{
        padding: "1.5rem",
        borderRadius: "10px",
        height: "80vh",
      }}
    >
      {/* <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography> */}

      {/* <DataGrid
        rows={rows}
        columns={columns}
        componentsProps={{
          columnMenu: { background: "red", counter: rows.length },
        }}
      /> */}
    </Box>
  );
};
