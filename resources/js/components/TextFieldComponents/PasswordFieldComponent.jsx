import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const PasswordFieldComponent = ({ fieldname, fieldlabel, variant, handleOnChange, formikErrors, others }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function handlePasswordField(value) {
    // Implement Password Validation Here if needed 
    handleOnChange(fieldname, value)
  }

  return (
    <React.Fragment>
      <TextField
        label={fieldlabel}
        type={showPassword ? 'text' : 'password'}

        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        onChange={(event) => handlePasswordField(event.currentTarget.value)}
        {...variant}
        {...formikErrors}
      />
    </React.Fragment>
  )
}