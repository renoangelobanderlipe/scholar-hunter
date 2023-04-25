import React, { useState, useEffect } from 'react';
import { Grid, Chip, Dialog, DialogContent, Button, Autocomplete, TextField } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { allUsers, foundationList } from '../utils/apisauce';
import { HeaderComponent } from './../components/HeaderComponent';
import { TextFieldComponent } from '../components/TextFieldComponents/TextFieldComponent';
import { ButtonComponent } from './../components/ButtonComponent';
import { foundationType } from '../utils/helper';
import { AutoCompleteComponent } from './../components/AutoCompleteComponent';
import { createFoundation, foundationDestroy } from './../utils/apisauce';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { ContainerWrapper } from '../components/ContainerWrapper';


const CustomButton = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);

  const createFoundationFormik = useFormik({
    initialValues: {
      'name': "",
      'description': "",
      'address': "",
      'contact_no': "",
      'email': "",
      'type': "",
      'user': "",
    }
  })
  console.log('users', users);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (field, newValue) => {
    console.log('onchange val', field, newValue);
    createFoundationFormik.setFieldValue(field, newValue);
  }

  const handleCreateFoundation = async (values) => {

    const res = await createFoundation(values);

    if (res.ok) {
      enqueueSnackbar('Success', { variant: 'success' })
      handleClose();
    } else {
      enqueueSnackbar('Something Went Wrong, Please Try Again', { variant: 'info' })
    }
  }

  const handleFetchUsers = async () => {
    const res = await allUsers();

    if (res.data.code == 200) {
      setUsers(res.data.data.users);
    }

  }

  useEffect(() => {
    handleFetchUsers();
  }, [])

  return (
    <React.Fragment>
      <GridToolbarContainer>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add
        </Button>
        <form >
          <Dialog
            fullWidth open={open} onClose={handleClose}>
            <DialogContent>
              <form>
                <Grid >
                  <HeaderComponent
                    title={'Create Benefactor'}
                    variant={{
                      variant: 'h5',
                      color: 'black',
                      fontWeight: 'bold',
                      mb: '2.5rem'
                    }}
                  />

                  <Grid item p={'0.5rem 0'}>
                    <TextFieldComponent
                      fieldname={'email'}
                      fieldlabel={'Email'}
                      variant={{
                        fullWidth: true,
                        variant: "outlined",
                        size: "small",
                      }}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />
                  </Grid>
                  <Grid item p={'0.5rem 0'}>
                    <TextFieldComponent
                      fieldname={'name'}
                      fieldlabel={'Name'}
                      variant={{
                        fullWidth: true,
                        variant: "outlined",
                        size: "small",
                      }}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />
                  </Grid>
                  <Grid item p={'0.5rem 0'}>
                    <TextFieldComponent
                      fieldname={'description'}
                      fieldlabel={'Description'}
                      variant={{
                        fullWidth: true,
                        variant: "outlined",
                        size: "small",
                      }}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />
                  </Grid>
                  <Grid item p={'0.5rem 0'}>
                    <TextFieldComponent
                      fieldname={'address'}
                      fieldlabel={'Address'}
                      variant={{
                        fullWidth: true,
                        variant: "outlined",
                        size: "small",
                      }}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />
                  </Grid>
                  <Grid item p={'0.5rem 0'}>
                    <TextFieldComponent
                      fieldname={'contact_no'}
                      fieldlabel={'Contact No'}
                      variant={{
                        fullWidth: true,
                        variant: "outlined",
                        size: "small",
                      }}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />
                  </Grid>

                  <Grid item display={'flex'} p={'0.5rem 0'}>
                    <AutoCompleteComponent
                      fieldName={'type'}
                      fieldLabel={'Type'}
                      options={foundationType}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />
                  </Grid>

                  <Grid item p={'0.5rem 0'}>
                    <Autocomplete
                      disablePortal
                      getOptionLabel={(options) => `${options.firstname} ${options.lastname}`}
                      options={users ?? []}
                      size='small'
                      renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} label="Assign User" />}
                      onChange={(e, value) => handleOnChange('users', value)}
                    />
                  </Grid>

                  <ButtonComponent
                    disable={createFoundationFormik.values.password != createFoundationFormik.values.confirm_password ? false : true}
                    title={'Create Account'}
                    variant={{
                      variant: 'contained'
                    }}
                    onClick={() => handleCreateFoundation(createFoundationFormik.values)}
                  />
                </Grid>


              </form>
            </DialogContent>
          </Dialog>
        </form>
      </GridToolbarContainer>
    </React.Fragment>

  )
}

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
        <Grid item>
          <CustomButton />
        </Grid>


      </Grid>

    </GridToolbarContainer>
  );
}

const FoundationsPage = () => {
  const [rows, setRows] = React.useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleList = async () => {
    const res = await foundationList();
    console.log('test', res);
    if (res.data.code == 200) {
      setRows(res.data.data);
    }
  }

  const handleDelete = async (row) => {
    const res = await foundationDestroy({ id: row.id });

    if (res.data.code == '200') {
      setRows(prev => {
        return prev.filter(rows => rows.id !== row.id);
      });
      enqueueSnackbar(res.data.data.message, { variant: 'success' })

    } else {
      console.log(res.data.data);
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
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            <IconButton onClick={() => handleDelete(row)}>
              <DeleteIcon />
            </IconButton>
          </React.Fragment >
        )
      }

    },
  ];

  React.useEffect(() => {
    handleList();
  }, []);

  console.log('rows', rows.data);
  return (
    <React.Fragment>
      <ContainerWrapper>
        <DataGrid
          autoHeight
          pageSize={7}
          // rowsPerPageOptions={[10, 15, 50, 100]}
          rows={rows}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,

          }}
          componentsProps={{
            toolbar: CustomButton
          }}
        />
      </ContainerWrapper>
    </React.Fragment>
  );
}

export default FoundationsPage;