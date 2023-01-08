import React from 'react';
import { useFormik } from 'formik';
import { Box, Grid, FormControl, InputLabel, Select, Typography } from '@mui/material';
import { GenericTextField } from '../GenericComponents/TextField/GenericTextField';
import { GenericButton } from '../GenericComponents/Button/GenericButton';
import { GenericTypography } from '../GenericComponents/Typography/GenericTypography';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { profileUpdate, showProfile } from '../../config/apisauce';

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
      course: "",
      degree: "",
      account_type: "",
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
      type: values.type,
    });
  }

  const fetchUserInfo = async() => {
    const res = await showProfile();

    console.log(res);
  }

  React.useEffect(() => {
    fetchUserInfo();

  }, [])
  
    
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
        <Grid item sx={style}>
          <FormControl fullWidth mr='0.5rem'>
            <InputLabel>Course</InputLabel>
            <Select
              rows={'8'}
              size='small'
              fullWidth
              // sx={{ fullWidth }}
              labelId="demo-select-small"
              id="demo-select-small"
              value={profileFormik.values.course}
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
          <FormControl fullWidth>
            <InputLabel>Degree</InputLabel>
            <Select
              size='small'
              labelId="demo-select-small"
              id="demo-select-small"
              value={profileFormik.values.degree}
              label="Course"
              onChange={(event) => handleOnChange('degree', event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {degreeArray.map((element, index) => <MenuItem key={index} value={element}>{element}</MenuItem>)}

            </Select>
          </FormControl>
        </Grid >

        <Grid item sx={style}>
          <FormControl fullWidth>
            <InputLabel>Account Type</InputLabel>
            <Select
              size='small'
              labelId="demo-select-small"
              id="demo-select-small"
              value={profileFormik.values.account_type}
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