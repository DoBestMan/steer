declare module '*.svg';
declare module 'focus-trap';

interface FocusTrapInstance {
  activate: function;
  deactivate: function;
}

// Declare GTM definitions here
interface GTMLocation {
  pathname: string;
}

/* eslint-disable  @typescript-eslint/camelcase*/
interface GTMParams {
  event_category?: string;
  event_label?: string;
  value?: number;
}

interface GTMConfig {
  anonymize_ip?: string;
  page_path?: string;
}
/* eslint-enable  @typescript-eslint/camelcase*/

interface Window {
  dataLayer?: object[];
  gtag?: (type: string, action: string, params: GTMParams | GTMConfig) => void;
}
