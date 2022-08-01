import React from 'react';

import styles from './app.module.scss';
import MerchantRouter from "./core/routing/Router";

export const App = () => {

  return (
    <>
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
          <MerchantRouter loggedIn={false} />
        </div>
      </div>
    </>
  );
};

export default App;
