import { BORDERS } from '~/lib/constants';

export const reset = `
  *,
  *:after,
  *:before {
    box-sizing: inherit;
  }

  *:focus {
    outline: ${BORDERS.FOCUS_STATE};
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  del,
  dfn,
  em,
  font,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  button {
    border: 0 none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  a,
  button {
    border: 0 none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0;
    vertical-align: inherit;
  }

  img {
    display: block;
    height: auto;
    width: 100%;
  }

  figure {
    margin: 0;
  }

  button {
    background-color: transparent;
    border: none;
    border-radius: 0;
    cursor: pointer;
  }

  [role='button'],
  input[type='submit'],
  input[type='reset'],
  input[type='button'],
  button {
    box-sizing: content-box;
  }

  input[type='submit'],
  input[type='reset'],
  input[type='button'],
  button {
    appearance: button;
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    padding: 0;

    user-select: none;
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    // style autocomplete fields
    // https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/
    box-shadow: 0 0 0px 1000px $light-green inset;
  }

  strong {
    font-weight: bold;
  }

  li {
    list-style-type: none;
  }

  a {
    cursor: pointer;
    line-height: normal;
    text-decoration: none;
  }
`;
