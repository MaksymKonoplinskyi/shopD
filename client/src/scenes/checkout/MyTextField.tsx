import {  Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import { IEmailData, IEmailDataE, IValues } from "./Checkout"
import { FormikErrors, FormikTouched } from "formik"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { getIn } from "formik"

import { useFormik } from "formik"
import * as yup from "yup"

interface MyTextFieldProps {
  name: string,
  label: string,
}

const MyInputLabelProps={
  sx: {
    color: "#000000 !important",
    opacity: "0.5",
  },
}
const MyInputProps={
  sx: {
    "& fieldset": {
      border: "1px solid !important",
      borderRadius: 0,
      opacity: "0.3",
    },
  },
}



const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
})

const label = { inputProps: { "aria-label": "Checkbox demo" } }

export const MyTextField: React.FC = () => {

  const formattedError = (field: string) =>
    Boolean(
      getIn(Touch, field) &&
        getIn(Error, field)
    )
  
  const formattedHelper = (field: string) =>
    getIn(Touch, field) && getIn(Error, field)

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <div>
     <TextField
          InputLabelProps={MyInputLabelProps}
          InputProps={MyInputProps}
          fullWidth
          id='firstName'
          name='firstName'
          label='First Name'
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formattedError('firstName')}
          helperText={formattedHelper('firstName')}
        />
    </div>
  )
}
