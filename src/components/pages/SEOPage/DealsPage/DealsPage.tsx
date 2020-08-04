import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import EditorialHeaders from '~/components/modules/EditorialHeaders/EditorialHeaders';
import ModuleBreadcrumbs from '~/components/modules/EditorialModules/modules/ModuleBreadcrumbs/ModuleBreadcrumbs';
import ModuleGraphicGrid from '~/components/modules/EditorialModules/modules/ModuleGraphicGrid/ModuleGraphicGrid';
import ModuleSeparator from '~/components/modules/EditorialModules/modules/ModuleSeparator/ModuleSeparator';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SiteDeals } from '~/data/models/SiteDeals';
import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';
import {
  SiteModuleBreadcrumbsItem,
  SiteModuleGraphicGridItem,
} from '~/data/models/SiteModules';
import { ui } from '~/lib/utils/ui-dictionary';

import { DealsList } from './DealsList';
import { breadcrumbData } from './DealsPage.data';
import styles from './DealsPage.styles';
import DealsSignUp from './DealsSignUp/DealsSignUp';

function DealsPage({ topGraphicGrid, deals }: SiteDeals) {
  const brandsBreadCrumData: Array<SiteModuleBreadcrumbsItem> = breadcrumbData;
  const pageHeader: SiteHeaderModule = {
    type: 'SiteModuleHeaderLanding',
    title: ui('deals.pageHeader'),
  };
  const graphicGridItems: Array<SiteModuleGraphicGridItem> =
    topGraphicGrid.items;

  return (
    <div css={navigationPaddingTop}>
      <div css={styles.pageHeader}>
        <ModuleBreadcrumbs breadcrumbs={brandsBreadCrumData} />
        <EditorialHeaders
          moduleData={pageHeader}
          moduleType={pageHeader.type}
        />

        <ModuleSeparator />
      </div>

      <div css={styles.topGraphicGrid}>
        <ModuleGraphicGrid
          items={graphicGridItems}
          type={'SiteModuleGraphicGrid'}
        />
      </div>
      <div css={styles.dealsSignUp}>
        <Grid>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <DealsSignUp />
          </GridItem>
        </Grid>
      </div>
      <div css={styles.dealsSection}>
        {deals.map((deal, index) => {
          return (
            <DealsList title={deal.title} items={deal.items} key={index} />
          );
        })}
      </div>
      <div css={styles.bottomDescription}>
        <Grid>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <Markdown>{ui('deals.seoBodyCopy')}</Markdown>
          </GridItem>
        </Grid>
      </div>
    </div>
  );
}

export default DealsPage;
