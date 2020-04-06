import React from "react";
import { jsx, css } from '@emotion/core'

const container = css`
    width: 100vw;
`

const mainContent = css`
    height: 100%;
    min-height: 700px;
`

const Layout = props => (
    <div css={[container]}>
        <main role="main" css={[mainContent]}>
            { props.children }
        </main>
    </div>
)

export default Layout;