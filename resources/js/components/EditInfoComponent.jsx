import React from 'react';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { IconButton } from '@mui/material/IconButton';
import { CreateIcon } from '@mui/icons-material/Create';
import { DialogWrapper } from './GenericComponents/DialogBox/DialogWrapper';
import { GenericTextField } from './GenericComponents/TextField/GenericTextField';


export const EditInfoComponent = () => {
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
      <IconButton onClick={handleClickOpen}>
        <CreateIcon />
      </IconButton>
      <form >
        <DialogWrapper
          open={open}
          close={handleClose}>
          <DialogTitle>Create</DialogTitle>
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