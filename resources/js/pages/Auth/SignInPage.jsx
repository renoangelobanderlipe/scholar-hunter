import React from "react";
import { useFormik } from "formik";
import { GenericTextField } from "../../components/GenericComponents/TextField/GenericTextField";
import { GenericButton } from "../../components/GenericComponents/Button/GenericButton";
import { login } from './../../config/apisauce';
import * as Yup from "yup";
import { Grid, Box, Typography } from '@mui/material';
import { GenericTypography } from './../../components/GenericComponents/Typography/GenericTypography';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useAuthStore from './../../config/store';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at min of 6 characters').required('Required'),
});

const style = {
  padding: '0.5rem 0',
  textAlign: 'center',
};


const headingVariant = {
  variant: 'h4',
  color: 'orange',
  mb: '1rem'

}
const subHeadingVariant = {
  size: 'small',
  color: 'orange',
  mb: '2rem'
}

const test = {
  justifyContent: 'center',
  alignItems: 'center'
}

const SignInPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setLoggedIn } = useAuthStore();

  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // onSubmit: (values) => handleOnSubmit(values),
  });

  const handleOnSubmit = async (values) => {
    await axios.get('sanctum/csrf-cookie');

    const res = await login({ email: values.email, password: values.password });

    if (res.status == 200) {
      enqueueSnackbar('Success', { variant: 'success' })

      // SET LOGGED IN STATUS TO TRUE USING ZUSTAND! 
      setLoggedIn(true);

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
      <Grid item margin={'20%'} padding={'2rem'} >
        <Box>
          <Grid item sx={style}>
            <GenericTypography
              title={'Hello Again!'}
              variant={headingVariant}
            />
          </Grid>
          <Grid item sx={style}>
            <GenericTypography
              title={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
              variant={subHeadingVariant}
            />
          </Grid>
        </Box>

        <form>
          <Grid item sx={style}>
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
                error: signInFormik.errors?.purpose ? true : false,
                helperText: signInFormik.errors?.purpose,
              }}
            />
          </Grid >

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
                type: "password",
              }}
              formikErrors={{
                error: signInFormik.errors?.purpose ? true : false,
                helperText: signInFormik.errors?.purpose,
              }}
            />
          </Grid>

          <Grid item sx={style} mt={'2rem'} mb={'2rem'}>
            <GenericButton
              title={"Sign In"}
              variant={{
                fullWidth: true,
                variant: "contained",
                color: "primary",
              }}
              onClick={() => handleOnSubmit(signInFormik.values)}
            />
          </Grid>

          <Grid container sx={test}>
            <GenericTypography
              variant={{
              }}
              title={'Don\'t have account yet?'}
            />
            <Grid>
              <Link to='/register'>Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
  );
};

export default SignInPage;