import React, {useEffect, useState} from 'react'
import {Account} from "@merchant-workspace/api-interfaces";
import query from "../core/query";
import {useToast} from "../hooks/useToast";

const AccountList = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { showError } = useToast()

  useEffect(() => {
    fetchData().then((response) => {
      setAccounts(response)
    }).catch((error) => {
      showError(error)
    })
  }, [fetchData]);


  return <div>
    <h1>Choose account</h1>
    <ul>
      {accounts.map(({firstname, lastname, email, id}) => (
        <li key={`${id}`}>{firstname} {lastname} <span>{email}</span>{' '}<span>Login</span></li>
      ))}
    </ul>
    <button>Create account</button>
  </div>
}

export default AccountList

const fetchData = async (): Promise<Account[]> => query('api/v1/account/list', "GET")
