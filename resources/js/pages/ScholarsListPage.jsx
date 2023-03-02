import React, { useState } from 'react';
import { Grid, IconButton, Tooltip, Chip } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { downloadFile, scholarshipList, scholarsList, approveScholar, canceleScholar } from './../utils/apisauce';
import DeleteIcon from '@mui/icons-material/Delete';
import { Cancel, CheckCircle } from '@mui/icons-material';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleList = async () => {
    const res = await scholarsList();
    if (res.ok) {
      setRows(res.data.data);
    }
  }
  const handleDownload = async (id) => {
    const res = await downloadFile({ id });
    console.log(res);
    if (res.ok) {
      
      
      // const url = window.URL.createObjectURL(new Blob([res.data.data]));
      const link = document.createElement("a");
      link.href = res.data.data;
      link.setAttribute('download', 'FHE.pdf');
      document.body.appendChild(link);
      link.click();
    }
  }

  const handleApprove = async (id) => {
    const res = await approveScholar({ id });

    if (res.ok) {
      enqueueSnackbar(res.data.data, { variant: 'success' })
    } else {
      enqueueSnackbar(res.data.message, { variant: 'warning' })
    }
  }

  const handleCancel = async (id) => {
    const res = await canceleScholar({ id });

    if (res.ok) {
      enqueueSnackbar(res.data.data, { variant: 'success' })
    } else {
      enqueueSnackbar(res.data.message, { variant: 'warning' })
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    { field: 'id_no', headerName: 'ID No', width: 150 },
    {
      field: 'firstname',
      headerName: 'First Name',
      flex: 1,
    },
    // {
    //   field: 'middlename',
    //   headerName: 'Middle Name',
    //   flex: 1,
    // },
    {
      field: 'lastname',
      headerName: 'Last Name',
      flex: 0.5,
    },
    {
      field: 'contact_no',
      headerName: 'Contact No',
      type: 'number',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            {row.status == 'pending' ? <Chip label='Pending' color="success" /> : row.statuss == 'rejected' ? <Chip label='Rejected' color="success" /> : row.status == 'approved' ? <Chip label='Approved' color="success" /> : <></>}

          </React.Fragment >
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            <Tooltip title="File">
              <IconButton color="success" onClick={() => handleDownload(row.id)}>
                <FileOpenOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Approve">
              <IconButton color="primary" variant='success' onClick={() => handleApprove(row.user_id)}>
                <CheckCircle />
              </IconButton>
            </Tooltip>

            <Tooltip title="Cancel">
              <IconButton color="error" onClick={() => handleCancel(row.user_id)}>
                <Cancel />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(row.user_id)}>
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