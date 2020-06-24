import { useEffect, useRef, useState } from 'react';

import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import Prices from '~/components/global/Prices/Prices';
import PromoTag from '~/components/global/PromoTag/PromoTag';
import { PROMO_STYLES } from '~/components/global/PromoTag/PromoTag.types';
import Stars from '~/components/global/Stars/Stars';
import Sticker from '~/components/global/Sticker/Sticker';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { COLORS } from '~/lib/constants';
import { getTranslate, subscribeTranslate } from '~/lib/helpers/translate';
import { ordinalSuffixOf } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import OEModal from '../OEModal/OEModal';
import { SPEED_PER_BP } from '../TopPicks.constants';
import CTA from './CTA/CTA';
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
    indexHovered,
    location,
    oeModal,
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
  } = props;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const assetRef = useRef<HTMLSpanElement | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const breakpoints = useBreakpoints();
  const isHovered = typeof index !== 'undefined' && indexHovered === index;

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

  const rootStyles = [styles.root];
  if (typeof indexHovered !== 'undefined') {
    rootStyles.push(isHovered ? styles.rootHovered : styles.rootNotHovered);
  }

  return (
    <div
      css={rootStyles}
      ref={rootRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span css={styles.topContent}>
        <span css={styles.topContentInner}>
          <span
            css={[
              styles.titleContainer,
              isCurrent && styles.titleContainerIsCurrent,
            ]}
          >
            <span css={styles.titleContainerInner}>
              {/* Title */}
              <span css={[styles.title, isCurrent && show && styles.titleShow]}>
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
                    isCurrent && show && styles.descriptionShow,
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
                    isCurrent && show && styles.descriptionShow,
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
            {asset && typeof index !== 'undefined' && (
              <span css={[styles.sticker, show && styles.stickerShow]}>
                <Sticker isLarge label={ordinalSuffixOf(index + 1)} />
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
                />
              </span>
            )}

            {/* View More */}
            {viewMoreData && exploreMore && (
              <button css={styles.viewMoreContainer} onClick={exploreMore}>
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

      <span css={styles.bottomContent}>
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
            css={[
              styles.linkContainer,
              isCurrent && show && styles.linkContainerIsCurrent,
              show && styles.linkContainerShow,
            ]}
          >
            {/* Brand logo or brand label if no logo */}
            {brand && (
              <span css={[styles.brand, brand.image && styles.brandWithImage]}>
                <BrandLogoOrLabel brand={brand} widths={[200, 400, 600]} />
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
          <span
            css={[
              styles.cta,
              (isCurrent || (breakpoints.greaterThan.M && isHovered)) &&
                show &&
                styles.ctaShow,
            ]}
          >
            <CTA
              hasPriceList={priceList !== null}
              hasAddVehicleInfo={addVehicleInfo}
              url={url}
              onAddInfoVehicleClick={onAddInfoVehicleClick}
              ctaLabelStr={ctaLabelStr}
            />
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
