export const URLS = {
  ACCOUNT_INTEGRATION:
    'https://checkout-stage-frontend.jenkins.simpletire.com/my_customers/login',
  ACCOUNT_PRODUCTION: 'https://checkout.simpletire.com/my_customers/login',
  CHECKOUT_INTEGRATION:
    'https://checkout-stage-frontend.jenkins.simpletire.com',
  CHECKOUT_PRODUCTION: 'https://checkout.simpletire.com',
  MAIN_API_FEATURE: (branch: string | undefined): string =>
    branch
      ? `https://${branch}-services.jenkins.simpletire.com`
      : 'https://master-services.jenkins.simpletire.com',
  MAIN_API_INTEGRATION: 'https://master-services.jenkins.simpletire.com',
  MAIN_API_LOCAL: 'http://localhost:3000/api',
  MAIN_API_MOCK: 'https://steer-api-definition.now.sh/api',
  MAIN_API_PRODUCTION: 'https://services.simpletire.com',
};
