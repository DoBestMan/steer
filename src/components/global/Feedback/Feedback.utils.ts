declare global {
  interface Window {
    fby: { push: (array: string[]) => void };
  }
}

const CONSTANTS = {
  fbyScriptId: 'feedbackly',
  fbySource: '//cdn.feedbackify.com/f.js',
};

function showFeedbackIframe() {
  if (!window.fby) {
    return;
  }

  window.fby.push(['showForm', '14912']);
}

export function injectFeedbackifyScript() {
  if (!window.fby) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = CONSTANTS.fbyScriptId;
    script.async = true;
    script.src = CONSTANTS.fbySource;
    document.getElementsByTagName('head')[0].appendChild(script);

    script.onload = function () {
      showFeedbackIframe();
    };
  } else {
    showFeedbackIframe();
  }
}
