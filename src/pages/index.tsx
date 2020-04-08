import Link from 'next/link';

import Layout from '~/components/global/Layout/Layout';
import { typography } from '~/styles/global/typography.styles';

function Home() {
  return (
    <Layout>
      <div>
        <h1 css={typography.jumboHeadline}>STEER</h1>
        <Link href="/styleguide">
          <a>See Styleguide</a>
        </Link>
      </div>
    </Layout>
  );
}

export default Home;
