import React from 'react';

import { AccountContextProvider } from '../../modules/Account/Account.context';
import MyGaragePage from './MyGaragePage';

export default function MyGaragePageContainer() {
  return (
    <AccountContextProvider>
      <MyGaragePage />
    </AccountContextProvider>
  );
}
