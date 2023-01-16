import React from "react";

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { useSnackbar } from 'notistack';

import { Grid, Box, Typography, Select, MenuItem, InputLabel, FormControl, Autocomplete } from '@mui/material';

import { GenericTextField } from '../../components/GenericComponents/TextField/GenericTextField';
import { GenericButton } from '../../components/GenericComponents/Button/GenericButton';
import { GenericTypography } from './../../components/GenericComponents/Typography/GenericTypography';

import { register, courseShow, degreeShow, accountTypeShow } from './../../config/apisauce';
import useAuthStore from "../../config/store";
import TextField from '@mui/material/TextField';

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

const courseArray = ['Information Technology', 'Arts and Science'];
const degreeArray = ['test1', 'test2'];
const accounTypeArr = ['Student', 'Foundation']

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
      course: [],
      degree: [],
      account_type: [],
      password: "",
      confirm_password: "",
    },
  });

  const handleOnSubmit = async (values) => {
    const [course] = values.course
    const [degree] = values.degree
    const [account_type] = values.account_type

    const res = await register({
      firstname: values.firstname,
      middlename: values.middlename,
      lastname: values.lastname,
      address: values.address,
      username: values.username,
      email: values.email,
      course: course,
      degree: degree,
      account_type: account_type,
      password: values.password,
      password_confirmation: values.password,
    });

    // if (res.data.code == 200) {
    //   enqueueSnackbar('Success', { variant: 'success' })

    //   navigate('/home', { replace: true });
    // }
  };

  function handleOnChange(field, newValue) {
    registerFormik.setFieldValue(field, newValue);
  };


  const handleFetchCourse = async () => {
    const res = await courseShow();
    const { option_value } = res.data?.data;

    if (res.data.code == 200) {
      registerFormik.setFieldValue('course', [option_value]);
    }
  }

  const handleFetchAccounType = async () => {
    const res = await accountTypeShow();

    const { option_value } = res.data?.data;

    if (res.data.code == 200) {
      registerFormik.setFieldValue('account_type', [option_value]);
    }
  }

  const handleFetchDegree = async () => {
    const res = await degreeShow();

    const { option_value } = res.data?.data;

    if (res.data.code == 200) {
      registerFormik.setFieldValue('degree', [option_value]);
    }
  }

  React.useEffect(() => {
    handleFetchCourse();
    handleFetchAccounType();
    handleFetchDegree();
  }, []);

  return (
    <React.Fragment>
      <Grid item   >
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
            />
          </Grid >
          <Box sx={container}>
            <Grid item sx={style} width='50%'>
              <Autocomplete
                disablePortal
                options={registerFormik.values.course ?? []}
                size='small'
                renderInput={(params) => <TextField {...params} label="Course" />}
              />
            </Grid >

            <Grid item sx={style} width='50%'>
              <Autocomplete
                disablePortal
                options={registerFormik.values.degree ?? []}
                size='small'
                renderInput={(params) => <TextField {...params} label="Degree" />}
              />
            </Grid >
          </Box>
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
                type: "password",
              }}
            />
          </Grid>

          <Grid item sx={style}>
            <Autocomplete
              disablePortal
              options={registerFormik.values.account_type ?? []}
              size='small'
              renderInput={(params) => <TextField {...params} label="Account Type" />}
            />
          </Grid>

          <Grid item sx={style} mt={'1.5rem'} mb={'1rem'}>
            <GenericButton
              disable={true}
              title={"Sign In"}
              variant={{
                fullWidth: true,
                variant: "contained",
                color: "primary",
              }}
              others={{
                disabled: registerFormik.values.password != registerFormik.values.confirm_password ? true : false || registerFormik.values.password &&
                  registerFormik.values.confirm_password != '' ? false : true
              }}
              onClick={() => handleOnSubmit(registerFormik.values)}
            />
          </Grid>

          <Grid container sx={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Link to='/'>
              <Typography sx={linkTypography}>
                ALREADY HAVE AN ACCOUNT?
              </Typography>
            </Link>
          </Grid>
        </form>
      </Grid>
    </React.Fragment >
  );
};


export default SignUpPage;