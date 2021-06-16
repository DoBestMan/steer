import React from 'react';

import DataStructure from '~/components/global/DataStructure/DataStructure';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import ModuleAccordion from '~/components/modules/EditorialModules/modules/ModuleAccordion/ModuleAccordion';
import { SiteModuleProductLineFAQs } from '~/data/models/SiteModules';
import { THEME } from '~/lib/constants/theme';

import { transformFaqItem } from './faqItem';
import styles from './ModuleProductLineFAQs.styles';

function ModuleProductLineFAQs(props: SiteModuleProductLineFAQs) {
  return (
    <div css={styles.faqItem}>
      <DataStructure jsonLD={props} />
      <Grid>
        <GridItem as="h2" gridColumnL="3/7" css={[styles.title]}>
          <div data-component="module-product-line-faqs">
            {props.heading && props.heading}
          </div>
        </GridItem>
        <GridItem gridColumnL="8/13" css={styles.dataContainer}>
          <div>
            {props.mainEntity && (
              <ModuleAccordion
                theme={THEME.DARK}
                id="product-line-faq"
                items={transformFaqItem(props.mainEntity)}
                type="SiteModuleAccordion"
                hasBottomBorder
                isColumn
              />
            )}
          </div>
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleProductLineFAQs;
