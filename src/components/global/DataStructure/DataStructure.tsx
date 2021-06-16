import Head from 'next/head';
import { BreadcrumbList, Product } from 'schema-dts';

import { SiteModuleProductLineFAQs } from '~/data/models/SiteModules';

interface Props {
  jsonLD?: BreadcrumbList | Product | SiteModuleProductLineFAQs;
}

function DataStructure({ jsonLD }: Props) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...jsonLD,
          }),
        }}
      />
    </Head>
  );
}

export default DataStructure;
