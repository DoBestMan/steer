import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import Meta, { MetaProps } from '~/components/global/Meta/Meta';
import SearchByBoard from '~/components/global/SearchByBoard/SearchByBoard';
import EditorialHeaders from '~/components/modules/EditorialHeaders/EditorialHeaders';
import ModuleBreadcrumbs from '~/components/modules/EditorialModules/modules/ModuleBreadcrumbs/ModuleBreadcrumbs';
import ModuleSeparator from '~/components/modules/EditorialModules/modules/ModuleSeparator/ModuleSeparator';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SiteDeals } from '~/data/models/SiteDeals';
import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';
import { SiteModuleBreadcrumbsItem } from '~/data/models/SiteModules';
import { ui } from '~/lib/utils/ui-dictionary';

import { DealsList } from './DealsList';
import { breadcrumbData } from './DealsPage.data';
import styles from './DealsPage.styles';

function DealsPage({ deals }: SiteDeals) {
  const brandsBreadCrumData: Array<SiteModuleBreadcrumbsItem> = breadcrumbData;
  const pageHeader: SiteHeaderModule = {
    type: 'SiteModuleHeaderLanding',
    title: ui('deals.pageHeader'),
  };
  const meta: MetaProps = {
    title: ui('meta.tireDeals.title'),
    description: ui('meta.tireDeals.description'),
  };
  const searchByBoardTitle = ui('searchByBoardTitle');
  return (
    <div css={navigationBreadcrumbPaddingTop}>
      <Meta {...meta} />
      <ModuleBreadcrumbs breadcrumbs={brandsBreadCrumData} />
      <EditorialHeaders moduleData={pageHeader} moduleType={pageHeader.type} />
      <ModuleSeparator />
      <SearchByBoard title={searchByBoardTitle} />
      <div css={styles.dealsSection}>
        {deals.map((deal, index) => {
          return (
            <DealsList title={deal.title} items={deal.items} key={index} />
          );
        })}
      </div>
      <ModuleSeparator />
      <div css={styles.bottomDescription}>
        <Grid>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'3/13'}
            gridColumnXL={'5/11'}
          >
            <Markdown>{ui('deals.seoBodyCopy')}</Markdown>
          </GridItem>
        </Grid>
      </div>
    </div>
  );
}

export default DealsPage;
