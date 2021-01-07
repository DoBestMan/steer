const SCRIPT_OPTIONS = {
  widgetcode:
    'f937f30669a66ba445a16d956b1e9052e7dd5e04af6050a61813e4c4a825b24f',
  values: {},
  ready: () => {},
};

const ZOHO_SCRIPT = {
  ID: 'zsiqscript',
  SRC: 'https://salesiq.zoho.com/widget',
};

export const ZOHO_SCRIPT_APPEND_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
};

export function appendLiveChatScript() {
  return new Promise((resolve, reject) => {
    if (document.getElementById(ZOHO_SCRIPT.ID)) {
      resolve({ status: ZOHO_SCRIPT_APPEND_STATUS.SUCCESS });
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // adding global.$zoho otherwise zoho script will throw error.
      // the code snippet zoho provided adds $zoho to the global scope. See OPT-180
      global.$zoho = global.$zoho || {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      global.$zoho.salesiq = global.$zoho.salesiq || SCRIPT_OPTIONS;
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = ZOHO_SCRIPT.ID;
      script.defer = true;
      script.src = ZOHO_SCRIPT.SRC;
      const scriptTagElm = document.getElementsByTagName('script')[0];
      if (scriptTagElm.parentNode) {
        scriptTagElm.parentNode.insertBefore(script, scriptTagElm);
      }

      script.onload = function () {
        resolve({ status: ZOHO_SCRIPT_APPEND_STATUS.SUCCESS });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.$zoho.salesiq.floatbutton.visible('hide');
      };
    } catch (error) {
      reject({ ...error, status: ZOHO_SCRIPT_APPEND_STATUS.FAILED });
    }
  });
}
