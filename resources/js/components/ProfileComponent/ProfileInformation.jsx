import React from 'react';
import { useFormik } from 'formik';
import { Box, Grid } from '@mui/material';
import { GenericTextField } from '../GenericComponents/TextField/GenericTextField';
import { GenericButton } from '../GenericComponents/Button/GenericButton';
import { GenericTypography } from '../GenericComponents/Typography/GenericTypography';

const style = {
  padding: '0.5rem 0',
  textAlign: 'center',
};


const headingVariant = {
  variant: 'h4',
  color: 'black',
  mb: '1rem'

}
const subHeadingVariant = {
  size: 'small',
  color: 'black',
  mb: '2rem'

}

const test = {
  // backgroundColor : 'orange',
  justifyContent: 'center',
  alignItems: 'center'
}
const boxDesign = {
  display: 'flex'
}

export const ProfileInformation = () => {
  const profileFormik = useFormik({
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

    // validationSchema: validationSchema,

    validateOnChange: true,
    validateOnMount: true,
    enableReinitialize: true,

  });


  return (
    <React.Fragment>
      <Box>
        <Grid item sx={style}>
          <GenericTypography
            title={'Profile Information!'}
            variant={headingVariant}
          />
        </Grid>
        <Grid item sx={style}>
          <GenericTypography
            title={'LoremLoremLoremLoremLoremLoremLoremLoremLoremLorem'}
            variant={subHeadingVariant}
          />
        </Grid>
      </Box>
      <form>
        <Box sx={boxDesign}>


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
                error: profileFormik.errors?.purpose ? true : false,
                helperText: profileFormik.errors?.purpose,
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
                error: profileFormik.errors?.purpose ? true : false,
                helperText: profileFormik.errors?.purpose,
              }}
            />
          </Grid >
        </Box>

        <Box sx={boxDesign}>
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
                error: profileFormik.errors?.purpose ? true : false,
                helperText: profileFormik.errors?.purpose,
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
                error: profileFormik.errors?.purpose ? true : false,
                helperText: profileFormik.errors?.purpose,
              }}
            />
          </Grid >
        </Box>

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
              error: profileFormik.errors?.purpose ? true : false,
              helperText: profileFormik.errors?.purpose,
            }}
          />
        </Grid >

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
              error: profileFormik.errors?.purpose ? true : false,
              helperText: profileFormik.errors?.purpose,
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
            //   error: profileFormik.errors?.purpose ? true : false,
            //   helperText: profileFormik.errors?.purpose,
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
            //   error: profileFormik.errors?.purpose ? true : false,
            //   helperText: profileFormik.errors?.purpose,
            // }}
            />
          </Grid>
        </Box>


        <Grid item sx={style} mt={'2rem'} mb={'2rem'}>
          <GenericButton
            title={"Update"}
            variant={{
              fullWidth: true,
              variant: "contained",
              color: "primary",
            }}
          // onClick={() => handleOnSubmit(profileFormik.values)}
          />
        </Grid>
      </form>
    </React.Fragment>
  );
}