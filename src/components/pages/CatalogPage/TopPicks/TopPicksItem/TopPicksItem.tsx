import { useState } from 'react';

import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import { getSrcset } from '~/components/global/Image/Image.utils';
import BaseLink from '~/components/global/Link/BaseLink';
import Prices from '~/components/global/Prices/Prices';
import PromoTag from '~/components/global/PromoTag/PromoTag';
import { PROMO_STYLES } from '~/components/global/PromoTag/PromoTag.types';
import Stars from '~/components/global/Stars/Stars';
import Sticker from '~/components/global/Sticker/Sticker';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { BUTTON_THEME, COLORS } from '~/lib/constants';
import { ordinalSuffixOf } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import OEModal from '../OEModal/OEModal';
import { styles } from './TopPicksItem.styles';
import { TopPickItemsProps } from './TopPicksItems.types';
import Subtitle from './TPISubtitle/TPISubtitle';
import TitleLine1 from './TPITitleLine1/TPITitleLine1';
import TitleLine2 from './TPITitleLine2/TPITitleLine2';

function TopPicksItem(props: TopPickItemsProps) {
  const {
    addVehicleInfo,
    asset,
    ctaLabel = ui('catalog.topPicks.ctaLabelFallback'), // Fallback should never happen, but just in case
    brand,
    deliveryInfo,
    exploreMore,
    header,
    index,
    isCurrent = true,
    location,
    oeModal,
    openSearch,
    priceList,
    productFeature,
    productName,
    rating,
    totalResult,
    url,
    viewMoreData,
  } = props;

  const [modalOpened, setModalOpened] = useState(false);

  // TODO: Simply using `widths` prop of the <Image> component once https://github.com/SimpleTire/steer/pull/377 merged
  if (asset?.src) {
    asset.srcSet = getSrcset(asset.src, {
      '300w': { width: 300 },
      '450w': { width: 450 },
      '600w': { width: 600 },
    });
  }

  if (brand?.image?.src) {
    brand.image.srcSet = getSrcset(brand.image.src, {
      '200w': { width: 200 },
      '400w': { width: 400 },
      '600w': { width: 600 },
    });
  }

  const onCtaClick = () => {
    if (addVehicleInfo) {
      // Add to vehicle: trigger search modal
      openSearch && openSearch();
    } else {
      // if there's a price: Add to cart
    }
  };

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const ctaLabelStr = priceList
    ? ctaLabel
    : ui('catalog.topPicks.callNumberLabel');

  const hasSubtitle = viewMoreData || header?.subtitle;

  return (
    <div>
      <span css={[styles.topContent, navigationPaddingTop]}>
        <span css={styles.topContentInner}>
          <span css={styles.titleContainer}>
            <span css={styles.titleContainerInner}>
              {/* Title */}
              <span css={[styles.title, isCurrent && styles.titleShow]}>
                <span css={typography.primaryHeadline}>
                  <TitleLine1
                    viewMoreDataTitle={viewMoreData?.header.title}
                    header={header}
                  />
                </span>
                {header?.titleLine2 && (
                  <span css={[styles.titleBottom, typography.primaryHeadline]}>
                    <TitleLine2
                      oeModal={oeModal}
                      header={header}
                      openModal={openModal}
                    />
                  </span>
                )}
              </span>

              {/* Description (optional) */}
              {hasSubtitle && (
                <span
                  css={[
                    styles.description,
                    typography.smallCopyTight,
                    isCurrent && styles.descriptionShow,
                  ]}
                >
                  <Subtitle
                    viewMoreDataHeader={viewMoreData?.header.subtitle}
                    basicHeader={header?.subtitle}
                  />
                </span>
              )}

              {/* Pill (optional) */}
              {header?.pill && (
                <span
                  css={[
                    styles.description,
                    isCurrent && styles.descriptionShow,
                  ]}
                >
                  <PromoTag
                    label={header.pill}
                    style={PROMO_STYLES.ORANGE_PILL}
                    isUppercase
                  />
                </span>
              )}
            </span>
          </span>

          <span css={styles.assetContainer}>
            {/* Sticker (1st, 2nd...) */}
            {asset && (
              <span css={styles.sticker}>
                <Sticker label={ordinalSuffixOf(index + 1)} />
              </span>
            )}

            {/* Tire asset */}
            {!viewMoreData && asset && (
              <Image {...asset} responsive as={'span'} />
            )}

            {/* View More */}
            {viewMoreData && exploreMore && (
              <button css={styles.viewMoreContainer} onClick={exploreMore}>
                <span css={[typography.primaryHeadline, styles.viewMoreTitle]}>
                  view more
                </span>
                {totalResult && (
                  <span
                    css={[typography.smallCopyTight, styles.viewMoreSubtitle]}
                  >
                    {ui('catalog.topPicks.viewMoreTire', {
                      totalResult,
                    })}
                  </span>
                )}
              </button>
            )}
          </span>
        </span>
      </span>

      <span css={styles.bottomContent}>
        {/* Need vehicle info */}
        {addVehicleInfo && (
          <span
            css={[
              typography.secondaryHeadline,
              styles.linkContainer,
              styles.addVehicleContainer,
              isCurrent && styles.linkContainerShow,
            ]}
          >
            {ui('catalog.topPicks.addVehicleText')}
          </span>
        )}

        {/* Classic content */}
        {!addVehicleInfo && url && (
          <BaseLink
            href={url}
            css={[styles.linkContainer, isCurrent && styles.linkContainerShow]}
          >
            {/* Brand logo or brand label if no logo */}
            {brand && (
              <span css={[styles.brand, brand.image && styles.brandWithImage]}>
                <BrandLogoOrLabel brand={brand} />
              </span>
            )}

            {/* Price */}
            <span css={styles.pricesContainer}>
              <Prices isLight isLarge priceList={priceList} />
            </span>

            {/* Product description */}
            <span css={styles.infoContainer}>
              {/* 1st line: deliveryInfo */}
              {deliveryInfo && (
                <span css={styles.productPerkContainer}>
                  <Icon name={ICONS.SHIPPING_TRUCK} css={styles.productIcon} />
                  <span css={typography.smallCopyTight}>
                    <span css={styles.productPerk}>{deliveryInfo.value}</span>{' '}
                    {location && <span>to {location}</span>}
                  </span>
                </span>
              )}

              {/* 2nd line: Name + Feature */}
              {productName && (
                <span
                  css={[styles.productNameContainer, typography.smallCopyTight]}
                >
                  {productName}{' '}
                  {productFeature && <span>・{productFeature}</span>}
                </span>
              )}

              {/* 3nd line: Rating */}
              {rating && (
                <div css={styles.rating}>
                  <Stars
                    isSmall
                    color={COLORS.GLOBAL.BLACK}
                    number={rating.value}
                  />
                  <span css={[styles.subcopy, typography.smallCopyTight]}>
                    ({rating.quantity})
                  </span>
                </div>
              )}
            </span>
          </BaseLink>
        )}

        {/* View More */}
        {viewMoreData && (
          <div
            css={[
              styles.linkContainer,
              styles.viewMoreContentContainer,
              isCurrent && styles.linkContainerShow,
            ]}
          >
            <span
              css={[typography.secondaryHeadline, styles.viewMoreContentTitle]}
            >
              {viewMoreData.content.title}
            </span>
            {viewMoreData.content.subtitleLine1 && (
              <span
                css={[
                  typography.smallCopyTight,
                  styles.viewMoreContentSubtitle,
                ]}
              >
                {viewMoreData.content.subtitleLine1}
              </span>
            )}
            {viewMoreData.content.subtitleLine2 && (
              <span
                css={[
                  typography.smallCopyTight,
                  styles.viewMoreContentSubtitle,
                ]}
              >
                {viewMoreData.content.subtitleLine2}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        {!viewMoreData && (
          <span css={[styles.cta, isCurrent && styles.ctaShow]}>
            {priceList ? (
              <Button theme={BUTTON_THEME.ORANGE} onClick={onCtaClick}>
                {addVehicleInfo
                  ? ui('catalog.topPicks.addVehicleCtaLabel')
                  : ctaLabelStr}
              </Button>
            ) : (
              <Button
                as="a"
                href={`tel:${ui('catalog.topPicks.callNumber')}`}
                theme={BUTTON_THEME.ORANGE}
              >
                {ctaLabelStr}
              </Button>
            )}
          </span>
        )}
      </span>

      {oeModal && (
        <OEModal isOpen={modalOpened} onClose={closeModal} content={oeModal} />
      )}
    </div>
  );
}

export default TopPicksItem;
