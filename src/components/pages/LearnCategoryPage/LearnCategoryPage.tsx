import { useRouter } from 'next/router';
import React from 'react';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Meta from '~/components/global/Meta/Meta';
import EditorialHeaders from '~/components/modules/EditorialHeaders/EditorialHeaders';
import EditorialModules from '~/components/modules/EditorialModules/EditorialModules';
import ModuleAccordion from '~/components/modules/EditorialModules/modules/ModuleAccordion/ModuleAccordion';
import ModuleTireSearchBillboard from '~/components/modules/EditorialModules/modules/ModuleTireSearchBillboard/ModuleTireSearchBillboard';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SitePageByLearnCategoryResponse } from '~/data/models/SitePageByLearnCategory';
import { titleCaseSlug } from '~/lib/utils/string';

import { styles } from './LearnCategoryPage.styles';
import { convertQuickLinkToAccordionItem } from './mapper/accordionItems';
import {
  mapQueryToBreadcrumbs,
  transformBreadcrumbsItemLearnPage,
} from './mapper/breadcrumbs';

function LearnCategoryPage({
  breadcrumbs,
  modules,
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
          <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
            <Meta {...metadata.meta} />
            {/* use breadCrumbs from contentful if present. */}
            {breadcrumbs ? (
              <Breadcrumbs
                navigationItems={transformBreadcrumbsItemLearnPage(
                  breadcrumbs,
                  pageLabel,
                  query.slug?.toString(),
                )}
              />
            ) : (
              <Breadcrumbs
                navigationItems={mapQueryToBreadcrumbs(query, pageLabel)}
              />
            )}
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
        {modules &&
          modules.length &&
          modules.map((module, id) => (
            <EditorialModules
              key={`${module.type}_${id}`}
              moduleData={module}
              moduleType={module.type}
            />
          ))}
        <ModuleTireSearchBillboard />
      </div>
    </>
  );
}

export default LearnCategoryPage;
