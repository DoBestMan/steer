import { GetServerSideProps } from 'next';
import nookies from 'nookies';

import AccountContainer from '~/components/modules/Account/Account.container';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendGetSSOToken } from '~/lib/backend/account/sso-token';
import { backendGetUserIdFromSSOToken } from '~/lib/backend/account/verify-user';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { SSO_COOKIE_CONSTANTS } from '~/lib/constants/sso';
import {
  AccountDetails,
  SSOTokenInput,
  SSOTokenResponse,
} from '~/lib/constants/sso.types';
import { getStringifiedParams } from '~/lib/utils/routes';

const MyAccount = WithErrorPageHandling(AccountContainer);
export const getServerSideProps: GetServerSideProps<PageResponse<
  AccountDetails
>> = async (context) => {
  backendBootstrap();
  const { code, state } = getStringifiedParams(context.query);

  const cookies = nookies.get(context);
  const ssoTokenInCookie = cookies[SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO];
  const csrfTokenInCookie = cookies[SSO_COOKIE_CONSTANTS.SIMPLETIRE_CSRF];
  const redirectUri = cookies[SSO_COOKIE_CONSTANTS.ACCOUNT_REDIRECT];

  const body = {
    client_id: 'steer',
    client_secret: process.env.STEER_CLIENT_SECERET_SSO,
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  } as SSOTokenInput;

  let userDetails = {
    username: 'User',
    email: '',
    hasToken: false,
  };

  if (
    !ssoTokenInCookie &&
    csrfTokenInCookie !== undefined &&
    csrfTokenInCookie === state
  ) {
    const res = await backendGetSSOToken(body);
    if (res.isSuccess && res.data) {
      const data = (res.data as unknown) as SSOTokenResponse;
      // we are saving two cookies after recieving the sso token
      // the first is saved without domain for local/vercel builds
      nookies.set(
        context,
        SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO,
        data.access_token,
        {
          maxAge: 86400 * 30,
          path: '/',
        },
      );
      // the second one is saved with .simpletire.com domain for it to be accessible by checkout
      nookies.set(
        context,
        SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO,
        data.access_token,
        {
          maxAge: 86400 * 30,
          path: '/',
          domain: SSO_COOKIE_CONSTANTS.DOMAIN,
        },
      );
      const userDetailsResponse = await backendGetUserIdFromSSOToken(
        data.access_token,
      );
      if (userDetailsResponse) {
        const username = userDetailsResponse.firstName
          ? `${userDetailsResponse.firstName} ${userDetailsResponse.lastName}`
          : 'User';
        userDetails = {
          username,
          email: userDetailsResponse?.username,
          hasToken: true,
        };
      }
    }
  } else if (!ssoTokenInCookie && !code && !state) {
    return {
      props: {
        serverData: {
          userDetails,
        },
      },
    };
  } else {
    const userDetailsResponse = await backendGetUserIdFromSSOToken(
      ssoTokenInCookie,
    );
    if (userDetailsResponse) {
      const username = userDetailsResponse.firstName
        ? `${userDetailsResponse.firstName} ${userDetailsResponse.lastName}`
        : 'User';
      userDetails = {
        username,
        email: userDetailsResponse?.username,
        hasToken: true,
      };
    }
  }

  return {
    props: {
      serverData: {
        userDetails,
      },
    },
  };
};

export default WithErrorPageHandling(MyAccount);
