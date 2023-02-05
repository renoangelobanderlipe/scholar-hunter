import React, { useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Button, DialogTitle, DialogContent, Dialog, Grid, DialogActions, IconButton, Chip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUserList } from '../utils/apisauce';


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

const UserManagementPage = () => {
  const [rows, setRows] = React.useState([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleFetchUsers = async () => {
    const page = 1;
    
    const res = await getUserList({ page });
    
    if (res.data.code == 200) {
      setRows(res.data.data.data);
    }
  }

  console.log('teststtsts', rows);

  const handleApprove = async (id) => {
    const res = await approve({ id });

    if (res.data.data == 200) {
      enqueueSnackbar('Approved', { variant: 'success' })
    }
  }

  const handleDelete = async (id) => {
    const res = await deleteUser({ id: id });

    if (res.data.code == 200) {
      setRows(prev => {
        return prev.filter(rows => rows.id !== id);
      });
      enqueueSnackbar('Deleted', { variant: 'success' })
    } else {
      console.log(res.data.message);

      enqueueSnackbar('Please Try Again!', { variant: 'info' });
    }
  }


  React.useEffect(() => {
    handleFetchUsers();
  }, []);

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
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            {row.status == 1 ? <Chip label='Approved' color="success" /> : <Chip label='Pending' color="primary" />}
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
            <IconButton onClick={() => handleDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
            {/* <IconButton onClick={() => handleApprove(row.id)}>
              <CheckCircle />
            </IconButton> */}
            {/* <UserInfo id={row.id} /> */}
          </React.Fragment >
        )
      }

    },
  ];
  return (
    <React.Fragment>
      <Grid container p={'2rem'}>
        <DataGrid
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[5, 15, 50, 100]}
          rows={rows}
          columns={columns}
          components={{
            // NoRowsOverlay: CustomNoRowsOverlay,
            Toolbar: CustomToolbar,

          }}
          componentsProps={{
            toolbar: CustomButton
          }}
        />
      </Grid>
    </React.Fragment>
  );
}

export default UserManagementPage;