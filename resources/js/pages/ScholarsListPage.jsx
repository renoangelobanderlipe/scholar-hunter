import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { scholarshipList } from './../utils/apisauce';



const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}


const ScholarsListPage = () => {
  const [rows, setRows] = useState([]);

  const handleList = async () => {
    const res = await scholarshipList();

    if (res.data.code == 200) {
      setRows(res.data.data);
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },
    {
      field: 'contact_no',
      headerName: 'Contact No',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'number',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
    },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            {row.type == 'private' ? <Chip label='Private' color="success" /> : <Chip label='Public' color="primary" />}
          </React.Fragment >
        )
      }
    },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   flex: 1,
    //   renderCell: ({ row }) => {
    //     return (
    //       <React.Fragment>
    //         <IconButton onClick={() => handleDelete(row.id)}>
    //           <DeleteIcon />
    //         </IconButton>
    //         {/* <IconButton onClick={() => handleApprove(row.id)}>
    //           <CheckCircle />
    //         </IconButton> */}
    //         {/* <UserInfo id={row.id} /> */}
    //       </React.Fragment >
    //     )
    //   }

    // },
  ];


  React.useEffect(() => {
    handleList();
  }, []);

  return (
    <React.Fragment>
      <Grid container p={4} backgroundColor="#c8e6c9">
        <Grid container item backgroundColor="#fff" sx={{ minHeight: '80vh', borderRadius: '10px' }}>

          <Grid container p={'2rem'}>
            <DataGrid
              autoHeight
              pageSize={10}
              rowsPerPageOptions={[5, 15, 50, 100]}
              rows={rows ?? []}
              columns={columns}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ScholarsListPage;