import FeaturedInfoModule from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import GridItem from '~/components/global/Grid/GridItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { LINK_TYPES } from '~/lib/constants';
import { openAttentiveModal } from '~/lib/helpers/attentive';
import { openReferAFriendModal } from '~/lib/helpers/refer-a-friend';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from '../Footer.styles';
import { PROMOTIONS } from './FooterPromotions.constants';

function FooterPromotions() {
  const { greaterThan } = useBreakpoints();

  return (
    <>
      <GridItem
        css={styles.featuredInfoModule}
        gridColumnS="1/3"
        gridColumnL="1/4"
      >
        <FeaturedInfoModule
          {...PROMOTIONS.signUp}
          dataVendor={'attentive'}
          action={{
            as: LINK_TYPES.BUTTON,
            onClick: openAttentiveModal,
            text: ui('footer.promotions.signUpAction'),
          }}
          customTitleStyles={styles.featuredInfoTitle}
        />
      </GridItem>
      <GridItem
        css={styles.featuredInfoModule}
        gridColumnS="3/5"
        gridColumnL="4/7"
      >
        <FeaturedInfoModule
          {...PROMOTIONS.giftCard}
          action={{
            as: LINK_TYPES.BUTTON,
            onClick: openReferAFriendModal,
            text: ui('footer.promotions.giftCardAction'),
          }}
          customTitleStyles={styles.featuredInfoTitle}
        />
      </GridItem>
      {greaterThan.S && (
        <GridItem gridColumnS="5/7" gridColumnL="7/10">
          <FeaturedInfoModule
            {...PROMOTIONS.militaryDiscount}
            customTitleStyles={styles.featuredInfoTitle}
          />
        </GridItem>
      )}
      {greaterThan.M && (
        <GridItem gridColumnS="3/5" gridColumnL="10/13">
          <FeaturedInfoModule
            {...PROMOTIONS.freeShipping}
            customTitleStyles={styles.featuredInfoTitle}
          />
        </GridItem>
      )}
    </>
  );
}

export default FooterPromotions;
