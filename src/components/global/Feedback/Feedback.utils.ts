declare global {
  interface Window {
    fby: { push: (array: (string | Record<string, unknown>)[]) => void };
  }
}

let isInjected = false;

export const CONSTANTS = {
  fbyID: '14912',
  fbyScriptId: 'feedbackly',
  fbySource: '//cdn.feedbackify.com/f.js',
  showFeedbackTab:
    (process.env.SHOW_FEEDBACK_TAB && Boolean(process.env.SHOW_FEEDBACK_TAB)) ||
    false,
};

export function showFeedbackIframe() {
  if (!window.fby) {
    return;
  }

  window.fby.push(['showForm', CONSTANTS.fbyID]);
}

export function showFeedbackTab() {
  window.fby = window.fby || [];

  window.fby.push([
    'showTab',
    { id: CONSTANTS.fbyID, position: 'right', color: '#7B7B7B' },
  ]);
}

export function injectFeedbackifyScript() {
  window.fby = window.fby || [];

  if (!isInjected) {
    isInjected = true;

    if (CONSTANTS.showFeedbackTab) {
      showFeedbackTab();
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = CONSTANTS.fbyScriptId;
    script.async = true;
    script.src = CONSTANTS.fbySource;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
