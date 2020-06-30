export const GTM_CONSTANTS = {
  GTM_ID: process.env.GTM_ID || '',
  GTM_AUTH: process.env.GTM_AUTH,
  GTM_PREVIEW: process.env.GTM_PREVIEW,
  GTM_COOKIES_WIN: process.env.GTM_COOKIES_WIN,
};

class GoogleAnalytics {
  name = 'Google Analytics';

  init = false;

  scriptInjected = false;

  config: GTMConfig = {};

  _userSessionId: string | null = null;

  set userSessionId(userSessionId: string) {
    this._userSessionId = userSessionId;

    if (typeof document === 'undefined') {
      return;
    }

    window.dataLayer &&
      window.dataLayer.push({ userSessionId: this._userSessionId });
  }

  initialize(location?: GTMLocation) {
    if (this.init || typeof window === 'undefined') {
      return;
    }

    this.init = true;
    this.injectScript(location);
  }

  injectScript(_location?: GTMLocation) {
    if (typeof document === 'undefined') {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      // remote script has loaded
      this.scriptInjected = true;
    };
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONSTANTS.GTM_ID}&gtm_auth=${GTM_CONSTANTS.GTM_AUTH}&gtm_preview=${GTM_CONSTANTS.GTM_PREVIEW}&gtm_cookies_win=${GTM_CONSTANTS.GTM_COOKIES_WIN}`;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  // validate if 'ga' is defined
  checkGa() {
    this.checkInit();

    return (
      typeof window !== 'undefined' &&
      'gtag' in window &&
      typeof window.gtag !== 'undefined' &&
      this.scriptInjected
    );
  }

  checkInit() {
    if (!this.init) {
      this.initialize();
    }
  }

  pageView(location: GTMLocation) {
    // ga track
    if (!this.checkGa()) {
      return;
    }

    const { pathname } = location;

    const config: GTMConfig = Object.assign({}, this.config);
    /* eslint-disable  @typescript-eslint/camelcase*/
    config.page_path = pathname;
    /* eslint-enable  @typescript-eslint/camelcase*/

    window.gtag && window.gtag('config', GTM_CONSTANTS.GTM_ID, config);
  }

  // /* https://developers.google.com/analytics/devguides/collection/gtagjs/events */
  eventTrack(action: string, params: GTMParams = {}) {
    if (!this.checkGa()) {
      return;
    }

    window.gtag && window.gtag('event', action, params);
  }
}

export default new GoogleAnalytics();
