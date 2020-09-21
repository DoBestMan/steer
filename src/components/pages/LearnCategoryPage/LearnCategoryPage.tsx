import { useRouter } from 'next/router';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Meta from '~/components/global/Meta/Meta';
import EditorialHeaders from '~/components/modules/EditorialHeaders/EditorialHeaders';
import ModuleAccordion from '~/components/modules/EditorialModules/modules/ModuleAccordion/ModuleAccordion';
import ModuleMarkdown from '~/components/modules/EditorialModules/modules/ModuleMarkdown/ModuleMarkdown';
import ModuleTireSearchBillboard from '~/components/modules/EditorialModules/modules/ModuleTireSearchBillboard/ModuleTireSearchBillboard';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SitePageByLearnCategoryResponse } from '~/data/models/SitePageByLearnCategory';
import { titleCaseSlug } from '~/lib/utils/string';

import { styles } from './LearnCategoryPage.styles';
import { convertQuickLinkToAccordionItem } from './mapper/accordionItems';
import { mapQueryToBreadcrumbs } from './mapper/breadcrumbs';

function LearnCategoryPage({
  content,
  header,
  metadata,
  quickLinks,
}: SitePageByLearnCategoryResponse) {
  const router = useRouter();
  const { query } = router;
  const pageLabel = metadata.meta.title
    ? metadata.meta.title
    : `${titleCaseSlug(`${query.slug}`)}`;
  return (
    <>
      <div css={[navigationPaddingTop, styles.spacingBottom40]}>
        <Grid css={styles.breadcrumbsContainer}>
          <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
            <Meta {...metadata.meta} />
            <Breadcrumbs
              navigationItems={mapQueryToBreadcrumbs(query, pageLabel)}
            />
          </GridItem>
        </Grid>
      </div>
      <div css={styles.learnCategoryContainer}>
        <EditorialHeaders moduleData={header} moduleType={header.type} />
        {quickLinks && (
          <ModuleAccordion
            hasBottomBorder
            id="learn-category"
            items={convertQuickLinkToAccordionItem(quickLinks, 'Quick Links')}
            type="SiteModuleAccordion"
          />
        )}
        <ModuleMarkdown {...content} />
        <ModuleTireSearchBillboard />
      </div>
    </>
  );
}

export default LearnCategoryPage;
