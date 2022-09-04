import React, {useContext, useEffect} from 'react';

import styles from './app.module.scss';
import MerchantRouter from "./core/routing/Router";
import {AccountContext, AccountContextProvider} from "./core/context/accountContext";
import { useLocation, useNavigate} from "react-router-dom";
import {accountPaths} from "./core/routing/paths";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <AccountContextProvider>
      <div className={styles['container']}>
        <div className={styles['navigation']}>
          <nav>
            <ul>
              <li>Customers</li>
              <li>Companies</li>
              <li>Invoices</li>
            </ul>
          </nav>
        </div>
        <div className={styles['content']}>
          <MerchantRouter />
        </div>
      </div>
      </AccountContextProvider>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default App;
