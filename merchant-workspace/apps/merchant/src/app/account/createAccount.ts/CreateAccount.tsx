import React, {useState} from 'react'
import useCommand from "../../hooks/useCommand";
import {Account} from "@merchant-workspace/api-interfaces";
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import styles from './createAccount.module.scss'
import query from "../../core/query";
import {useLocation, useNavigate} from "react-router-dom";
import {accountPaths} from "../../core/routing/paths";

const CreateAccount = () => {
  const sendCommand = useCommand()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [firstname, setFirstname] = useState<string>()
  const [lastname, setLastname] = useState<string>()

  // TODO add formik, logger, toast

  const goToLoginPage = () => {
    navigate(accountPaths.login);
  }

  const createAccountHandler = async () => {
    if (!email || !password || !firstname || !lastname) {
      return
    }

    try {
      const response = await sendCommand({
        type: 'command',
        name: "command.account.create",
        payload: { email, password, firstname, lastname }
      })

      console.log(response)

    } catch (error) {
      // todo add toast
      console.log(error)
    }
  }

  return <Paper className={styles['login']}>
      <Typography variant="h4" component="h2" textAlign='center'>
        Create account
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
      </div>
      <div className={styles['wrapper']}>
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
        <TextField
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              setFirstname(value)
            }
          }}
          label="firstname: "
          variant="outlined"
          required
          helperText="e.g. John"
          type="text"
          size='small' />
      </div>
    </div>
    <div className={styles['wrapper']}>
      <div className={styles['item']}>
        <TextField
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              setLastname(value)
            }
          }}
          label="lastname: "
          variant="outlined"
          required
          helperText="e.g. Doe"
          type="text"
          size='small' />
      </div>
    </div>
      <div className={styles['wrapper']}>
        <div className={styles['item']}>
          <Button variant="outlined" onClick={createAccountHandler}>Create account</Button>
        </div>
      </div>
      <div className={styles['wrapper']}>
        <div className={styles['item']}>
          <Button variant="contained" onClick={goToLoginPage}>Log in</Button>
        </div>
      </div>
  </Paper>
}

export default CreateAccount
