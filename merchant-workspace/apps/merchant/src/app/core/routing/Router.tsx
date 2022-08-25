
import {accountPaths, mainPaths} from "./paths";
import AccountList from "../../account/AccountList";
import { Route, Routes, Navigate, useLocation} from "react-router-dom";
import Login from "../../account/login/Login";
import CreateAccount from "../../account/createAccount.ts/CreateAccount";

const MerchantRouter = ({loggedIn}: {loggedIn: boolean}) => {
  const location = useLocation()

  // if (!loggedIn && ![`/${accountPaths.login}`, `/${accountPaths.create}`].includes(location.pathname)) {
  //   return <Navigate to={accountPaths.login} />
  // }

  return (
    <Routes>
      <Route path={mainPaths.main} element={<div>Main</div>}/>
      <Route path={accountPaths.login} element={<Login />}/>
      <Route path={accountPaths.list} element={<AccountList/>}/>
      <Route path={accountPaths.create} element={<CreateAccount/>}/>
    </Routes>
 )
}

export default MerchantRouter
