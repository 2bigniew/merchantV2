import React, {useEffect, useState} from 'react'
import {Account} from "@merchant-workspace/api-interfaces";
import query from "../core/query";
import {useAsync} from "../hooks/useAsyncEffect";

const AccountList = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { execute, status, value: response, error} = useAsync(async () => query('api/v1/account/list', "GET"))

  useEffect(() => {
    if (response) {
      setAccounts(response)
    }

    if (error) {
      console.error(error)
    }
  }, []);

  return <div>
    <h1>Choose account</h1>
    <ul>
      {accounts.map(({firstname, lastname, email, id}) => (
        <li key={`${id}`}>{firstname} {lastname} <span>{email}</span><span>Login</span></li>
      ))}
    </ul>
    <button>Create account</button>
  </div>
}

export default AccountList
