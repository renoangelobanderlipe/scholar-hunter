import React from 'react';
import { useFormik } from 'formik';
import { Box, Grid, FormControl, InputLabel, Select, Typography, Autocomplete } from '@mui/material';
import { GenericTextField } from '../GenericComponents/TextField/GenericTextField';
import { GenericButton } from '../GenericComponents/Button/GenericButton';
import { GenericTypography } from '../GenericComponents/Typography/GenericTypography';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { profileUpdate, showProfile } from '../../config/apisauce';
import TextField from '@mui/material/TextField';
import { degreeShow, courseShow } from './../../config/apisauce';

const container = {
  display: 'flex',
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

export const ProfileInformation = () => {
  const profileFormik = useFormik({
    initialValues: {
      email: "",
      username: "",
      firstname: "",
      middlename: "",
      lastname: "",
      address: "",
      course: [],
      degree: [],
    },
  });


  const handleOnChange = (field, newValue) => {
    profileFormik.setFieldValue(field, newValue);
  }

  const handleOnSubmit = (values) => {
    const res = profileUpdate({
      firstname: values.firstname,
      middlename: values.middlename,
      lastname: values.lastname,
      address: values.address,
      username: values.username,
      email: values.email,
      course: values.course,
      degree: values.degree,
    });
  }

  const fetchUserInfo = async () => {
    const res = await showProfile();

    console.log(res);
  }

  const handleFetchCourse = async () => {
    const res = await courseShow();
    const { option_value } = res.data?.data;

    if (res.data.code == 200) {
      profileFormik.setFieldValue('course', [option_value]);
    }
  }
  const handleFetchDegree = async () => {
    const res = await degreeShow();

    const { option_value } = res.data?.data;

    if (res.data.code == 200) {
      profileFormik.setFieldValue('degree', [option_value]);
    }
  }

  React.useEffect(() => {
    fetchUserInfo();
    handleFetchCourse();
    handleFetchDegree();
  }, []);

  return (
    <React.Fragment>
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
        <Grid item sx={style} fullWidth>
          <Autocomplete
            disablePortal
            options={profileFormik.values.course ?? []}
            size='small'
            renderInput={(params) => <TextField {...params} label="Course" />}
          />
        </Grid >

        <Grid item sx={style} fullWidth>
          <Autocomplete
            disablePortal
            options={profileFormik.values.degree ?? []}
            size='small'
            renderInput={(params) => <TextField {...params} label="Degree" />}
          />
        </Grid >

        <Grid item sx={style} mt={'1.5rem'} mb={'1rem'}>
          <GenericButton
            disable={true}
            title={"Update Profile"}
            variant={{
              fullWidth: true,
              variant: "contained",
              color: "primary",
            }}
            onClick={() => handleOnSubmit(profileFormik.values)}
          />
        </Grid>
      </form>
    </React.Fragment>
  );
}