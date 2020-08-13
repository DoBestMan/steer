import { useEffect, useRef } from 'react';

import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import Prices from '~/components/global/Prices/Prices';
import Stars, { HALF_WIDTH_STARS } from '~/components/global/Stars/Stars';
import Sticker from '~/components/global/Sticker/Sticker';
import { STICKER_SIZES } from '~/components/global/Sticker/Sticker.styles';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { COLORS, PRODUCT } from '~/lib/constants';
import { getTranslate, subscribeTranslate } from '~/lib/helpers/translate';
import { transformSrcLogoToWhite } from '~/lib/utils/cloudinary/cloudinary';
import { ordinalSuffixOf } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { SPEED_PER_BP } from '../TopPicks.constants';
import CTA from './CTA/CTA';
import { styles } from './TopPicksItem.styles';
import { TopPickItemsProps } from './TopPicksItems.types';

function TopPicksItem(props: TopPickItemsProps) {
  const {
    addVehicleInfo,
    brand,
    asset,
    ctaLabel = ui('catalog.topPicks.ctaLabelFallback'), // Fallback should never happen, but just in case
    currentIndex,
    customerServiceNumber,
    deliveryInfo,
    exploreMore,
    index,
    isCurrent = true,
    indexHovered,
    location,
    onItemMouseEnter,
    onItemMouseLeave,
    openSearch,
    priceList,
    productFeature,
    productName,
    rating,
    show,
    totalResult,
    url,
    viewMoreData,
    slideTo,
  } = props;

  if (brand?.image?.src) {
    brand.image.src = transformSrcLogoToWhite(brand.image.src);
  }

  const rootRef = useRef<HTMLDivElement | null>(null);
  const assetRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef<HTMLAnchorElement | null>(null);
  const viewMoreRef = useRef<HTMLButtonElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const breakpoints = useBreakpoints();
  const isHovered =
    typeof indexHovered !== 'undefined' && indexHovered === index;

  // A hover is happening on another item than the current
  const isCurrentNotHovered =
    typeof indexHovered !== 'undefined' && indexHovered !== index && isCurrent;

  const idForAriaLabbeledBy = `toppick-title-${currentIndex}`;

  // When current, focus on first focusable element
  // Has to have swipped at least once
  useEffect(() => {
    if (!rootRef || !rootRef.current) {
      return;
    }

    const focusableEls = rootRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    for (let i = 0; i < focusableEls.length; i++) {
      const focusable = focusableEls[i] as HTMLElement;
      focusable.tabIndex = isCurrent ? 0 : -1;
    }

    return () => {};
  }, [isCurrent, rootRef]);

  // Asset rotation on carousel translation
  useEffect(() => {
    if (!assetRef || !assetRef.current || !show) {
      return;
    }

    const speed = SPEED_PER_BP[breakpoints.bk];

    const onTranslation = () => {
      const translate = getTranslate();

      if (assetRef.current) {
        const rotate = translate.x / speed;
        assetRef.current.style.transitionDuration = '50ms';
        assetRef.current.style.transform = `rotate(${rotate}deg)`;
      }
    };

    const subscription = subscribeTranslate(onTranslation);

    return () => {
      subscription();
    };
  }, [assetRef, show, breakpoints]);

  const onAddInfoVehicleClick = () => {
    openSearch && openSearch();
  };

  const onMouseEnter = () => {
    onItemMouseEnter &&
      typeof index !== 'undefined' &&
      !isCurrent &&
      onItemMouseEnter(index);
  };

  const onMouseLeave = () => {
    onItemMouseLeave && onItemMouseLeave();
  };

  const ctaLabelStr =
    priceList && priceList.length > 0
      ? ctaLabel
      : ui('catalog.topPicks.callNumberLabel', {
          number: customerServiceNumber.display,
        });

  const rootStyles = [styles.root];
  if (typeof indexHovered !== 'undefined') {
    rootStyles.push(isHovered ? styles.rootHovered : styles.rootNotHovered);
  }

  const showCta =
    (isCurrent || (breakpoints.greaterThan.M && isHovered)) &&
    !isCurrentNotHovered &&
    show;

  // This is meant to be for Voice over, during item navigation
  // When a user selects an item and PRESS, we want the carousel to move and to put the focus on the link with description
  const onClick = () => {
    // Move the carousel
    typeof index !== 'undefined' && slideTo(index);

    /* put focus on best */

    // If view More item
    if (viewMoreData && viewMoreRef && viewMoreRef.current) {
      viewMoreRef.current.focus();
      return;
    }

    // If no price, or add more vehicle, put the focus on CTA
    if (
      !viewMoreData &&
      (addVehicleInfo || !priceList) &&
      ctaRef &&
      ctaRef.current
    ) {
      ctaRef.current.focus();
      return;
    }

    // Finally, focus on description link by default
    contentRef && contentRef.current && contentRef.current.focus();
  };

  return (
    <div
      css={rootStyles}
      ref={rootRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-labelledby={idForAriaLabbeledBy}
    >
      <span css={styles.topContent}>
        <span css={styles.topContentInner}>
          <span css={styles.assetContainer}>
            {/* Sticker (1st, 2nd...) */}
            {asset && typeof index !== 'undefined' && (
              <span css={[styles.sticker, show && styles.stickerShow]}>
                <Sticker
                  label={ordinalSuffixOf(index + 1)}
                  size={STICKER_SIZES.MEDIUM}
                />
              </span>
            )}

            {/* Tire asset */}
            {!viewMoreData && asset && (
              <span
                css={[styles.asset, show && styles.assetShow]}
                ref={assetRef}
              >
                <Image
                  {...asset}
                  responsive
                  as={'span'}
                  widths={[300, 450, 600]}
                  customContainerStyles={{ backgroundColor: 'transparent' }}
                />
              </span>
            )}

            {/* View More */}
            {viewMoreData && exploreMore && (
              <button
                css={[
                  styles.viewMoreContainer,
                  !isCurrent && styles.unclickable,
                ]}
                onClick={exploreMore}
                ref={viewMoreRef}
              >
                <span
                  css={[typography.secondaryHeadline, styles.viewMoreTitle]}
                >
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

      <span
        css={[styles.bottomContent, showCta && styles.bottomContentCurrent]}
      >
        {/* Need vehicle info */}
        {addVehicleInfo && (
          <span
            css={[
              typography.topPicksPrice,
              styles.linkContainer,
              styles.addVehicleContainer,
              isCurrent && show && styles.linkContainerIsCurrent,
              show && styles.linkContainerShow,
            ]}
          >
            {ui('catalog.topPicks.addVehicleText')}
          </span>
        )}

        {/* Classic content */}
        {!addVehicleInfo && url && (
          <BaseLink
            href={url}
            ref={contentRef}
            css={[
              styles.linkContainer,
              isCurrent && show && styles.linkContainerIsCurrent,
              show && styles.linkContainerShow,
            ]}
          >
            {/* Brand logo or brand label if no logo */}
            {brand && (
              <span css={styles.brand}>
                <BrandLogoOrLabel
                  brand={brand}
                  widths={PRODUCT.BRAND_IMAGE_WIDTHS}
                  customLabelStyles={styles.brandLabel}
                  isCentered
                />
              </span>
            )}

            {/* Price */}
            <span css={styles.pricesContainer}>
              <Prices isLight priceList={priceList} />
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
                    color={COLORS.GLOBAL.BLACK}
                    number={rating.value}
                    width={HALF_WIDTH_STARS}
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
              isCurrent && show && styles.linkContainerIsCurrent,
              show && styles.linkContainerShow,
            ]}
          >
            <span css={[typography.topPicksPrice, styles.viewMoreContentTitle]}>
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
          <span css={[styles.cta, showCta && styles.ctaShow]}>
            <CTA
              ref={ctaRef}
              customerServiceNumber={customerServiceNumber}
              hasPriceList={priceList ? priceList.length > 0 : false}
              hasAddVehicleInfo={addVehicleInfo}
              url={url}
              onAddInfoVehicleClick={onAddInfoVehicleClick}
              ctaLabelStr={ctaLabelStr}
            />
          </span>
        )}
      </span>
    </div>
  );
}

export default TopPicksItem;
