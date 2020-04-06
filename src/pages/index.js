import { jsx, css } from '@emotion/core'

// Components
import Layout from "~/components/global/Layout/Layout";

const container = css({
  minHeight: `100vh`,
  padding: `0 0.5rem`,
  display: `flex`,
  flexDirection: `center`,
  justifyContent: `100vh`,
  alignItems: `center`,
})

const title = css({
  margin: 0,
  lineHeight: 1.15,
  fontSize: '4rem',
  textAlign: 'center',
  width: '100%',
})

const Home = () => (
  <Layout>
    <div id="homepage" css={[container]}>
      <h1 css={[title]}>STEER</h1>
    </div>
  </Layout>
)

export default Home
