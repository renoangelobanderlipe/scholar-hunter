import React, { useState, Fragment } from 'react';
import { useFormik } from 'formik';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { HeaderComponent } from './../../components/HeaderComponent';
import { TextFieldComponent } from './../../components/TextFieldComponents/TextFieldComponent';
import { ButtonComponent } from './../../components/ButtonComponent';
import { register } from '../../utils/apisauce';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { sanctum } from './../../utils/apisauce';
import { PasswordFieldComponent } from './../../components/TextFieldComponents/PasswordFieldComponent';
import { AutoCompleteComponent } from './../../components/AutoCompleteComponent';
import { course, courseType, foundationType } from '../../utils/helper';
import { useSnackbar } from 'notistack';
import useAuthStore from './../../utils/store';
import { accountType } from './../../utils/helper';

const SignUpPage = () => {
  const { setRole, setLoggedIn } = useAuthStore();
  const { enqueueSnackbar, closSenackbar } = useSnackbar();
  const [selectedType, setSelectedType] = useState('');
  const [proceed, setProceed] = useState(false);
  const [show, setShow] = useState(true);

  const navigate = useNavigate();

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
  });

  const createFoundationFormik = useFormik({
    initialValues: {
      'name': "",
      'description': "",
      'address': "",
      'contact_no': "",
      'email': "",
      'type': "",
    }
  });

  const handleOnChange = (fieldname, value) => {
    signUpFormik.setFieldValue(fieldname, value);
  }

  const handleOnCreateFoundation = async (val) => {
    setShow(false);
    setProceed(true);
  }

  const handleOnSubmit = async (values) => {
    sanctum();
    const res = await register({ ...values });

    if (res.data.code == 200) {
      enqueueSnackbar('Success', { variant: 'success' });
      console.log('test login',res.data.role)
      setLoggedIn(true);
      setRole(res.data.data.role);
      navigate('/home', { replace: true });
    } else if(res.data.code == 401){
      enqueueSnackbar(res.data.message, { variant: 'warning' });
    }else{
      enqueueSnackbar('Something Went Wrong', { variant: 'info' });
      console.log(res.data)
    }
  }

  const handleAccountType = (e, val) => {
    setSelectedType(val);
  }

  return (
    <React.Fragment>
      <Grid container
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', minWidth: '100vw' }}
      >
        <form>
          <Grid >
            <HeaderComponent
              title={selectedType == '' ? 'Select Account Type' : selectedType == 'Student' ? 'Create User Account' : console.log(setShow == false ? 'USER' : 'Foudnation')}
              variant={{
                variant: 'h5',
                color: 'black',
                fontWeight: 'bold',
                mb: '2.5rem'
              }}
            />

            {
              selectedType == ''
                ?
                (
                  <Grid container>
                    <Autocomplete
                      disablePortal
                      options={accountType}
                      fullWidth
                      size='small'
                      onChange={(e, value) => handleAccountType(e, value)}
                      renderInput={(params) => <TextField {...params} label={'Account Type'} />}

                    />
                  </Grid>)
                : selectedType == 'Foundation' ? (
                  show ?

                    <React.Fragment>
                      <HeaderComponent
                        title={'Register Your Foundation'}
                        variant={{
                          variant: 'h5',
                          color: 'black',
                          fontWeight: 'bold',
                          mb: '2.5rem'
                        }}
                      />
                      <Grid item p={'0.5rem 0'}>
                        <TextFieldComponent
                          fieldname={'email'}
                          fieldlabel={'Email'}
                          variant={{
                            fullWidth: true,
                            variant: "outlined",
                            size: "small",
                          }}
                          handleOnChange={(field, value) => handleOnChange(field, value)}
                        />
                      </Grid>
                      <Grid item p={'0.5rem 0'}>
                        <TextFieldComponent
                          fieldname={'name'}
                          fieldlabel={'Name'}
                          variant={{
                            fullWidth: true,
                            variant: "outlined",
                            size: "small",
                          }}
                          handleOnChange={(field, value) => handleOnChange(field, value)}
                        />
                      </Grid>
                      <Grid item p={'0.5rem 0'}>
                        <TextFieldComponent
                          fieldname={'description'}
                          fieldlabel={'Description'}
                          variant={{
                            fullWidth: true,
                            variant: "outlined",
                            size: "small",
                          }}
                          handleOnChange={(field, value) => handleOnChange(field, value)}
                        />
                      </Grid>
                      <Grid item p={'0.5rem 0'}>
                        <TextFieldComponent
                          fieldname={'address'}
                          fieldlabel={'Address'}
                          variant={{
                            fullWidth: true,
                            variant: "outlined",
                            size: "small",
                          }}
                          handleOnChange={(field, value) => handleOnChange(field, value)}
                        />
                      </Grid>
                      <Grid item p={'0.5rem 0'}>
                        <TextFieldComponent
                          fieldname={'contact_no'}
                          fieldlabel={'Contact No'}
                          variant={{
                            fullWidth: true,
                            variant: "outlined",
                            size: "small",
                          }}
                          handleOnChange={(field, value) => handleOnChange(field, value)}
                        />
                      </Grid>

                      <Grid item display={'flex'} p={'0.5rem 0'}>
                        <AutoCompleteComponent
                          fieldName={'type'}
                          fieldLabel={'Type'}
                          options={foundationType}
                          handleOnChange={(field, value) => handleOnChange(field, value)}
                        />
                      </Grid>
                      <ButtonComponent
                        disable={createFoundationFormik.values.password != createFoundationFormik.values.confirm_password ? false : true}
                        title={'Continue'}
                        variant={{
                          variant: 'contained'
                        }}
                        onClick={() => handleOnCreateFoundation(createFoundationFormik.values)}
                      />

                    </React.Fragment> :
                    proceed == true ? (
                      <Fragment>
                        <HeaderComponent
                          title={'Create Foundation Account'}
                          variant={{
                            variant: 'h5',
                            color: 'black',
                            fontWeight: 'bold',
                            mb: '2.5rem'
                          }}
                        />
                        <Grid item py={'0.5rem'} >
                          <TextFieldComponent
                            fieldname={'email'}
                            fieldlabel={'Email'}
                            variant={{
                              fullWidth: true,
                              variant: "outlined",
                              size: "small",
                            }}
                            handleOnChange={(field, value) => handleOnChange(field, value)}
                          />
                        </Grid>

                        <Grid item display={'flex'} p={'0.5rem 0'}>
                          <Grid item pr={2}  >
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
                        <Grid item display={'flex'} p={'0.5rem 0'}>
                          <Grid item pr={2}  >
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
                        <Grid item display={'flex'} p={'0.5rem 0'}>
                          <Grid item pr={2}  >
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

                        <Grid item py={1} >
                          <PasswordFieldComponent
                            fieldname={'password'}
                            fieldlabel={'Password'}
                            variant={{
                              fullWidth: true,
                              variant: "outlined",
                              size: "small",
                            }}
                            handleOnChange={(field, value) => handleOnChange(field, value)}
                          />
                        </Grid>
                        <Grid item py={1} >
                          <PasswordFieldComponent
                            fieldname={'password_confirmation'}
                            fieldlabel={'Confirm Password'}
                            variant={{
                              fullWidth: true,
                              variant: "outlined",
                              size: "small",
                            }}
                            handleOnChange={(field, value) => handleOnChange(field, value)}
                          />
                        </Grid>
                        <Grid container sx={{
                          mt: '1rem',
                          mb: '1rem',
                          justifyContent: 'end',
                          alignItems: 'end'
                        }}>
                          <Link to='/'>
                            <Typography sx={{
                              fontWeight: 'bold',
                              color: 'gray',
                              fontSize: '12px'
                            }} >
                              Already have an account?
                            </Typography>
                          </Link>
                        </Grid>
                        <ButtonComponent
                          disable={signUpFormik.values.password != signUpFormik.values.confirm_password ? false : true}
                          title={'Submit'}
                          variant={{
                            variant: 'contained'
                          }}
                          onClick={() => handleOnSubmit(signUpFormik.values)}
                        />
                      </Fragment>
                    ) : <Fragment />

                ) : (
                  <>
                    <Grid item display={'flex'} p={'0.5rem 0'} >
                      <Grid item pr={2}  >
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
                    <Grid item display={'flex'} p={'0.5rem 0'}>
                      <Grid item pr={2}  >
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
                    <Grid item display={'flex'} p={'0.5rem 0'}>
                      <Grid item pr={2}  >
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
                    <Grid item display={'flex'} p={'0.5rem 0'}>
                      <Grid item pr={2}  >
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
                    <Grid item display={'flex'} p={'0.5rem 0'}>
                      <AutoCompleteComponent
                        fieldName={'course'}
                        fieldLabel={'Course'}
                        options={course}
                        handleOnChange={(field, value) => handleOnChange(field, value)}
                      />
                    </Grid>

                    <Grid item display={'flex'} p={'0.5rem 0'}>
                      <AutoCompleteComponent
                        fieldName={'course_type'}
                        fieldLabel={'Course Type'}
                        options={courseType}
                        handleOnChange={(field, value) => handleOnChange(field, value)}
                      />
                    </Grid>
                    <Grid item py={1} >
                      <PasswordFieldComponent
                        fieldname={'password'}
                        fieldlabel={'Password'}
                        variant={{
                          fullWidth: true,
                          variant: "outlined",
                          size: "small",
                        }}
                        handleOnChange={(field, value) => handleOnChange(field, value)}
                      />
                    </Grid>
                    <Grid item py={1} >
                      <PasswordFieldComponent
                        fieldname={'password_confirmation'}
                        fieldlabel={'Confirm Password'}
                        variant={{
                          fullWidth: true,
                          variant: "outlined",
                          size: "small",
                        }}
                        handleOnChange={(field, value) => handleOnChange(field, value)}
                      />
                    </Grid>
                    <Grid container sx={{
                      mt: '1rem',
                      mb: '1rem',
                      justifyContent: 'end',
                      alignItems: 'end'
                    }}>
                      <Link to='/'>
                        <Typography sx={{
                          fontWeight: 'bold',
                          color: 'gray',
                          fontSize: '12px'
                        }} >
                          Already have an account?
                        </Typography>
                      </Link>
                    </Grid>
                    <ButtonComponent
                      disable={signUpFormik.values.password != signUpFormik.values.confirm_password ? false : true}
                      title={'Submit'}
                      variant={{
                        variant: 'contained'
                      }}
                      onClick={() => handleOnSubmit(signUpFormik.values)}
                    />
                  </>
                )
            }
          </Grid>
        </form >
      </Grid >
    </React.Fragment >
  );
}
export default SignUpPage;
