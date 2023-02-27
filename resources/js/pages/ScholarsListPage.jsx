import React, { useState } from 'react';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { downloadFile, scholarshipList, scholarsList } from './../utils/apisauce';
import DeleteIcon from '@mui/icons-material/Delete';
import { CheckCircle } from '@mui/icons-material';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';

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
    const res = await scholarsList();

    if (res.data.code == 200) {
      setRows(res.data.data);
    }
  }

  const handleDownload = async () => {
    const res = await downloadFile();
    console.log(res);
    if (res.ok) {
      const link = document.createElement("a");
      link.download = `download.txt`;
      link.href = "./download.txt";
      link.click();
    }
  }
  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 90, hide: true },
  //   { field: 'name', headerName: 'Name', width: 150 },
  //   {
  //     field: 'description',
  //     headerName: 'Description',
  //     flex: 1,
  //   },
  //   {
  //     field: 'address',
  //     headerName: 'Address',
  //     flex: 1,
  //   },
  //   {
  //     field: 'contact_no',
  //     headerName: 'Contact No',
  //     flex: 1,
  //   },
  //   {
  //     field: 'email',
  //     headerName: 'Email',
  //     type: 'number',
  //     flex: 1,
  //   },
  //   {
  //     field: 'type',
  //     headerName: 'Type',
  //     flex: 1,
  //   },

  //   // {
  //   //   field: 'status',
  //   //   headerName: 'Status',
  //   //   flex: 1,
  //   //   renderCell: ({ row }) => {
  //   //     return (
  //   //       <React.Fragment>
  //   //         {row.type == 'private' ? <Chip label='Private' color="success" /> : <Chip label='Public' color="primary" />}
  //   //       </React.Fragment >
  //   //     )
  //   //   }
  //   // },
  //   {
  //     field: 'action',
  //     headerName: 'Action',
  //     flex: 1,
  //     renderCell: ({ row }) => {
  //       return (
  //         <React.Fragment>
  //           <IconButton onClick={() => handleDelete(row.id)}>
  //             <DeleteIcon />
  //           </IconButton>
  //           {/* <IconButton onClick={() => handleApprove(row.id)}>
  //             <CheckCircle />
  //           </IconButton> */}
  //           {/* <UserInfo id={row.id} /> */}
  //         </React.Fragment >
  //       )
  //     }

  //   },
  // ];
  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    { field: 'id_no', headerName: 'ID No', width: 150 },
    {
      field: 'firstname',
      headerName: 'First Name',
      flex: 1,
    },
    {
      field: 'middlename',
      headerName: 'Middle Name',
      flex: 1,
    },
    {
      field: 'lastname',
      headerName: 'Last Name',
      flex: 1,
    },
    {
      field: 'contact_no',
      headerName: 'Contact No',
      type: 'number',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   flex: 1,
    //   renderCell: ({ row }) => {
    //     return (
    //       <React.Fragment>
    //         {row.status == 1 ? <Chip label='Approved' color="success" /> : <Chip label='Pending' color="primary" />}
    //       </React.Fragment >
    //     )
    //   }
    // },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            <Tooltip title="File">
              <IconButton color="success" onClick={() => handleDownload()}>
                <FileOpenOutlinedIcon />
              </IconButton>
            </Tooltip>
            {row.status != 1 ? <React.Fragment>
              <Tooltip title="Approve">
                <IconButton color="primary" variant='success' onClick={() => handleApprove(row.id)}>
                  <CheckCircle />
                </IconButton>
              </Tooltip>
            </React.Fragment> : <React.Fragment />}
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>

          </React.Fragment >
        )
      }

    },
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