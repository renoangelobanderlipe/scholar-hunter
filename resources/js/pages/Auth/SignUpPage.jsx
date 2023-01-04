import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GenericTextField } from '../../components/GenericComponents/TextField/GenericTextField';
import { GenericButton } from '../../components/GenericComponents/Button/GenericButton';
import { Grid, Box, Typography } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { GenericTypography } from './../../components/GenericComponents/Typography/GenericTypography';
import { register } from './../../config/apisauce';
import useAuthStore from "../../config/store";
import { useSnackbar } from 'notistack';

const validationSchema = Yup.object().shape({
  // firstName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // lastName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // email: Yup.string().email('Invalid email').required('Required'),
});

const container = {
  display: 'flex'
}

const style = {
  mr: '1rem',
  padding: '0.5rem 0',
  textAlign: 'center',
};

const linkTypography = {
  fontWeight: 'bold',
  color: 'gray',
  fontSize: '12px'
}


const SignUpPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const registerFormik = useFormik({
    initialValues: {
      email: "",
      username: "",
      firstname: "",
      middlename: "",
      lastname: "",
      address: "",
      password: "",
      confirm_password: "",
    },

    validationSchema: validationSchema,

    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    enableReinitialize: true,

    onSubmit: (values) => handleOnSubmit(values),
  });

  const handleOnSubmit = async (values) => {

    const res = await register({
      firstname: values.firstname,
      middlename: values.middlename,
      lastname: values.lastname,
      address: values.address,
      username: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.password,
    });

    if (res.data.code == 200) {
      enqueueSnackbar('Success', { variant: 'success' })

      navigate('/home', { replace: true });

    }

  }

  const handleOnChange = (field, newValue) => {
    registerFormik.setFieldValue(field, newValue);
  };

  return (
    <React.Fragment>
      <Grid item margin={'20%'}  >
        <Box>
          <Grid item sx={style}>
            <Box sx={{
              mb: '1.5rem'
            }}>
              <Typography>Logo Here</Typography>
            </Box>
            <GenericTypography
              title={'Create an account'}
              variant={{
                variant: 'h5',
                color: 'black',
                fontWeight: 'bold',
                mb: '1rem'
              }}
            />
          </Grid>

        </Box>

        <form>
          <Box sx={container}>
            <Grid item sx={style}>
              <GenericTextField
                fieldName="firstname"
                fieldLabel="First Name"
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
                  placeholder: "First Name",
                }}
                formikErrors={{
                  error: registerFormik.errors?.purpose ? true : false,
                  helperText: registerFormik.errors?.purpose,
                }}
              />
            </Grid >

            <Grid item sx={style}>
              <GenericTextField
                fieldName="middlename"
                fieldLabel="Middle Name"
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
                  placeholder: "Middle Name",
                }}
                formikErrors={{
                  error: registerFormik.errors?.purpose ? true : false,
                  helperText: registerFormik.errors?.purpose,
                }}
              />
            </Grid >
          </Box>
          <Box sx={container}>
            <Grid item sx={style}>
              <GenericTextField
                fieldName="lastname"
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
                  placeholder: "Last Name",
                }}
                formikErrors={{
                  error: registerFormik.errors?.purpose ? true : false,
                  helperText: registerFormik.errors?.purpose,
                }}
              />
            </Grid >
            <Grid item sx={style}>
              <GenericTextField
                fieldName="username"
                fieldLabel="Username"
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
                  placeholder: "Username",
                }}
                formikErrors={{
                  error: registerFormik.errors?.purpose ? true : false,
                  helperText: registerFormik.errors?.purpose,
                }}
              />
            </Grid >
          </Box>


          <Grid item sx={style}>
            <GenericTextField
              fieldName="address"
              fieldLabel="Address"
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
                placeholder: "Address",
              }}
              formikErrors={{
                error: registerFormik.errors?.purpose ? true : false,
                helperText: registerFormik.errors?.purpose,
              }}
            />
          </Grid >

          <Grid item sx={style}>
            <GenericTextField
              fieldName="email"
              fieldLabel="Email"
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
              }}
              formikErrors={{
                error: registerFormik.errors?.purpose ? true : false,
                helperText: registerFormik.errors?.purpose,
              }}
            />
          </Grid >
          <Box display='flex'>
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
                }}
              // formikErrors={{
              //   error: registerFormik.errors?.purpose ? true : false,
              //   helperText: registerFormik.errors?.purpose,
              // }}
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
                }}
              // formikErrors={{
              //   error: registerFormik.errors?.purpose ? true : false,
              //   helperText: registerFormik.errors?.purpose,
              // }}
              />
            </Grid>
          </Box>


          <Grid item sx={style} mt={'2rem'} mb={'2rem'}>
            <GenericButton
              title={"Sign In"}
              variant={{
                fullWidth: true,
                variant: "contained",
                color: "primary",
              }}
              onClick={() => handleOnSubmit(registerFormik.values)}
            />
          </Grid>

          <Grid container sx={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Link to='/login'>
              <Typography sx={linkTypography}>
                ALREADY HAVE AN ACCOUNT?
              </Typography>
            </Link>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
  );
};


export default SignUpPage;