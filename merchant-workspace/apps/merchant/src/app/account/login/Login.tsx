import React, {useState} from 'react'
import useCommand from "../../hooks/useCommand";
import {Account} from "@merchant-workspace/api-interfaces";
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import styles from './login.module.scss'

const Login = () => {
  const sendCommand = useCommand()
  // TODO add useLocalStorage
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [account, setAccount] = useState<Account>()

  console.log("EMAIL", email)
  console.log("PASS", password)

  const login = async () => {
    if (!email || !password) {
      return
    }

    // TODO some async try catch wrapper

    const response = await sendCommand({
      type: 'command',
      name: 'command.account.login',
      payload: {
        email, password
      }
    })

    console.log(response)

  }

  return <Paper className={styles['login']}>
      <Typography variant="h4" component="h2" textAlign='center'>
        Log in or create account
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
        <div className={styles['item']}>
          <Button variant="outlined">Create account</Button>
        </div>
      </div>
  </Paper>
}

export default Login
