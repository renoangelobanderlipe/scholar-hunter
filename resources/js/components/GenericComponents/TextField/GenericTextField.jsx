import React from "react";
import TextField from "@mui/material/TextField";

export const GenericTextField = ({
  fieldname,
  fieldlabel,
  variant,
  fieldOptions,
  handleOnChangeValue,
  formikErrors
}) => {
  const handleOnChangeData = (newValue) => {
    handleOnChangeValue(fieldname, newValue);
  };

  return (
    <React.Fragment>
      <TextField
        label={fieldlabel}
        {...variant}
        {...fieldOptions}
        onChange={(event) => handleOnChangeData(event.currentTarget.value)}
        {...formikErrors}
      ></TextField>
    </React.Fragment>
  );
};
