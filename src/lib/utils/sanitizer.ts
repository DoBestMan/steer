// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ReactDOMServer: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let createElement: any;

if (!process.browser) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ReactDOMServer = require('react-dom/server');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  createElement = require('react').createElement;
}

/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 * 2020: SSR sanitizing using ReactDOMServer.renderToString
 */
export const sanitizeHTML = (str: string): string => {
  if (!process.browser) {
    const temp = createElement('div', {}, [str]);
    const element = ReactDOMServer.renderToString(temp);

    const sanitized = element
      .replace('<div data-reactroot="">', '')
      .replace('</div>', '');

    return sanitized;
  }

  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};
