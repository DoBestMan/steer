const CONSTANTS = {
  SCRIPT_ID: 'refer-a-friend',
  SCRIPT_SRC:
    'https://d2jjzw81hqbuqv.cloudfront.net/integration/clients/simpletire.min.js',
};

let appended = false;
let isAppending = false;

const appendScript = (onLoadCallBack: () => void) => {
  // Inject global variabl first

  /* eslint-disable  @typescript-eslint/camelcase*/
  window._talkableq = window._talkableq || [];
  window._talkableq.push(['init', { site_id: 'simpletire' }]);

  window._talkableq.push([
    'authenticate_customer',
    {
      email: '', // Optional, pass when available. Example: 'customer@example.com'
      first_name: '', // Optional, pass when available. Example: 'John'
      last_name: '', // Optional, pass when available. Example: 'Smith'
      traffic_source: '', // The source of the traffic driven to the campaign. Example: 'facebook'
    },
  ]);

  window._talkableq.push(['register_affiliate', {}]);
  /* eslint-enable  @typescript-eslint/camelcase*/

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.id = CONSTANTS.SCRIPT_ID;
  script.src = CONSTANTS.SCRIPT_SRC;
  document.getElementsByTagName('head')[0].appendChild(script);
  script.onload = function () {
    if (onLoadCallBack) {
      onLoadCallBack();
    }
  };
};

function scriptInDOM() {
  return (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    window.showTalkablePopup
  );
}

export function appendReferAFriendScript(onLoadCallBack?: () => void) {
  if (isAppending) {
    return;
  }

  isAppending = true;

  if (scriptInDOM()) {
    if (!appended && onLoadCallBack) {
      onLoadCallBack();
    }

    appended = true;
    isAppending = false;
    return;
  }

  const cb = () => {
    appended = true;
    isAppending = false;

    if (onLoadCallBack) {
      onLoadCallBack();
    }
  };

  appendScript(cb);
}

export function openReferAFriendModal() {
  // GTM should inject the script for us
  if (scriptInDOM() && !appended) {
    appended = true;
  }

  if (!appended || !scriptInDOM()) {
    appendReferAFriendScript(openReferAFriendModal);
    return;
  }

  // call the creative
  window.showTalkablePopup && window.showTalkablePopup();
}
