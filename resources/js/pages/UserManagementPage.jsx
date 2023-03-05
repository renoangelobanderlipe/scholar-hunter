import React, { useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Button, DialogTitle, DialogContent, Dialog, Grid, DialogActions, IconButton, Chip, Typography, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import { approveUser, destroyUser, getUserList, roleListener, unauthorizeUser } from '../utils/apisauce';
import { CancelOutlined, CheckCircle } from '@mui/icons-material';
import useAuthStore from '../utils/store';
import { ButtonComponent } from './../components/ButtonComponent';
import { Link } from 'react-router-dom';
import { PasswordFieldComponent } from './../components/TextFieldComponents/PasswordFieldComponent';
import { AutoCompleteComponent } from './../components/AutoCompleteComponent';
import { TextFieldComponent } from './../components/TextFieldComponents/TextFieldComponent';
import { course } from '../utils/helper';
import { courseType, roles } from './../utils/helper';
import { HeaderComponent } from './../components/HeaderComponent';
import { createUser } from './../utils/apisauce';
import { ContainerWrapper } from './../components/ContainerWrapper';


const CustomButton = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const createUserFormik = useFormik({
    initialValues: {
      id_no: '',
      firstname: '',
      middlename: '',
      lastname: '',
      address: '',
      username: '',
      contact_no: '',
      email: '',
      course_type: '',
      course: '',
      role: '',
      password: '',
      confirm_password: ''
    },
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

  const handleOnSubmit = async (values) => {
    const res = await createUser({ values });

    if (res.data.code == 200) {
      enqueueSnackbar('Success', { variant: 'success' })
      handleClose();
    }
  }

  return (
    <React.Fragment>
      <GridToolbarContainer>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add User
        </Button>
        <form >
          <Dialog
            fullWidth open={open} onClose={handleClose}>
            <DialogContent>
              <form>
                <Grid >
                  <HeaderComponent
                    title={'Create an Account'}
                    variant={{
                      variant: 'h5',
                      color: 'black',
                      fontWeight: 'bold',
                      mb: '2.5rem'
                    }}
                  />

                  <Grid item container display={'flex'} spacing={2} pb={'1rem'}>
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                      <TextFieldComponent
                        fieldname={'id_no'}
                        fieldlabel={'ID No'}
                        variant={{
                          fullWidth: true,
                          variant: "outlined",
                          size: "small",
                        }}
                        handleOnChange={(field, value) => handleOnChange(field, value)}
                      />
                    </Grid>
                  </Grid>

                  <Grid item container display={'flex'} spacing={2} pb={'1rem'}>
                    <Grid item xs={6}>
                      <TextFieldComponent
                        fieldname={'firstname'}
                        fieldlabel={'Firstname'}
                        variant={{
                          fullWidth: true,
                          variant: "outlined",
                          size: "small",
                        }}
                        handleOnChange={(field, value) => handleOnChange(field, value)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextFieldComponent
                        fieldname={'middlename'}
                        fieldlabel={'Middlename'}
                        variant={{
                          fullWidth: true,
                          variant: "outlined",
                          size: "small",
                        }}
                        handleOnChange={(field, value) => handleOnChange(field, value)}
                      />
                    </Grid>
                  </Grid>

                  <Grid item container display={'flex'} spacing={2} pb={'1rem'}>
                    <Grid item xs={6}>
                      <TextFieldComponent
                        fieldname={'lastname'}
                        fieldlabel={'Lastname'}
                        variant={{
                          fullWidth: true,
                          variant: "outlined",
                          size: "small",
                        }}
                        handleOnChange={(field, value) => handleOnChange(field, value)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextFieldComponent
                        fieldname={'username'}
                        fieldlabel={'Username'}
                        variant={{
                          fullWidth: true,
                          variant: "outlined",
                          size: "small",
                        }}
                        handleOnChange={(field, value) => handleOnChange(field, value)}
                      />
                    </Grid>
                  </Grid>

                  <Grid item container display={'flex'} spacing={2} pb={'1rem'}>
                    <Grid item xs={6}>
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

                    <Grid item xs={6}>
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
                  </Grid>

                  <Grid item display={'flex'} p={'0.5rem 0'}>
                    <AutoCompleteComponent
                      fieldName={'course'}
                      fieldLabel={'Course'}
                      options={course}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />

                  </Grid>

                  <Grid item display={'flex'} p={'0.5rem 0'}>
                    <AutoCompleteComponent
                      fieldName={'course_type'}
                      fieldLabel={'Course Type'}
                      options={courseType}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />

                  </Grid>

                  <Grid item py={1} >
                    <PasswordFieldComponent
                      fieldname={'password'}
                      fieldlabel={'Password'}
                      variant={{
                        fullWidth: true,
                        variant: "outlined",
                        size: "small",
                      }}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />
                  </Grid>
                  <Grid item py={1} >
                    <PasswordFieldComponent
                      fieldname={'password_confirmation'}
                      fieldlabel={'Confirm Password'}
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
                      fieldName={'role'}
                      fieldLabel={'Role'}
                      options={roles}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />
                  </Grid>

                  <ButtonComponent
                    disable={createUserFormik.values.password != createUserFormik.values.confirm_password ? false : true}
                    title={'Create Account'}
                    variant={{
                      variant: 'contained'
                    }}
                    onClick={() => handleOnSubmit(createUserFormik.values)}
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

const UserManagementPage = () => {
  const [rows, setRows] = React.useState([]);
  // const { role } = useAuthStore();
  const [role, setRole] = React.useState('');
  const [status, setStatus] = React.useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleFetchUsers = async () => {
    const page = 1;

    const res = await getUserList({ page });

    if (res.data.code == 200) {
      setRows(res.data.data);
    }
  }

  const handleApprove = async (id) => {
    const res = await approveUser({ id });

    if (res.ok) {
      enqueueSnackbar(res.data.data.message, { variant: 'success' })
    }
  }

  const handleDelete = async (id) => {

    const res = await destroyUser({ id });

    if (res.data.code == 200) {
      setRows(prev => {
        return prev.filter(rows => rows.id !== id);
      });
      enqueueSnackbar(res.data.data.message, { variant: 'success' })
    } else {
      enqueueSnackbar('Something Wen\'t Wrong, Please Try Again!', { variant: 'info' });
    }
  }

  const fetchRole = async () => {
    const res = await roleListener();
    console.log('role Listner', res.data);
    if (res.data.code == 200) {
      setRole(res.data.data.role);
    }
  }

  const handleUnauthorize = async (id) => {
    const res = await unauthorizeUser({ id });

    // console.log(res.data.data);
    // if (res.ok) {
    //   setRows(prev => [
    //     ...prev.slice(0, 1),
    //     ...res.data.data
    //   ]);
    // }
  }

  React.useEffect(() => {
    fetchRole();
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
            {role == 'admin' ? <React.Fragment>
              <Tooltip title="Unauthorize">
                <IconButton color="error" onClick={() => handleUnauthorize(row.id)}>
                  <CancelOutlined />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton color="error" onClick={() => handleDelete(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              {row.status != 1 ? <React.Fragment>
                <Tooltip title="Approve">
                  <IconButton color="primary" variant='success' onClick={() => handleApprove(row.id)}>
                    <CheckCircle />
                  </IconButton>
                </Tooltip>
              </React.Fragment> : <React.Fragment />}
            </React.Fragment> : <React.Fragment />}
          </React.Fragment >
        )
      }

    },
  ];
  return (
    <React.Fragment>
      <ContainerWrapper>
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
      </ContainerWrapper>
    </React.Fragment>
  );
}

export default UserManagementPage;