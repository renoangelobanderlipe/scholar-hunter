import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { GenericTextField } from "./../../components/GenericComponents/GenericTextField";
import { GenericButton } from "./../../components/GenericComponents/GenericButton";
import Typography from '@mui/material/Typography';
import { result } from "lodash";


export const SignInPage = () => {
  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // onSubmit: (values) => handleOnSubmit(values),
  });

  const handleOnSubmit = async (values) => {
    console.log('values', values);

    // const res = await axios.post({ puser_data: values });

    // if (res.data.code == 200) {



    //   signInFormik.values('');
    // }
    // console.log('result', result);
 
    console.log('DONHE');
  };

  const handleOnChange = (field, newValue) => {
    signInFormik.setFieldValue(field, newValue);
  };

  return (
    <React.Fragment>
      <form>
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
          onClick={() => handleOnSubmit(signInFormik.values)}
        />
      </form>

    </React.Fragment>
  );
};
