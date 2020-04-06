import { css } from '@emotion/core'

export const global = css`
    @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

    a,
    a:focus,
    a:hover {
        text-decoration: none;
    }

    body {
        font-family: "Roboto";
        color: #333;
        overflow-x: hidden;
        margin: 0;
    }
`