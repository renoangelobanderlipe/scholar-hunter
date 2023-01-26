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

const container = {
  display: 'flex',
}

const style = {
  mr: '1rem',
  padding: '0.5rem 0',
  textAlign: 'center',
};


export const ProfileInformation = () => {
  const [user, setUser] = React.useState([]);

  const profileFormik = useFormik({
    initialValues: {
      username: "",
      address: "",
      course_type: '',
      course: '',
      degree: '',
      contact_no: '',
    },
  });


  const handleOnChange = (field, newValue) => {
    profileFormik.setFieldValue(field, newValue);
  }

  const handleOnSubmit = async (values) => {
    const res = await profileUpdate({
      username: values.username,
      address: values.address,
      course_type: values.course_type,
      course: values.course,
      degree: values.degree,
      contact_no: values.contact_no,
    });

  }

  const fetchUserInfo = async () => {
    const res = await showProfile();

    if (res.data.code == 200) {
      setUser(res.data.data);
    }

  }

  React.useEffect(() => {
    fetchUserInfo();
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
                disabled: true,
                rows: 8,
                variant: "outlined",
                fullWidth: true,
                size: "small",
              }}
              fieldOptions={{
                placeholder: user.firstname,
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
                disabled: true,
                rows: 8,
                variant: "outlined",
                fullWidth: true,
                size: "small",
              }}
              fieldOptions={{
                placeholder: user.middlename,
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
                disabled: true,
                rows: 8,
                variant: "outlined",
                fullWidth: true,
                size: "small",
              }}
              fieldOptions={{
                placeholder: user.lastname,
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
                placeholder: user.username,
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
              placeholder: user.address,
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
              disabled: true,
              rows: 8,
              variant: "outlined",
              fullWidth: true,
              size: "small",
            }}
            fieldOptions={{
              placeholder: user.email,
            }}
          />
        </Grid >

        <Grid item sx={style}>
          <GenericTextField
            fieldName="course_type"
            fieldLabel="Course Type"
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
              placeholder: user.course_type,
            }}
          />
        </Grid >

        <Grid item sx={style}>
          <GenericTextField
            fieldName="course"
            fieldLabel="Course"
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
              placeholder: user.course,
            }}
          />
        </Grid >

        <Grid item sx={style}>
          <GenericTextField
            fieldName="contact_no"
            fieldLabel="Contact No"
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
              placeholder: user.contact_no,
            }}
          />
        </Grid >

        <Grid container item sx={style} mt={'1rem'} mb={'1rem'}>
          <GenericButton
            disable={true}
            title={"Update"}
            variant={{
              fullWidth: true,
              variant: "contained",
            }}
            onClick={() => handleOnSubmit(profileFormik.values)}
          />

        </Grid >


      </form>
    </React.Fragment>
  );
}