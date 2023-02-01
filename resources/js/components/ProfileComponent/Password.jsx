import React from 'react';
import { GenericTextField } from './../GenericComponents/TextField/GenericTextField';
import { Grid, Box } from '@mui/material';
import { GenericButton } from './../GenericComponents/Button/GenericButton';
import { useFormik } from 'formik';
import { updatePassword } from '../../config/apisauce';

const style = {
  mr: '1rem',
  padding: '0.5rem 0',
  textAlign: 'center',
};

export const Password = () => {

  const passwordFormik = useFormik({
    initialValues: {
      current_password: '',
      password: '',
      confirm_password: "",
    }
  })

  const handleOnChange = (field, newValue) => {
    console.log('field', field, 'value', newValue);
    passwordFormik.setFieldValue(field, newValue)
  }

  const handleOnSubmit = (values) => {
    const res = updatePassword({
      password: values.password,
      confirm_password: values.confirm_password,
    });
  }

  return (
    <React.Fragment>
      <Box width="550px">
        <Grid item sx={style}>
          <GenericTextField
            fieldName="current_password"
            fieldLabel="Current Password"
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
              placeholder: "Current Password",
              type: 'password'
            }}
          />
        </Grid>
        <Grid item sx={style}>
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
              type: 'password'
            }}
          />
        </Grid>

        <Grid item sx={style}>
          <GenericTextField
            fieldName="confirm_password"
            fieldLabel="Confirm Password"
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
              placeholder: "Confirm Password",
              type: 'password'
            }}
          />
        </Grid>
      </Box>
      <Grid item sx={style} mt={'1.5rem'} mb={'1rem'}>
        <GenericButton
          title={"Update Password"}
          variant={{
            fullWidth: true,
            variant: "contained",
            color: "primary",
          }}
          others={{
            disabled: passwordFormik.values.password != passwordFormik.values.confirm_password ? true : false || passwordFormik.values.password &&
              passwordFormik.values.confirm_password != '' ? false : true
          }}
          onClick={() => handleOnSubmit(passwordFormik.values)}
        />
      </Grid>
    </React.Fragment >
  )
}