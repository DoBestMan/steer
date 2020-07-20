declare module '*.svg';
declare module 'focus-trap';

interface FocusTrapInstance {
  activate: function;
  deactivate: function;
}

interface Window {
  __attentive?: any;
  _talkableq?: object[];
  dataLayer?: object[];
  google_optimize?: { get: (experimentID: string) => string | undefined };
  showTalkablePopup?: () => void;
}
