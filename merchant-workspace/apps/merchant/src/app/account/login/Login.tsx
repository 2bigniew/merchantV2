import React, {useContext} from 'react'
import { Formik } from 'formik'
import { AuthPayload, schemas } from "@merchant-workspace/api-interfaces";
import {Button, Grid, Paper, Typography} from "@mui/material";
import styles from './login.module.scss'
import query from "../../core/query";
import {accountPaths} from "../../core/routing/paths";
import {useNavigate} from "react-router-dom";
import {useValidation} from "../../hooks/useValidation";
import FormikTextField from "../../components/FormikTextField/FormikTextField";
import {AccountContext} from "../../core/context/accountContext";
import {useToast} from "../../hooks/useToast";

const initialValues: AuthPayload = {
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate()
  const validateValues = useValidation()
  const {token, setToken, account, setAccount} = useContext(AccountContext)
  const { showMessage, showError } = useToast()


  const goToCreatePage = () => {
    navigate(accountPaths.create);
  }

  const validateForm = (values: AuthPayload): Record<string, string> | undefined => {
    return validateValues(values, schemas.account.authenticationSchema);
  }

  const login = async (values: AuthPayload) => {
    const {email, password} = values;

    try {

      const response = await query('api/v1/account/authentication', "POST", {}, null,{email, password});
      const {token: tokenValue, ...rest} = response;
      setAccount!(rest);
      setToken!(tokenValue);
      showMessage('Authorization complete')
    } catch (error) {
      showError(error)
    }
  }

  return <Paper className={styles['login']}>
    <Typography variant="h4" component="h2" textAlign='center'>
      Log in to your account
    </Typography>
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={login}>
      {({
          handleSubmit,
          isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles['wrapper']}>
            <div className={styles['item']}>
              <FormikTextField
                type="email"
                name="email"
                label="Email address: "
                variant="outlined"
                required
                helperText="example@mai.com"
                inputMode='email' size='small' />
            </div>
            <div className={styles['item']}>
              <FormikTextField
                name="password"
                label="password: "
                variant="outlined"
                required
                helperText="your password"
                type="password"
                size='small' />
            </div>
          </div>
          <div className={styles['wrapper']}>
            <div className={styles['item']}>
              <Button variant="contained" type='submit' disabled={isSubmitting}>Log in</Button>
            </div>
          </div>
          <div className={styles['wrapper']}>
            <div className={styles['item']}>
              <Typography variant="h5" component="h3" textAlign='center'>
                Don't have account yet?
                {/*  TODO FIX BUTTON*/}
              </Typography>
              <Button variant="outlined" onClick={goToCreatePage}>Create account</Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  </Paper>
}

export default Login
