export const URLS = {
  ACCOUNT_INTEGRATION:
    'https://checkout-stage-frontend.jenkins.simpletire.com/my_customers/login',
  ACCOUNT_PRODUCTION: 'https://checkout.simpletire.com/my_customers/login',
  CHECKOUT_INTEGRATION:
    'https://checkout-stage-frontend.jenkins.simpletire.com',
  CHECKOUT_PRODUCTION: 'https://checkout.simpletire.com',
  HOST_PRODUCTION: 'https://simpletire.com',
  MAIN_API_FEATURE: (branch: string | undefined): string =>
    branch
      ? `https://${branch}-services.jenkins.simpletire.com`
      : 'https://master-services.jenkins.simpletire.com',
  MAIN_API_INTEGRATION: 'https://master-services.jenkins.simpletire.com',
  MAIN_API_LOCAL: 'http://localhost:3000/api',
  MAIN_API_MOCK: (branch: string | null): string =>
    branch
      ? `https://steer-api-definition-git-${branch}-steer.vercel.app/api`
      : 'https://steer-api-definition.vercel.app/api',
  MAIN_API_PRODUCTION: 'https://services.simpletire.com',
  SSO_INTEGRATION: 'https://main-simplesignon.jenkins.simpletire.com',
  SSO_PRODUCTION: 'https://signon.simpletire.com',
};
