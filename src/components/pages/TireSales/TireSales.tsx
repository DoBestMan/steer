import { useRouter } from 'next/router';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Meta from '~/components/global/Meta/Meta';
import EditorialHeaders from '~/components/modules/EditorialHeaders/EditorialHeaders';
import EditorialModules from '~/components/modules/EditorialModules/EditorialModules';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { ui } from '~/lib/utils/ui-dictionary';

import { pageDownData, pageUpperData } from './TireSales.data';
import { styles } from './TireSales.styles';
import TireSalesForm from './TireSalesForm/TireSalesForm';

function TireSalesPage() {
  const router = useRouter();
  const { query, asPath, pathname } = router;
  const breadcrumbs = mapPathnameToBreadcrumbs({
    asPath,
    labels: {
      sitemap: ui('breadcrumbs.sitemap'),
    },
    pathname,
    query,
  });

  return (
    <div css={[styles.root, navigationBreadcrumbPaddingTop]}>
      {pageUpperData.metadata && pageUpperData.metadata.meta && (
        <Meta {...pageUpperData.metadata.meta} />
      )}
      <Grid>
        <GridItem gridColumnXL={'4/12'}>
          <div css={styles.breadcrumbs}>
            <Breadcrumbs navigationItems={breadcrumbs} />
          </div>
        </GridItem>
      </Grid>
      {pageUpperData.header && (
        <EditorialHeaders
          moduleData={pageUpperData.header}
          moduleType={pageUpperData.header.type}
        />
      )}
      {pageUpperData.modules &&
        pageUpperData.modules.length &&
        pageUpperData.modules.map((module, index) => (
          <EditorialModules
            key={`${module.type}_${index}`}
            moduleData={module}
            moduleType={module.type}
          />
        ))}
      <TireSalesForm />
      {pageDownData.modules &&
        pageDownData.modules.length &&
        pageDownData.modules.map((module, index) => (
          <EditorialModules
            key={`${module.type}_${index}`}
            moduleData={module}
            moduleType={module.type}
          />
        ))}
    </div>
  );
}

export default TireSalesPage;
