import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { COLORS, SPACING, StylesMap } from '~/lib/constants';

import PromotionCard from './PromotionCard';
import { PromotionLinksProps } from './PromotionLinks';

export default {
  component: PromotionCard,
  title: 'Global/PromotionCard',
};

const styles: StylesMap = {
  container: {
    height: '100%',
  },
  root: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    minHeight: '100vh',
    padding: `${SPACING.SIZE_40}px 0`,
  },
};

function CardContainer({ children }: { children: React.ReactChild }) {
  return <div css={styles.root}>{children}</div>;
}

export function PromotionCardFiguresWithKnobs() {
  const title = text(
    'Title',
    'June flash sale! Save up to 20% on thousands of tires instantly!',
  );
  const decorator = text('Decorator', '20%');
  const eyebrowIcon = select(
    'Eyebrow Icon',
    Object.values(ICONS),
    'arrow-down',
  );
  const highlight = text('Eyebrow Text', 'Price drop');
  const body = text('Body', 'Promotion valid May 20-June 20, 2020.');
  const moreBody = text('More Body', 'Additional promotion details');
  const viewTirePromotionCTALink = text('CTA Text', 'View tires on promotion');
  const downloadRebateFormLinkLabel = text(
    'Rebate Download Link Label',
    'Download rebate form',
  );
  const rebateFormLink = text(
    'Rebate Form PDF Link',
    'https://simpletire.com/my_images/pdf/1302',
  );
  const downloadRebateFormLink = {
    type: 'SiteLinkWithLabel',
    label: downloadRebateFormLinkLabel,
    link: {
      href: rebateFormLink,
      isExternal: true,
    },
  };
  const promoLink: PromotionLinksProps = {
    type: 'SiteCTAOpenCatalog',
    label: viewTirePromotionCTALink,
    catalogParams: {
      promotion: '1',
    },
  };
  const links = [promoLink, downloadRebateFormLink];
  return (
    <CardContainer>
      <PromotionCard
        eyebrow={highlight}
        eyebrowIcon={{ svgId: eyebrowIcon, type: ICON_IMAGE_TYPE.ICON }}
        figures={[{ type: 'string', value: decorator }]}
        moreBody={moreBody}
        handlePromotionClick={action(
          `click-promo-${promoLink.catalogParams?.promotion}`,
        )}
        links={links}
        {...{ body, title }}
      />
    </CardContainer>
  );
}

export function PromotionCardNoFiguresWithPromoImageWithKnobs() {
  const imageSrc = text(
    'Image Source',
    'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
  );
  const imageAltText = text('Image Alt Text', 'Header image on Promotions');
  const promoImage: SiteImage = {
    altText: imageAltText,
    src: imageSrc,
    type: ICON_IMAGE_TYPE.IMAGE,
  };

  const eyebrowIcon = select(
    'Eyebrow Icon',
    Object.values(ICONS),
    'arrow-down',
  );
  const highlight = text('Eyebrow Text', 'Price drop');
  const title = text(
    'Title',
    'June flash sale! Save up to 20% on thousands of tires instantly!',
  );
  const body = text('Body', 'Promotion valid May 20-June 20, 2020.');
  const moreBody = text('More Body', 'Additional promotion details');
  const viewTirePromotionCTALink = text('CTA Text', 'View tires on promotion');

  const promoLink: PromotionLinksProps = {
    type: 'SiteCTAOpenCatalog',
    label: viewTirePromotionCTALink,
    catalogParams: {
      promotion: '2',
    },
  };
  const links = [promoLink];
  return (
    <CardContainer>
      <PromotionCard
        promoImage={promoImage}
        eyebrow={highlight}
        eyebrowIcon={{ svgId: eyebrowIcon, type: ICON_IMAGE_TYPE.ICON }}
        title={title}
        body={body}
        moreBody={moreBody}
        links={links}
        handlePromotionClick={action(
          `click-promo-${promoLink.catalogParams?.promotion}`,
        )}
      />
    </CardContainer>
  );
}

export function PromotionCardWithNoFiguresAndNoPromoImage() {
  return (
    <CardContainer>
      <PromotionCard
        eyebrow="Trending"
        eyebrowIcon={{ svgId: ICONS.ARROW_UP, type: ICON_IMAGE_TYPE.ICON }}
        body="Most drivers select tires that last between more than 50,000 miles."
        title="Drivers prioritize tires with long durability."
        links={[
          {
            type: 'SiteCTAReferFriend',
            label: 'Refer a friend',
          },
        ]}
        handleReferAFriendClick={action('open the refer a friend modal')}
      />
    </CardContainer>
  );
}

export function PromotionCardWithNumber() {
  return (
    <CardContainer>
      <PromotionCard
        eyebrow="Trending"
        eyebrowIcon={{ svgId: ICONS.ARROW_UP, type: ICON_IMAGE_TYPE.ICON }}
        figures={[{ type: 'string', value: '8 in 10' }]}
        body="Most drivers select tires that last between more than 50,000 miles."
        title="Drivers prioritize tires with long durability."
        links={[
          {
            type: 'SiteCTAReferFriend',
            label: 'Refer a friend',
          },
        ]}
        handleReferAFriendClick={action('open the refer a friend modal')}
      />
    </CardContainer>
  );
}

export function PromotionCardWithIcon() {
  const body = 'Promotion valid May 20-June 20, 2020.';
  const moreBody = 'Additional promotion details';
  return (
    <CardContainer>
      <PromotionCard
        eyebrow={null}
        eyebrowIcon={null}
        figures={[{ svgId: ICONS.SMILEY_WINK, type: ICON_IMAGE_TYPE.ICON }]}
        body={body}
        moreBody={moreBody}
        title="June flash sale! Save up to 20% on thousands of tires instantly!"
        links={[
          {
            type: 'SiteCTAReferFriend',
            label: 'Refer a friend',
          },
        ]}
        handleReferAFriendClick={action('open the refer a friend modal')}
      />
    </CardContainer>
  );
}
