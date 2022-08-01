import React, {useEffect, useState} from 'react'
import {Account} from "@merchant-workspace/api-interfaces";
import query from "../core/query";

const AccountList = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    query('api/v1/account/list').then((accounts) => {
      setAccounts(accounts)
    })
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
