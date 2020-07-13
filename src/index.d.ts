declare module '*.svg';
declare module 'focus-trap';

interface FocusTrapInstance {
  activate: function;
  deactivate: function;
}

interface Window {
  dataLayer?: object[];
  google_optimize?: { get: (experimentID: string) => string | undefined };
}
