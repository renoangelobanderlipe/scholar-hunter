import React, { useState, useEffect, Fragment } from 'react';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, DataGrid } from '@mui/x-data-grid';
import { Grid, Chip } from '@mui/material';
import { appliedScholarship } from './../utils/apisauce';
import { ContainerWrapper } from '../components/ContainerWrapper';


const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <Grid container justifyContent='space-between' p='0.5rem'>

        <Grid item>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Grid>
      </Grid>

    </GridToolbarContainer>
  );
}

const ApplicationPage = () => {
  const [rows, setRows] = useState([]);

  const handleApplication = async () => {
    const res = await appliedScholarship();

    if (res.ok) {
      console.log('res', res.data.data);
      setRows(res.data.data);
    }
  }


  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    {
      field: 'foundation',
      headerName: 'Foundation',
      flex: 1,
    },
    {
      field: 'scholarship',
      headerName: 'Scholarship',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            {/* {row.status == 1 ? <Chip label='Approved' color="success" /> : <Chip label='Pending' color="primary" />} */}
            {row.status == 'rejected' ? <Chip label='Rejected' color="error" /> : row.status == 'approved' ? <Chip label='Approved' color="success" /> : row.status == 'pending' ? <Chip label='Pending' color="success" /> : <></>}
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
    //         {role == 'admin' ? <React.Fragment>
    //           <Tooltip title="Delete">
    //             <IconButton color="error" onClick={() => handleDelete(row.id)}>
    //               <DeleteIcon />
    //             </IconButton>
    //           </Tooltip>

    //           {row.status != 1 ? <React.Fragment>
    //             <Tooltip title="Approve">
    //               <IconButton color="primary" variant='success' onClick={() => handleApprove(row.id)}>
    //                 <CheckCircle />
    //               </IconButton>
    //             </Tooltip>
    //           </React.Fragment> : <React.Fragment />}
    //         </React.Fragment> : <React.Fragment />}
    //       </React.Fragment >
    //     )
    //   }

    // },
  ];

  useEffect(() => {
    handleApplication();
  }, []);

  return (
    <Fragment>
      <ContainerWrapper>
        <DataGrid
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[5, 15, 50, 100]}
          rows={rows ?? []}
          columns={columns}
          components={{
            // NoRowsOverlay: CustomNoRowsOverlay,
            Toolbar: CustomToolbar,

          }}
        />
      </ContainerWrapper>
    </Fragment>
  );
}

export default ApplicationPage;