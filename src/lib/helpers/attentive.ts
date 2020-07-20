const CONSTANTS = {
  DESKTOP_MODAL_ID: 21465,
  MOBILE_MODAL_ID: 21458,
  SCRIPT_ID: 'attentive',
  SCRIPT_SRC: 'https://cdn.attn.tv/simpletire/dtag.js',
  TRIALS: 10,
};

let appended = false;
let isAppending = false;
let trial = 0;

const appendReferAFriendScript = (onLoadCallBack: () => void) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.id = CONSTANTS.SCRIPT_ID;
  script.src = CONSTANTS.SCRIPT_SRC;
  document.getElementsByTagName('head')[0].appendChild(script);

  script.onload = function () {
    const check = function () {
      const checked =
        window &&
        window.__attentive &&
        window.__attentive.trigger &&
        typeof window.__attentive.trigger === 'function';

      if (checked && onLoadCallBack) {
        onLoadCallBack();
        return;
      }

      if (!checked && trial <= CONSTANTS.TRIALS) {
        trial++;
        setTimeout(check, 100);
      }
    };

    check();
  };
};

function scriptInDOM() {
  return (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    window.__attentive &&
    window.__attentive.trigger
  );
}

export function appendAttentiveScript(onLoadCallBack?: () => void) {
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

  appendReferAFriendScript(cb);
}

export function openAttentiveModal() {
  // GTM should inject the script for us
  if (isAppending) {
    return;
  }

  if (scriptInDOM() && !appended) {
    appended = true;
  }

  if (!appended || !scriptInDOM()) {
    appendAttentiveScript(openAttentiveModal);
    return;
  }

  const modalID =
    window.innerWidth >= 760
      ? CONSTANTS.DESKTOP_MODAL_ID
      : CONSTANTS.MOBILE_MODAL_ID;

  // call the creative
  window.__attentive &&
    window.__attentive.trigger &&
    window.__attentive.trigger(null, null, null, modalID);
}
