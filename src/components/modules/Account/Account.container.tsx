import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AccountDetails } from '~/lib/constants/sso.types';
import { getSSOLoginURL, hideParamsReturnedFromSSO } from '~/lib/utils/sso';

import { AccountContextProvider } from './Account.context';
import AccountPage from './AccountPage';

export default function AccountContainer({ serverData }: AccountDetails) {
  const router = useRouter();

  const code = router.query.code;
  const state = router.query.state;
  const isDataUpdated = router.query.updated;

  // hide code and state params after redirected from sso
  useEffect(() => {
    if (code && state) {
      hideParamsReturnedFromSSO();
    }
  }, [code, state]);

  // hide updated param after redirected from sso
  useEffect(() => {
    if (isDataUpdated) {
      hideParamsReturnedFromSSO();
    }
  }, [isDataUpdated]);

  useEffect(() => {
    if (!serverData.userDetails.hasToken) {
      const ssoLoginURL = getSSOLoginURL();
      window.location.href = ssoLoginURL;
    }
  }, [serverData]);

  return (
    <AccountContextProvider>
      <AccountPage
        serverData={serverData}
        isDataUpdated={isDataUpdated && isDataUpdated === '1' ? true : false}
      />
    </AccountContextProvider>
  );
}
