import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { GenericTextField } from "../GenericComponents/GenericTextField";
import axios from "axios";
import { GenericButton } from "../GenericComponents/GenericButton";

const validationSchema = Yup.object().shape({
  // firstName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // lastName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // email: Yup.string().email('Invalid email').required('Required'),
});

export const SignUpPage = () => {
  const signUpFormik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      username: "",
      email: "",
      address: "",
    },

    validationSchema: validationSchema,

    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    enableReinitialize: true,

    onSubmit: (values) => handleOnSubmit(values),
  });

  const handleOnSubmit = async (values) => {
    console.log("Sign In DATA RESULT", values);
    // const result = await axios.post({'user_data' : values});

    /**
     *
     * Sample response from backend 
    data = [
      data : [
        '...' : '...'
      ],
      message : 'Success SHIT',
      code : 200
    ]
     */

    if (result.data.code != 200) {
      // THROW EXCEPTION SHIT
    }
    // REDIRECT WITH SUCCESS MESSAGE
  };

  const handleOnChange = (field, newValue) => {
    signUpFormik.setFieldValue(field, newValue);
  };

  return (
    <React.Fragment>
      <form>
        <GenericTextField
          fieldName="firstname"
          fieldLabel="First Name"
          handleOnChangeValue={(field, newValue) =>
            handleOnChange(field, newValue)
          }
          variant={{
            rows: 8,
            variant: "outlined",
            size: "small",
          }}
          fieldOptions={{
            placeholder: "First Name",
            type: "text",
          }}
          // formikErrors={{
          //   error: signUpFormik.errors?.purpose ? true : false,
          //   helperText: signUpFormik.errors?.purpose,
          // }}
        />
        <GenericTextField
          fieldName="lastname"
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
            placeholder: "Last Name",
            type: "text",
          }}
          // formikErrors={{
          //   error: signUpFormik.errors?.purpose ? true : false,
          //   helperText: signUpFormik.errors?.purpose,
          // }}
        />
        <GenericTextField
          fieldName="address"
          fieldLabel="Address"
          handleOnChangeValue={(field, newValue) =>
            handleOnChange(field, newValue)
          }
          variant={{
            rows: 8,
            variant: "outlined",
            size: "small",
          }}
          fieldOptions={{
            placeholder: "Address",
            type: "Field Type",
          }}
          // formikErrors={{
          //   error: signUpFormik.errors?.purpose ? true : false,
          //   helperText: signUpFormik.errors?.purpose,
          // }}
        />
        <GenericTextField
          fieldName="email"
          fieldLabel="Email"
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
          fieldName="username"
          fieldLabel="User Name"
          handleOnChangeValue={(field, newValue) =>
            handleOnChange(field, newValue)
          }
          variant={{
            rows: 8,
            variant: "outlined",
            size: "small",
          }}
          fieldOptions={{
            placeholder: "User Name",
            type: "text",
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
          title={"Sign Up"}
          variant={{
            variant: "text",
            color: "primary",
          }}
          onClick={() => signUpFormik.handleSubmit(signUpFormik.values)}
        />
      </form>
    </React.Fragment>
  );
};
