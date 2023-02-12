import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { PasswordFieldComponent } from './../../components/TextFieldComponents/PasswordFieldComponent';
import { HeaderComponent } from './../../components/HeaderComponent';
import { ButtonComponent } from './../../components/ButtonComponent';
import { updatePassword } from './../../utils/apisauce';
import { useFormik } from 'formik';

const style = {
  mr: '1rem',
  padding: '0.5rem 0',
  textAlign: 'center',
};

export const PasswordInfo = () => {

  const passwordFormik = useFormik({
    initialValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    }
  })

  const handleOnChange = (field, values) => {
    passwordFormik.setFieldValue(field, values);
  }

  const handleUpdate = async (values) => {
    console.log('values', values);
    const res = await updatePassword(values);
  }

  return (
    <Grid sx={{ display: 'flex', width: '60vw' }}>
      <Grid container item >
        <Box sx={{ display: 'flex', alignItems: 'center', p: '3rem' }}>
          <Typography fontWeight={'bold'} color="#263238">
            Warning: Changing your password regularly is a crucial step in maintaining the security of your account. Please make sure to choose a strong and unique password for your account protection.
          </Typography>
        </Box>

      </Grid>
      <Grid container item >
        <form>
          <Grid item width={'30vw'} >
            <HeaderComponent
              padding={'1.5rem 0'}
              title={'Update Password'}
              variant={{
                padding: '1.5rem 0',
                variant: 'h5',
                color: 'black',
                fontWeight: 'bold',
                mb: '1rem'
              }}
            />
            <Grid item py="0.5rem">
              <PasswordFieldComponent
                fieldname={'current_password'}
                fieldlabel={'CurrentPassword'}
                variant={{
                  fullWidth: true,
                  variant: "outlined",
                  size: "small",
                }}
                handleOnChange={(field, value) => handleOnChange(field, value)}
              />
            </Grid>
            <Grid item py="0.5rem">
              <PasswordFieldComponent
                fieldname={'password'}
                fieldlabel={'Update Password'}
                variant={{
                  fullWidth: true,
                  variant: "outlined",
                  size: "small",
                }}
                handleOnChange={(field, value) => handleOnChange(field, value)}
              />
            </Grid>

            <Grid item py="0.5rem">
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

            <ButtonComponent
              // disable={signUpFormik.values.password != signUpFormik.values.confirm_password ? false : true}
              title={'Update Password'}
              variant={{
                padding: '1.5rem 0',
                variant: 'contained'
              }}
              onClick={() => handleUpdate(passwordFormik.values)}
            />
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}