import React from "react";

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { useSnackbar } from 'notistack';

import { Grid, Box, Typography, Select, MenuItem, InputLabel, FormControl, Autocomplete } from '@mui/material';

import { GenericTextField } from '../../components/GenericComponents/TextField/GenericTextField';
import { GenericButton } from '../../components/GenericComponents/Button/GenericButton';
import { GenericTypography } from './../../components/GenericComponents/Typography/GenericTypography';

import { register } from './../../config/apisauce';
import useAuthStore from "../../config/store";

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
      course: "",
      degree: "",
      account_type: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleOnSubmit = async (values) => {
    const res = await register({
      firstname: values.firstname,
      middlename: values.middlename,
      lastname: values.lastname,
      address: values.address,
      username: values.username,
      email: values.email,
      course: values.course,
      degree: values.degree,
      type: values.type,
      password: values.password,
      password_confirmation: values.password,
    });

    if (res.data.code == 200) {
      enqueueSnackbar('Success', { variant: 'success' })

      navigate('/home', { replace: true });
    }
  }

  const handleOnChange = (field, newValue) => {
    console.log('field', field, 'value', newValue);
    registerFormik.setFieldValue(field, newValue);
  };

  return (
    <React.Fragment>
      <Grid item margin={'10%'}  >
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
          <Grid item sx={style}>
            <FormControl fullWidth mr='0.5rem'>
              <InputLabel>Course</InputLabel>
              <Select
                rows={'8'}
                size='small'
                fullWidth
                // sx={{ fullWidth }}
                value={registerFormik.values.course}
                label="Course"
                onChange={(event) => handleOnChange('course', event.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {courseArray.map((element, index) => <MenuItem key={index} value={element}>{element}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid >

          <Grid item sx={style}>
            <Autocomplete
              disablePortal
              options={top100Films}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
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
              />
            </Grid>
          </Box>

          <Grid item sx={style}>
            <FormControl fullWidth>
              <InputLabel>Account Type</InputLabel>
              <Select
                size='small'
                value={registerFormik.values.account_type}
                label="Course"
                onChange={(event) => handleOnChange('account_type', event.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {accounTypeArr.map((element, index) => <MenuItem key={index} value={element}>{element}</MenuItem>)}
              </Select>
            </FormControl>
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
            <Link to='/login'>
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