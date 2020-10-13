import { GetStaticProps } from 'next';

import Sitemap from '~/components/pages/Sitemap/Sitemap';

function SitemapPage() {
  return <Sitemap />;
}

export const getStaticProps: GetStaticProps<Record<
  string,
  unknown
>> = async () => {
  return {
    props: {},
  };
};

export default SitemapPage;
