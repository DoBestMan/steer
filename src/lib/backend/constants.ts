export const BackendEndpoints = {
  mainApiLocal: {
    apiBaseUrl: 'http://localhost:3000/api',
  },
  mainApiMock: {
    apiBaseUrl: 'https://steer-api-definition.now.sh/api',
  },
  mainApiIntegration: {
    apiBaseUrl: 'https://master-services.jenkins.simpletire.com',
  },
  mainApiProduction: {
    apiBaseUrl: 'https://master-services.jenkins.simpletire.com',
    // TODO SWITCH TO PRODUCTION API
    // https://simpletire.atlassian.net/browse/WCS-1140
    // apiBaseUrl: 'https://services.simpletire.com',
  },
};
