import React from "react";
import {TextField} from "@mui/material";
import {useField} from "formik";

type Props = {
  name: string
  type: 'email' | 'password' | 'text' | 'date'
  label: string
  variant: 'standard' | 'outlined' | 'filled'
  required: boolean
  helperText?: string
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
  size: "small" | "medium"

}

const FormikTextField = ({name, type, label, variant, required, helperText, inputMode, size}: Props) => {
  const [field, meta ] = useField(name)
  const error = meta.touched && meta.error ? meta.error : ''

  return <TextField
    type={type}
    name={field.name}
    onChange={field.onChange}
    onBlur={field.onBlur}
    value={field.value}
    label={label}
    variant={variant}
    required={required}
    error={!!error}
    aria-errormessage={error}
    helperText={error ? error : helperText}
    inputMode={inputMode}
    size={size} />
}

export default FormikTextField
