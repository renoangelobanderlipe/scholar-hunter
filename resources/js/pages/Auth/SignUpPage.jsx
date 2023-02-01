import React from 'react';
import { useFormik } from 'formik';
import { Grid } from '@mui/material';
import { HeaderComponent } from './../../components/HeaderComponent';
import { TextFieldComponent } from './../../components/TextFieldComponents/TextFieldComponent';
import { ButtonComponent } from './../../components/ButtonComponent';
import { register } from '../../utils/apisauce';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { sanctum } from './../../utils/apisauce';

const SignUpPage = () => {
  const signUpFormik = useFormik({
    initialValues: {
      id_no: '',
      firstname: '',
      middlename: '',
      lastname: '',
      address: '',
      username: '',
      contact_no: '',
      email: '',
      course_type: '',
      course: '',
      password: '',
      confirm_password: ''
    },
  })

  function handleOnChange(fieldname, value) {
    signUpFormik.setFieldValue(fieldname, value);
  }

  const handleOnSubmit = (values) => {
    sanctum();
    const res = register({ ...values });

    if (res.data.code == 200) {
      // 
    }
  }

  return (
    <React.Fragment>
      <Grid container
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', minWidth: '100vw' }}
      >

        <form>
          <Grid item>
            <HeaderComponent
              title={'Sign Up'}
              variant={{
                variant: 'h5',
                color: 'black',
                fontWeight: 'bold',
                mb: '3rem'
              }}
            />

            <Grid>
              <Grid container spacing={2} mb={'1rem'}>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'email'}
                    fieldlabel={'Email'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'id_no'}
                    fieldlabel={'ID No'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mb={'1rem'}>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'firstname'}
                    fieldlabel={'Firstname'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'middlename'}
                    fieldlabel={'Middlename'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mb={'1rem'}>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'lastname'}
                    fieldlabel={'Lastname'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'username'}
                    fieldlabel={'Username'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mb={'1rem'}>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'address'}
                    fieldlabel={'Address'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'contact_no'}
                    fieldlabel={'Contact No'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mb={'1rem'}>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'course'}
                    fieldlabel={'Course'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'course_type'}
                    fieldlabel={'Course Type'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mb={'1rem'}>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'password'}
                    fieldlabel={'Password'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
                <Grid item >
                  <TextFieldComponent
                    fieldname={'password_confirmation'}
                    fieldlabel={'Confirm Password'}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
              </Grid>

              <ButtonComponent
                variant={{
                  variant: "contained",
                }}
                title={'Submit'}
                onClick={() => handleOnSubmit(signUpFormik.values)}
              />

            </Grid>
            <Grid container sx={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Link to='/'>
                <Typography >
                  ALREADY HAVE AN ACCOUNT?
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid >
    </React.Fragment >
  );
}
export default SignUpPage;
