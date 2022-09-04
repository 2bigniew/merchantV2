
import {accountPaths, mainPaths} from "./paths";
import AccountList from "../../account/AccountList";
import {Route, Routes, Navigate, useLocation, useNavigate} from "react-router-dom";
import Login from "../../account/login/Login";
import CreateAccount from "../../account/createAccount.ts/CreateAccount";
import {useContext, useEffect} from "react";
import {AccountContext} from "../context/accountContext";

const MerchantRouter = () => {
  const location = useLocation()
  const {token} = useContext(AccountContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token && ![accountPaths.login, accountPaths.create].includes(location.pathname)) {
      navigate(accountPaths.login)
    }
  }, [token, accountPaths, location.pathname])


  return (
    <Routes>
      <Route path={mainPaths.main} element={<div>Main</div>}/>
      {/*<Route path={accountPaths.login} element={<Login />}/>*/}
      <Route path={accountPaths.login} element={ token ? <Navigate to={accountPaths.list} replace /> : <Login />}/>
      <Route path={accountPaths.list} element={<AccountList/>}/>
      <Route path={accountPaths.create} element={<CreateAccount/>}/>
      <Route
        path="*"
        element={<Navigate to={mainPaths.main} replace />}
      />
    </Routes>
 )
}

export default MerchantRouter
