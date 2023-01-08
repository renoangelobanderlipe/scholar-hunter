import React, { useState } from 'react';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Grid, Box, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@mui/material';
import { GenericButton } from './../components/GenericComponents/Button/GenericButton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { createUser } from '../config/apisauce';
import { useFormik } from 'formik';
import { GenericTextField } from './../components/GenericComponents/TextField/GenericTextField';
import { useSnackbar } from 'notistack';
import { DialogWrapper } from './../components/GenericComponents/DialogBox/DialogWrapper';

const boxPadding = {
  p: '0.5rem 2rem',
};
const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}


const CustomButton = () => {
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
        <DialogWrapper
          open={open}
          close={handleClose}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            By 
          </DialogContentText> */}
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="email"
                fieldLabel="Email"
                handleOnChangeValue={(field, newValue) =>
                  handleOnChange(field, newValue)
                }
                variant={{
                  rows: 8,
                  fullWidth: true,
                  variant: "outlined",
                  size: "small",
                }}
                fieldOptions={{
                  placeholder: "Email",
                  type: "email",
                }}
              />
            </Box>
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="password"
                fieldLabel="Password"
                handleOnChangeValue={(field, newValue) =>
                  handleOnChange(field, newValue)
                }
                variant={{
                  rows: 8,
                  fullWidth: true,
                  variant: "outlined",
                  size: "small",
                }}
                fieldOptions={{
                  placeholder: "Password",
                  type: "password",
                }}

              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleCreateUser()}>Submit</Button>
          </DialogActions>
        </DialogWrapper>
      </form>
    </GridToolbarContainer>
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

  const rows = [
    // {
    //   id: 1,
    //   name: 'Firstname',
    //   stars: 28000,
    // },
    // {
    //   id: 2,
    //   name: 'Middlename',
    //   stars: 15000,
    // },
    // {
    //   id: 3,
    //   name: 'Lastname',
    //   stars: 28000,
    // },
    // {
    //   id: 4,
    //   name: 'Address',
    //   stars: 15000,
    // },
    // {
    //   id: 5,
    //   name: 'Contact Number',
    //   stars: 15000,
    // },
    // {
    //   id: 6,
    //   name: 'Email',
    //   stars: 15000,
    // },
    // {
    //   id: 7,
    //   name: 'Action',
    //   stars: 15000,
    // },
  ];

  const columns = [
    { field: 'Firstname', width: 200 },
    { field: 'Middlename', width: 200 },
    { field: 'Lastname', width: 200 },
    { field: 'Address', width: 220 },
    { field: 'Contact Number', width: 200 },
    { field: 'Email', width: 220 },
    { field: 'Action', width: 200 },
  ];


  return (
    <div style={{ height: 600, width: '90vw' }}>
      <DataGrid
        pageSize={10}
        rowsPerPageOptions={[5, 15, 50, 100]}
        rows={rows}
        columns={columns}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          Toolbar: CustomToolbar,

        }}
        componentsProps={{
          toolbar: CustomButton
        }}
      />
    </div>
  );
}

export default UserManagementPage;