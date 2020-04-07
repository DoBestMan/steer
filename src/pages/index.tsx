import React from 'react';
import Link from 'next/link';

// Components
import Layout from '~/components/global/Layout/Layout';

// Styles
import { typography } from '~/styles/global/typography';

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
