import React from 'react';
import { Grid } from '@mui/material';
import { HeaderComponent } from './../../components/HeaderComponent';
import { TextFieldComponent } from './../../components/TextFieldComponents/TextFieldComponent';
import { ButtonComponent } from './../../components/ButtonComponent';
import { useFormik } from 'formik';
import { profileShow, updateProfile } from './../../utils/apisauce';

const container = {
  display: 'flex',
}

const style = {
  mr: '1rem',
  padding: '0.5rem 0',
  textAlign: 'center',
};


export const ProfileInfo = () => {
  const [profile, setProfile] = React.useState([]);

  const profileFormik = useFormik({
    initialValues: {
      id_no: '',
      firstname: '',
      middlename: '',
      lastname: '',
      address: '',
      username: '',
      contact_no: '',
      email: '',
    },
  })

  const handleOnChange = (field, values) => {
    profileFormik.setFieldValue(field, values)
  };

  const handleUpdate = async (values) => {
    const res = await updateProfile(values);

    if (res.data.code == 200) {
      setValue(res.data.data);
    }
  }

  const fetchProfile = async () => {
    const res = await profileShow();

    if (res.data.code == 200) {
      setProfile(res.data.data);
    }
  }

  React.useEffect(() => {
    fetchProfile();
  }, [])


  return (
    <React.Fragment>
      <form>
        <Grid container>
          <form>
            <Grid item>
              <HeaderComponent
                title={'Profile Information'}
                variant={{
                  variant: 'h5',
                  color: 'black',
                  fontWeight: 'bold',
                  mb: '1rem'
                }}
              />
              <Grid item display={'flex'} p={'0.5rem 0'} >
                <Grid item pr={2}  >
                  <TextFieldComponent
                    fieldname={'email'}
                    fieldlabel={profile.email}
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
                    fieldlabel={profile.id_no}
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
                    fieldlabel={profile.firstname}
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
                    fieldlabel={profile.middlename}
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
                    fieldlabel={profile.lastname}
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
                    fieldlabel={profile.username}
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
                    fieldlabel={profile.address}
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
                    fieldlabel={profile.contact_no}
                    variant={{
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
              </Grid>

              <Grid item fullWidth p={'0.5rem 0'}>

                <Grid item >
                  <TextFieldComponent
                    fieldname={'course'}
                    fieldlabel={profile.course}
                    variant={{
                      fullWidth: true,
                      disabled: true,
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
              </Grid>
              <Grid item fullWidth p={'0.5rem 0'}>

                <Grid item >
                  <TextFieldComponent
                    fieldname={'course_type'}
                    fieldlabel={profile.course_type}
                    variant={{
                      fullWidth: true,
                      disabled: true,
                      variant: "outlined",
                      size: "small",
                    }}
                    handleOnChange={(field, value) => handleOnChange(field, value)}
                  />
                </Grid>
              </Grid>

              <ButtonComponent
                // disable={signUpFormik.values.password != signUpFormik.values.confirm_password ? false : true}
                title={'Update Profile'}
                variant={{
                  variant: 'contained'
                }}
                onClick={() => handleUpdate(profileFormik.values)}
              />
            </Grid>

          </form>
        </Grid>
      </form >
    </React.Fragment >
  );
}