import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { Button, DialogTitle, DialogContent, Box, DialogActions } from '@mui/material';
import { DialogWrapper } from './GenericComponents/DialogBox/DialogWrapper';
import { GenericTextField } from './GenericComponents/TextField/GenericTextField';

const boxPadding = {
  p: '0.5rem 2rem',
};

export const CustomButton = () => {
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
      course: '',
      course_type: '',
      role: '',
      password: '',
      status: '',
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
    const res = await createUser({ values: values });

    if (res.data.code == 200) {
      setRows(prev => [...prev ?? []]);

      enqueueSnackbar('Success', { variant: 'success' })
      handleClose();
    }
  }

  return (
    <GridToolbarContainer>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create
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
                fieldName="id_no"
                fieldLabel="ID No"
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
                  placeholder: "181-1777-2",
                  type: "text",
                }}
              />
            </Box>
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="firstname"
                fieldLabel="Firstname"
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
                  placeholder: "Firstname",
                  type: "text",
                }}

              />
            </Box>
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="middlename"
                fieldLabel="Middlename"
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
                  placeholder: "Middlename",
                  type: "text",
                }}

              />
            </Box>
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="lastname"
                fieldLabel="Lastname"
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
                  placeholder: "Lastname",
                  type: "text",
                }}

              />
            </Box>
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="address"
                fieldLabel="Address"
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
                  placeholder: "Address",
                  type: "text",
                }}

              />
            </Box>
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="username"
                fieldLabel="Username"
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
                  placeholder: "Username",
                  type: "text",
                }}

              />
            </Box>
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="contact_no"
                fieldLabel="Contact No"
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
                  placeholder: "Contact No",
                  type: "text",
                }}

              />
            </Box>
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
                fieldName="course"
                fieldLabel="Course"
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
                  placeholder: "Course",
                  type: "text",
                }}

              />
            </Box>
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="course_type"
                fieldLabel="Course Type"
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
                  placeholder: "Course Type",
                  type: "text",
                }}

              />
            </Box>
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="role"
                fieldLabel="Role"
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
                  placeholder: "Role",
                  type: "text",
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
            <Box sx={boxPadding}>
              <GenericTextField
                fieldName="status"
                fieldLabel="Status"
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
                  placeholder: "Status",
                  type: "text",
                }}

              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleCreateUser(createUserFormik.values)}>Submit</Button>
          </DialogActions>
        </DialogWrapper>
      </form>
    </GridToolbarContainer>
  )
}
