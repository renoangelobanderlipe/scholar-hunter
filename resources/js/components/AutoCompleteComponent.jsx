import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

export const AutoCompleteComponent = ({ fieldLabel, fieldName, handleOnChange, options = [] }) => {
  const handleOnSelect = (val) => {
    handleOnChange(fieldName, val);
  }

  return (
    <React.Fragment>
      <Autocomplete
        disablePortal
        options={options}
        fullWidth
        size='small'
        onChange={(e, value) => handleOnSelect(value)}
        renderInput={(params) => <TextField {...params} label={fieldLabel} />}

      />
    </React.Fragment>
  );
}