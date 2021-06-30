export interface SSOTokenInput {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: string;
  redirect_uri: string;
}

export interface SSOTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_toke: string;
  token_type: string;
}

export interface SSOUserIdResponse {
  accountTypes: Array<AccountType>;
  company: string | null;
  firstName: string;
  lastName: string;
  uid: string;
  username: string;
}

export interface AccountType {
  discountPercent: string;
  name: string;
}

export interface ServiceUserIdInput {
  email: string;
  firstName?: string;
  lastName?: string;
  ssoUid: string;
}

export interface AccountDetails {
  serverData: {
    userDetails: {
      email: string;
      hasToken: boolean;
      username: string;
    };
  };
}
