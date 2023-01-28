import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { TextFieldComponent } from '../../components/TextFieldComponents/TextFieldComponent';
import { Grid } from '@mui/material';
import { ButtonComponent } from './../../components/ButtonComponent';
import { TextFieldPasswordComponent } from './../../components/TextFieldPasswordComponent';
import { HeaderComponent } from './../../components/HeaderComponent';
import { PasswordFieldComponent } from './../../components/TextFieldComponents/PasswordFieldComponent';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginPage = () => {

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true
  });

  const handleOnChange = (field, values) => {
    console.log('fieldname', field, 'values', values);
    loginFormik.setFieldValue(field, values);
  }

  const handleCreateAccount = async (values) => {
    console.log('values', values);
  }

  return (
    <React.Fragment>
      <Grid container
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', minWidth: '100vw' }}
      >
        <form>
          <Grid item width={'20vw'}>
            <HeaderComponent
              title={'Sign In'}
              variant={{
                variant: 'h5',
                color: 'black',
                fontWeight: 'bold',
                mb: '1rem'
              }}
            />
            <Grid item py={1} >
              <TextFieldComponent
                fieldname={'email'}
                fieldlabel={'Email'}
                variant={{
                  fullWidth: true,
                  row: '8',
                  variant: "outlined",
                  size: "small",
                }}
                handleOnChange={(field, value) => handleOnChange(field, value)}
              />
            </Grid>

            <Grid item py={1} >
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

            <ButtonComponent
              title={'Login'}
              onClick={() => handleCreateAccount(loginFormik.values)}
            />
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
  );
}

export default LoginPage;