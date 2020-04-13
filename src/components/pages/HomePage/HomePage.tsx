import Layout from '~/components/global/Layout/Layout';

import { typography } from '~/styles/global/typography.styles';

function HomePage() {
  return (
    <Layout>
      <div>
        <h1 css={typography.jumboHeadline}>STEER</h1>
      </div>
    </Layout>
  );
}

export default HomePage;
