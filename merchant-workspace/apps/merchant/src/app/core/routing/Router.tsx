
import {accountPaths, mainPaths} from "./paths";
import AccountList from "../../account/AccountList";
import { Route, Routes, Navigate, useLocation} from "react-router-dom";
import Login from "../../account/login/Login";

const MerchantRouter = ({loggedIn}: {loggedIn: boolean}) => {
  const location = useLocation()

  if (!loggedIn && location.pathname !== `/${accountPaths.login}`) {
    return <Navigate to={accountPaths.login} />
  }

  return (
    <Routes>
      <Route path={mainPaths.main} element={<div>Main</div>}/>
      <Route path={accountPaths.login} element={<Login />}/>
      <Route path={accountPaths.list} element={<AccountList/>}/>
    </Routes>
 )
}

export default MerchantRouter
