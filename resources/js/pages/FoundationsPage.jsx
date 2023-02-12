import React, { useState } from 'react';
import { Grid, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { DeleteIcon } from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { scholarshipList } from '../utils/apisauce';


function CustomButton() {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const createUserFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (field, newValue) => {
    createUserFormik.setFieldValue(field, newValue);
  }

  const handleCreateUser = async (values) => {
    const res = await createUser({ email: values.email, password: values.password });

    enqueueSnackbar('Success', { variant: 'success' })
    handleClose();
  }

  return (
    <GridToolbarContainer>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add User
      </Button>
      <form >
        <Dialog
          fullWidth open={open} onClose={handleClose}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            By 
          </DialogContentText> */}

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleCreateUser()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </form>
    </GridToolbarContainer>
  )
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Grid container justifyContent='space-between' p='0.5rem'>

        <Grid item>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Grid>
        <Grid item>
          <CustomButton />
        </Grid>


      </Grid>

    </GridToolbarContainer>
  );
}

const FoundationsPage = () => {
  const [rows, setRows] = React.useState([]);

  const handleList = async () => {
    const res = await scholarshipList();

    if (res.data.code == 200) {
      setRows(res.data.data);
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
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
      type: 'number',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            {row.type === 'private' ? <Chip label='Private' color="success" /> : <Chip label='Public' color="primary" />}
          </React.Fragment >
        )
      }
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
              rows={rows}
              columns={columns}
              components={{
                Toolbar: CustomToolbar,

              }}
              componentsProps={{
                toolbar: CustomButton
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default FoundationsPage;