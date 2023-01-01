import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GenericTextField } from '../../components/GenericComponents/TextField/GenericTextField';
import { GenericButton } from '../../components/GenericComponents/Button/GenericButton';
import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { GenericTypography } from './../../components/GenericComponents/Typography/GenericTypography';
import { register } from './../../config/apisauce';

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
  // backgroundColor : 'orange',
  justifyContent: 'center',
  alignItems: 'center'
}

const boxDesign = {
  display: 'flex'
}

const SignUpPage = () => {
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
    console.log('test', values
    );

    // const res = await register({});

    /**
     *
     * Sample response from backend 
    data = [
      data : [
        '...' : '...'
      ],
      message : 'Success SHIT',
      code : 200
    ]
     */

    if (result.data.code != 200) {
      // THROW EXCEPTION SHIT
    }
    // REDIRECT WITH SUCCESS MESSAGE

  };

  const handleOnChange = (field, newValue) => {
    signUpFormik.setFieldValue(field, newValue);
  };

  return (
    <React.Fragment>
      <Grid item margin={'20%'}  >
        <Box>
          <Grid item sx={style}>
            <GenericTypography
              title={'Hello Again!'}
              variant={headingVariant}
            />
          </Grid>
          <Grid item sx={style}>
            <GenericTypography
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

          <Grid container sx={test}>
            <Link to='/login'>
              <GenericTypography
                variant={{
                }}
                title={'Already have an account?'}
              />
            </Link>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
  );
};


export default SignUpPage;