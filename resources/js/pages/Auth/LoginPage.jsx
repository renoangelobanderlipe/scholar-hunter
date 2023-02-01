import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { TextFieldComponent } from '../../components/TextFieldComponents/TextFieldComponent';
import { Grid } from '@mui/material';
import { ButtonComponent } from './../../components/ButtonComponent';
import { HeaderComponent } from './../../components/HeaderComponent';
import { PasswordFieldComponent } from './../../components/TextFieldComponents/PasswordFieldComponent';
import { login, sanctum } from './../../utils/apisauce';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import useAuthStore from './../../utils/store';

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
  const { setRole, setLoggedIn } = useAuthStore();
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true
  });

  const handleOnChange = (field, values) => {
    loginFormik.setFieldValue(field, values);
  }

  const handleCreateAccount = async ({ ...values }) => {
    sanctum();
    const res = await login(values);

    if (res.status == 200) {
      setRole(res.data.data);
      setLoggedIn(true);
    }


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
              title={'Login'}
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

            <Grid container sx={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Link to='/register'>
                <Typography sx={{
                  fontWeight: 'bold',
                  color: 'gray',
                  fontSize: '12px'
                }} >
                  ALREADY HAVE AN ACCOUNT?
                </Typography>
              </Link>
            </Grid>
            <ButtonComponent
              title={'Submit'}
              onClick={() => handleCreateAccount(loginFormik.values)}
            />
          </Grid>


        </form>
      </Grid>
    </React.Fragment>
  );
}

export default LoginPage;