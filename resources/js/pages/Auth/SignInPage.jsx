import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { GenericTextField } from "./../../components/GenericComponents/GenericTextField";
import { GenericButton } from "./../../components/GenericComponents/GenericButton";

export const SignInPage = () => {
  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => handleOnSubmit(values),
  });

  const handleOnSubmit = async (values) => {
    const result = await axios.post({ puser_data: values });

    if (result.data.code != 200) {
      // EXCEPTION
    }

    // CONTINUE
  };

  const handleOnChange = (field, newValue) => {
    signInFormik.setFieldValue(field, newValue);
  };

  return (
    <React.Fragment>
      {/* <form>
        <GenericTextField
          fieldName="email"
          fieldLabel="Last Name"
          handleOnChangeValue={(field, newValue) =>
            handleOnChange(field, newValue)
          }
          variant={{
            rows: 8,
            variant: "outlined",
            size: "small",
          }}
          fieldOptions={{
            placeholder: "Email",
            type: "email",
          }}
          // formikErrors={{
          //   error: signUpFormik.errors?.purpose ? true : false,
          //   helperText: signUpFormik.errors?.purpose,
          // }}
        />
        <GenericTextField
          fieldName="password"
          fieldLabel="Password"
          handleOnChangeValue={(field, newValue) =>
            handleOnChange(field, newValue)
          }
          variant={{
            rows: 8,
            variant: "outlined",
            size: "small",
          }}
          fieldOptions={{
            placeholder: "Password",
            type: "password",
          }}
          // formikErrors={{
          //   error: signUpFormik.errors?.purpose ? true : false,
          //   helperText: signUpFormik.errors?.purpose,
          // }}
        />

        <GenericButton
          title={"Sign In"}
          variant={{
            variant: "text",
            color: "primary",
          }}
          onClick={() => signInFormik.handleSubmit(signInFormik.values)}
        />
      </form> */}



      <Box>

        
      </Box>
    </React.Fragment>
  );
};
