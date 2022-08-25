import React, {useState} from 'react'
import useCommand from "../../hooks/useCommand";
import {Account} from "@merchant-workspace/api-interfaces";
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import styles from './login.module.scss'
import query from "../../core/query";
import {accountPaths} from "../../core/routing/paths";
import {useNavigate} from "react-router-dom";

const Login = () => {
  // TODO add useLocalStorage
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [account, setAccount] = useState<Account>()
  const [token, setToken] = useState<string>()
  const navigate = useNavigate()


  const goToCreatePage = () => {
    navigate(accountPaths.create);
  }

  const login = async () => {
    if (!email || !password) {
      return
    }

    try {
      const response = await query('api/v1/account/authentication', "POST", {}, null,{email, password});
      console.log('responseAUTH')
      console.log(response)
      const {token, ...rest} = response;
      setAccount(rest);
      setToken(token);
    } catch (error) {
      // todo add toast
      console.log('eeeeee')
      console.log(error)
    }
  }

  return <Paper className={styles['login']}>
      <Typography variant="h4" component="h2" textAlign='center'>
        Log in to your account
      </Typography>
      <div className={styles['wrapper']}>
        <div className={styles['item']}>
          <TextField
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                setEmail(value)
              }
            }}
            label="Email address: "
            variant="outlined"
            required
            helperText="example@mai.com"
            inputMode='email' size='small' />
        </div>
        <div className={styles['item']}>
          <TextField
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                setPassword(value)
              }
            }}
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
          <Button variant="contained" onClick={login}>Log in</Button>
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
  </Paper>
}

export default Login
