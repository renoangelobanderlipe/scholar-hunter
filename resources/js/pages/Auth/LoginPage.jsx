import { useFormik, } from 'formik';
import React, { useState, useEffect, Fragment } from 'react';
import * as yup from 'yup';
import { TextFieldComponent } from '../../components/TextFieldComponents/TextFieldComponent';
import { Grid } from '@mui/material';
import { ButtonComponent } from './../../components/ButtonComponent';
import { HeaderComponent } from './../../components/HeaderComponent';
import { PasswordFieldComponent } from './../../components/TextFieldComponents/PasswordFieldComponent';
import { login, sanctum, roleListener, authListener } from './../../utils/apisauce';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import useAuthStore from './../../utils/store';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

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

  const handleLogin = async ({ ...values }) => {
    sanctum();
    const res = await login(values);
    checkStatus(values);
    if (res.ok) {
      if (res.data.data.status == 'pending') {
        navigate('/unauthorize', { replace: true });
      } else if (res.data.data.status == 'active') {
        setRole(res.data.data.role);
        // setStatus(res.data.data.status);
        setLoggedIn(true);
        res.data.data.role != 'user' ? navigate('/home', { replace: true }) : navigate('/listing', { replace: true });
      } else {
        console.log('Something Went wrong', res);
        enqueueSnackbar('Something Went wrong', { variant: 'warning' })
      }
      console.log(res.data);
    } else {
      enqueueSnackbar(res.data?.message?.message, { variant: 'warning' })
    }
  }

  const checkStatus = async (values) => {
    const res = await authListener(values.email);
    if (res.ok) {
      const resStatus = res.data.data.status == 0 ? false : true;
      setStatus(resStatus);
      localStorage.setItem('status', resStatus);
    }
  }

  const clearStorage = () => {
    localStorage.removeItem('status');
  }

  useEffect(() => {
    clearStorage();
  }, []);


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

            {/* <Grid item py={1} >
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
            </Grid> */}

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
              mt: '1rem',
              mb: '1rem',
              justifyContent: 'end',
              alignItems: 'end'
            }}>
              <Link to='/register'>
                <Typography sx={{
                  fontWeight: 'bold',
                  color: 'gray',
                  fontSize: '12px'
                }} >
                  Create an account?
                </Typography>
              </Link>
            </Grid>
            <ButtonComponent
              title={'Submit'}
              variant={{
                variant: 'contained'
              }}
              onClick={() => handleLogin(loginFormik.values)}
            />
          </Grid>


        </form>
      </Grid>
    </React.Fragment>
  );
}

export default LoginPage;