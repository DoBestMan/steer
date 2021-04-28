import React from 'react';

import FeaturedInfoModule from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import GridItem from '~/components/global/Grid/GridItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { LINK_TYPES } from '~/lib/constants';
// import { openAttentiveModal } from '~/lib/helpers/attentive';
import { openReferAFriendModal } from '~/lib/helpers/refer-a-friend';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { PROMOTIONS } from './FooterPromotions.constants';
import styles from './FooterPromotions.styles';

function FooterPromotions() {
  const { lessThan } = useBreakpoints();
  return (
    <>
      <GridItem
        css={[styles.featuredInfoModule, styles.verticalDivider]}
        gridColumnS="1/3"
        gridColumnM="1/4"
        gridColumnL="1/4"
      >
        <FeaturedInfoModule
          {...PROMOTIONS.giftCard}
          action={{
            as: LINK_TYPES.BUTTON,
            onClick: openReferAFriendModal,
            text: ui('footer.promotions.giftCardAction'),
          }}
          customTitleStyles={styles.featuredInfoTitle}
          customCopyStyles={typography.bodyCopy}
          customLinkStyles={styles.featuredInfoLink}
        />
      </GridItem>

      <GridItem
        css={styles.featuredInfoModule}
        gridColumnS="3/5"
        gridColumnM="4/7"
        gridColumnL="4/7"
      >
        <FeaturedInfoModule
          {...PROMOTIONS.militaryDiscount}
          customTitleStyles={styles.featuredInfoTitle}
          customCopyStyles={typography.bodyCopy}
          customLinkStyles={styles.featuredInfoLink}
        />
      </GridItem>

      {lessThan.L && (
        <GridItem css={styles.horizontalDivider} gridColumn="start/end" />
      )}

      <GridItem
        css={[styles.featuredInfoModule, styles.verticalDivider]}
        gridColumnS="1/3"
        gridColumnM="1/4"
        gridColumnL="7/10"
      >
        <FeaturedInfoModule
          {...PROMOTIONS.freeShipping}
          customTitleStyles={styles.featuredInfoTitle}
          customCopyStyles={typography.bodyCopy}
          customLinkStyles={styles.featuredInfoLink}
        />
      </GridItem>

      <GridItem
        css={styles.featuredInfoModule}
        gridColumnS="3/5"
        gridColumnM="4/7"
        gridColumnL="10/13"
      >
        <FeaturedInfoModule
          {...PROMOTIONS.easyReturn}
          customTitleStyles={styles.featuredInfoTitle}
          customCopyStyles={typography.bodyCopy}
          customLinkStyles={styles.featuredInfoLink}
        />
      </GridItem>
    </>
  );
}

export default FooterPromotions;
