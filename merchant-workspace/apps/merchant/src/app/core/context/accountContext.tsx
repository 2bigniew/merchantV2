import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react"
import {Account} from "@merchant-workspace/api-interfaces";
import {useLocalStorage} from "../../hooks/useLocalStorage";

export const TOKEN_KEY = "token" as const;
export const ACCOUNT_KEY = "account" as const;

export type TAccountContext = {
  token?: string
  setToken?: (token: string) => void
  account?: Account
  setAccount?: (account: Account) => void
  logout?: (account: Account) => void
}

export const AccountContext = createContext<TAccountContext>({})

export const AccountContextProvider = ({children}: PropsWithChildren) => {
  const [tokenFromStorage, setTokenInStorage, removeToken] = useLocalStorage<string | undefined>(TOKEN_KEY, undefined)
  const [accountFromStorage, setAccountInStorage, removeAccount] = useLocalStorage<Account | undefined>(ACCOUNT_KEY, undefined)

  const [token, setTokenInState] = useState<string | undefined>()
  const [account, setAccountInState] = useState<Account | undefined>()

  useEffect(() => {
    setTokenInState(tokenFromStorage);
    setAccountInState(accountFromStorage);
  }, [tokenFromStorage, accountFromStorage])

  // console.log('tokenFromStorage')
  // console.log(tokenFromStorage)
  // console.log(token)

  const setToken = (token: string) => {
    setTokenInState(token)
    setTokenInStorage(token)
  }

  const setAccount = (account: Account) => {
    setAccountInState(account)
    setAccountInStorage(account)
  }

  const logout = () => {
    removeToken()
    removeAccount()
  }

  return (<AccountContext.Provider value={{token, setToken, account, setAccount, logout}}>
    {children}
  </AccountContext.Provider>)
}


