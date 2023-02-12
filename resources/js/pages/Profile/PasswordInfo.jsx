import React from 'react';
import { Grid } from '@mui/material';
import { PasswordFieldComponent } from './../../components/TextFieldComponents/PasswordFieldComponent';
import { HeaderComponent } from './../../components/HeaderComponent';
import { ButtonComponent } from './../../components/ButtonComponent';
import { updatePassword } from './../../utils/apisauce';
import { useFormik } from 'formik';

const style = {
  mr: '1rem',
  padding: '0.5rem 0',
  textAlign: 'center',
};

export const PasswordInfo = () => {

  const passwordFormik = useFormik({
    initialValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    }
  })

  const handleOnChange = (field, values) => {
    passwordFormik.setFieldValue(field, values);
  }

  const handleUpdate = async (values) => {
    console.log('values', values);
    const res = await updatePassword(values );
  }

  return (
    <React.Fragment>
      <Grid container>
        <form>
          <Grid item>
            <HeaderComponent
              title={'Update Password'}
              variant={{
                variant: 'h5',
                color: 'black',
                fontWeight: 'bold',
                mb: '1rem'
              }}
            />
            <Grid item py={1} >
              <PasswordFieldComponent
                fieldname={'current_password'}
                fieldlabel={'CurrentPassword'}
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
                fieldname={'password'}
                fieldlabel={'Update Password'}
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

            <ButtonComponent
              // disable={signUpFormik.values.password != signUpFormik.values.confirm_password ? false : true}
              title={'Update Password'}
              variant={{
                variant: 'contained'
              }}
              onClick={() => handleUpdate(passwordFormik.values)}
            />
          </Grid>
        </form>
      </Grid>
    </React.Fragment >
  )
}