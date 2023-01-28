import { TextField } from '@mui/material';
import React from 'react';

export const TextFieldComponent = ({ fieldname, fieldlabel, variant, handleOnChange, formikErrors, others }) => {

  function handleTextField(values) {
    handleOnChange(fieldname, values);
  }

  return (
    <React.Fragment>
      <TextField
        label={fieldlabel}
        {...variant}
        onChange={(event) => handleTextField(event.currentTarget.value)}
        {...formikErrors}
        {...others}
      ></TextField>
    </React.Fragment>
  );

}