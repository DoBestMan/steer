import Head from 'next/head';
import { BreadcrumbList, Product } from 'schema-dts';

interface Props {
  jsonLD?: BreadcrumbList | Product;
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
