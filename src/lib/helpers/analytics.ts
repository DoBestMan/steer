import { Cookies } from 'react-cookie';

import { randomString } from '~/lib/utils/string';

export const GTM_CONSTANTS = {
  GTM_ID: process.env.GTM_ID || '',
};

interface ExperimentCallback {
  callback: (response: string | undefined) => void;
  experimentID: string;
}

interface DataLayerItem {
  [key: string]: string | number | null | undefined;
}

const TOTAL_TRIALS = 5;

// Injects GTM + Full Story + Optimize
class GoogleAnalytics {
  name = 'Google Analytics';

  init = false;

  scriptInjected = false;

  experimentCallbacks: Record<string, ExperimentCallback> = {};

  trials = 0;

  addToDataLayer(dataLayerItem: DataLayerItem) {
    if (typeof document === 'undefined') {
      return;
    }

    window.dataLayer && window.dataLayer.push(dataLayerItem);
  }

  initialize() {
    if (this.init || typeof window === 'undefined' || !GTM_CONSTANTS.GTM_ID) {
      return;
    }

    this.init = true;
    this.injectScript();
  }

  // Inject GTM, which itself inject FullStory and Google Optimize
  injectScript() {
    if (typeof document === 'undefined') {
      return;
    }

    window.dataLayer = window.dataLayer || [];

    window.dataLayer &&
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      // remote script has loaded
      this.onScriptLoaded();
    };

    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONSTANTS.GTM_ID}`;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  onScriptLoaded() {
    this.scriptInjected = true;

    // Try to set the simple cookie in the dataLayer[] (user ID)
    const cookies = new Cookies();
    const simple = cookies.get('simple');
    if (simple) {
      window.dataLayer && window.dataLayer.push({ simple });
    }

    // No experiment registered, no need
    if (!Object.keys(this.experimentCallbacks).length) {
      return;
    }

    // Already ready, all good
    if (this.isGoogleOptimizeReady()) {
      this.callExperiments();
      return;
    }

    // Try to see if Optimize is ready
    const intervalId = setInterval(() => {
      // Failed after TOTAL_TRIALS times
      if (this.trials >= TOTAL_TRIALS) {
        clearInterval(intervalId);
      }

      if (this.isGoogleOptimizeReady()) {
        this.callExperiments();
        clearInterval(intervalId);
      }

      this.trials++;
    }, 100);
  }

  callExperiments() {
    for (const key in this.experimentCallbacks) {
      if (this.experimentCallbacks[key]) {
        this.getExperimentAnswer(this.experimentCallbacks[key]);
      }
    }

    // reset
    this.experimentCallbacks = { ...{} };
  }

  isGoogleOptimizeReady() {
    return (
      typeof window !== 'undefined' &&
      window.google_optimize &&
      window.google_optimize.get
    );
  }

  getExperiment({ experimentID, callback }: ExperimentCallback): () => void {
    const id = randomString();

    if (!this.isGoogleOptimizeReady()) {
      // register for later
      this.experimentCallbacks[id] = { experimentID, callback };
    } else {
      // script ready
      this.getExperimentAnswer({ experimentID, callback });
    }

    // return dispose function
    return () => {
      if (this.experimentCallbacks[id]) {
        delete this.experimentCallbacks[id];
      }
    };
  }

  getExperimentAnswer({ experimentID, callback }: ExperimentCallback) {
    if (!this.isGoogleOptimizeReady()) {
      return;
    }

    const response =
      window.google_optimize && window.google_optimize.get(experimentID);

    // Default returns '0', so false
    callback(response);
  }
}

export default new GoogleAnalytics();
