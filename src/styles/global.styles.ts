import { css } from '@emotion/core';

export const global = css`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  a,
  a:focus,
  a:hover {
    text-decoration: none;
  }

  body {
    color: #333;
    font-family: 'Roboto';
    margin: 0;
    overflow-x: hidden;
  }
`;
