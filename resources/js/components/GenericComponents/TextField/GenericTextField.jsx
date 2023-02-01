import React from "react";
import TextField from "@mui/material/TextField";

export const GenericTextField = ({
  fieldName,
  variant,
  fieldOptions,
  handleOnChangeValue,
  formikErrors
}) => {
  const handleOnChangeData = (newValue) => {
    handleOnChangeValue(fieldName, newValue);
  };

  return (
    <React.Fragment>
      <TextField
        {...variant}
        {...fieldOptions}
        onChange={(event) => handleOnChangeData(event.currentTarget.value)}
        {...formikErrors}
      ></TextField>
    </React.Fragment>
  );
};
