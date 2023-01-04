import React from 'react';
import { GenericTextField } from './../GenericComponents/TextField/GenericTextField';
import { Grid } from '@mui/material';

export const Password = () => {
  return (
    <React.Fragment>
      <Grid >
        <GenericTextField
          fieldName="current_password"
          fieldLabel="Current Password"
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
        <GenericTextField
          fieldName="new_password"
          fieldLabel="New Password"
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
    </React.Fragment >
  )
}