import React from "react";

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { useSnackbar } from 'notistack';

import { Grid, Typography, Autocomplete } from '@mui/material';
import { GenericTextField } from '../../components/GenericComponents/TextField/GenericTextField';
import { GenericButton } from '../../components/GenericComponents/Button/GenericButton';
import { GenericTypography } from './../../components/GenericComponents/Typography/GenericTypography';

import { showProfile } from './../../config/apisauce';
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

const course = ['Information Technology', 'Arts and Science', 'Education'];
const degree = [''];

const SignUpPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const registerFormik = useFormik({
    initialValues: {
      id_no: '',
      firstname: '',
      middlename: '',
      lastname: '',
      address: '',
      username: '',
      email: '',
      course_type: '',
      course: '',
      degree: '',
      contact_no: '',
      account_type: 'student',
      password: '',
      confirm_password: ''
    },
  });

  const handleOnSubmit = async (values) => {
    const res = await showProfile();

    // const res = await register({
    //   firstname: values.firstname,
    //   middlename: values.middlename,
    //   lastname: values.lastname,
    //   address: values.address,
    //   username: values.username,
    //   email: values.email,
    //   course_type: course_type,
    //   degree: degree,
    //   account_type: account_type,
    //   contact_no: values.contact_no,
    //   password: values.password,
    //   password_confirmation: values.password,
    // });

    // if (res.data.code == 200) {
    //   enqueueSnackbar('Success', { variant: 'success' })

    //   navigate('/home', { replace: true });
    // }
  };

  function handleOnChange(field, newValue) {
    registerFormik.setFieldValue(field, newValue);
  };

  return (
    <React.Fragment>
      <Grid item>

        <Grid item container justifyContent={'center'}>
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

        <form>
          <Grid item container sx={container}>
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
            </Grid>

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
          </Grid >

          <Grid item container sx={container}>
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
          </Grid>


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
          <Grid item container >
            <Grid item container sx={style} fullWidth>
              <Autocomplete
                fullWidth
                disablePortal
                options={course}
                size='small'
                renderInput={(params) => <TextField {...params} label="Course" />}
              />
            </Grid >

            <Grid item container sx={style} fullWidth>
              <Autocomplete
                fullWidth
                disablePortal
                options={degree}
                size='small'
                renderInput={(params) => <TextField {...params} label="Degree" />}
              />
            </Grid >
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

          <Grid item container sx={style} mt={'1.5rem'} mb={'1rem'}>
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