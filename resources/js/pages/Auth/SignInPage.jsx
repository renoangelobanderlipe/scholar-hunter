import React from "react";
import { useFormik } from "formik";
import { GenericTextField } from "../../components/GenericComponents/TextField/GenericTextField";
import { GenericButton } from "../../components/GenericComponents/Button/GenericButton";
import { login, sanctum } from './../../config/apisauce';
import { Grid, Typography } from '@mui/material';
import { GenericTypography } from './../../components/GenericComponents/Typography/GenericTypography';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useAuthStore from './../../config/store';
import * as yup from 'yup';

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

const container = {
  padding: '0.5rem 0',
  textAlign: 'center',
};

const linkTypography = {
  fontWeight: 'bold',
  color: 'gray',
  fontSize: '12px'
}

const SignInPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setLoggedIn, setRole } = useAuthStore();


  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true
  });

  const handleOnSubmit = async (values) => {
    sanctum();
    const res = await login({
      email: values.email,
      password: values.password
    })
    if (res.status == 200) {
      enqueueSnackbar('Success', { variant: 'success' })

      // SET LOGGED IN STATUS TO TRUE USING ZUSTAND! 
      setLoggedIn(true);
      setRole('user');
      // console.log('login status : ', true);
      navigate('/home', { replace: true });

    } else {
      enqueueSnackbar(res.data.message, { variant: 'error' })
    }

  };

  const handleOnChange = (field, newValue) => {
    signInFormik.setFieldValue(field, newValue);
  };

  return (
    <React.Fragment>
      <Grid item margin={'10%'} padding={'2rem'} >
        <Grid item container justifyContent={'center'} sx={container}>
          <GenericTypography
            title={'Sign In'}
            variant={{
              variant: 'h5',
              color: 'black',
              fontWeight: 'bold',
              mb: '1rem'
            }}
          />
        </Grid>

        <form>
          <Grid item sx={container}>
            <GenericTextField
              fieldName="email"
              fieldLabel="Last Name"
              handleOnChangeValue={(field, newValue) =>
                handleOnChange(field, newValue)
              }
              variant={{
                rows: 8,
                variant: "outlined",
                fullWidth: true,
                size: "small",
              }}
              fieldOptions={{
                placeholder: "Email",
                type: "email",
              }}
              formikErrors={{
                error: signInFormik.errors.email,
                helperText: signInFormik.errors.email,
              }}
            />
          </Grid >

          <Grid item sx={container}>
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
              formikErrors={{
                error: signInFormik.errors.password,
                helperText: signInFormik.errors.password,
              }}
            />
          </Grid>

          <Grid item sx={container} mt={'1rem'} mb={'2rem'}>
            <GenericButton
              title={"Login"}
              variant={{
                fullWidth: true,
                variant: "contained",
                color: "primary",
              }}
              onClick={() => handleOnSubmit(signInFormik.values)}
            />
          </Grid>

          <Grid container>
            <Link to='/register'>
              <Typography sx={linkTypography}>
                DONT HAVE A SCHOLAR ACCOUNT YET?
              </Typography>
            </Link>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
  );
};

export default SignInPage;