import { useRef, useState } from 'react';

import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Modal from '~/components/global/Modal/Modal';
import Sticker from '~/components/global/Sticker/Sticker';
import { STICKER_SIZES } from '~/components/global/Sticker/Sticker.styles';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
import { MODAL_THEME, THEME } from '~/lib/constants';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';
import { ordinalSuffixOf } from '~/lib/utils/string';
import { typography } from '~/styles/typography.styles';

import styles from './TopTireDetailsModal.styles';

const ASSETS_CONSTANTS = {
  WIDTHS: [300, 450, 600],
  CUSTOM_CONTAINER_STYLES: {
    backgroundColor: 'transparent',
  },
};

export interface Props {
  index: number;
  isOpen: boolean;
  onAfterClose: () => void;
  onClose: () => void;
  pick: SiteCatalogSummaryTopPickItem;
}

function TopTireDetailsModal({
  index,
  isOpen,
  pick,
  onClose,
  onAfterClose,
}: Props) {
  const [assetHovered, setAssetHovered] = useState(false);
  const assetRef = useRef<HTMLSpanElement | null>(null);

  const { titleLine1: title, titleLine2, subtitle } = pick.header;
  const { product, fallbackImage } = pick;
  const {
    brand,
    size,
    loadSpeedRating,
    deliveryInfo,
    category,
    specList,
    link,
  } = product as SiteCatalogProductItem;
  const warrantySpec = specList.find((spec) => spec.label === 'Warranty');
  let asset = null;

  if (product) {
    asset =
      product.imageList.filter(
        (img) => img.productImageType === PRODUCT_IMAGE_TYPES.SIDEWALL,
      )[0]?.image || product.imageList[0].image;
  } else if (fallbackImage) {
    asset = fallbackImage;
  }

  const handleMouseHoverAsset = () => {
    setAssetHovered(true);
  };

  const handleMouseHoverLeave = () => {
    setAssetHovered(false);
  };

  return (
    <Modal
      contentLabel={title}
      theme={MODAL_THEME.LIGHT}
      onClose={onClose}
      onAfterClose={onAfterClose}
      isOpen={isOpen}
    >
      <div css={styles.container}>
        <h1
          css={[styles.title1, !titleLine2 && !subtitle && styles.noSubtitle]}
        >
          {title}
        </h1>
        {titleLine2 && (
          <h1 css={[styles.title2, !subtitle && styles.noSubtitle]}>
            {titleLine2}
          </h1>
        )}
        {subtitle && <h2 css={styles.subtitle}>{subtitle}</h2>}

        <span css={styles.assetContainer}>
          {/* Sticker (1st, 2nd...) */}
          {asset && typeof index !== 'undefined' && (
            <span css={[styles.sticker, styles.stickerShow]}>
              <Sticker
                label={ordinalSuffixOf(index + 1)}
                size={STICKER_SIZES.LARGE}
                customCss={styles.stickerCustom}
                customTypography={typography.primarySubhead}
              />
            </span>
          )}

          {/* Tire asset */}
          {asset && (
            <span css={styles.assetWrapper}>
              <span
                css={[
                  styles.asset,
                  styles.assetShow,
                  assetHovered && styles.assetHovered,
                ]}
                ref={assetRef}
                onMouseEnter={handleMouseHoverAsset}
                onMouseLeave={handleMouseHoverLeave}
              >
                <Image
                  {...asset}
                  responsive
                  as={'span'}
                  widths={ASSETS_CONSTANTS.WIDTHS}
                  customContainerStyles={
                    ASSETS_CONSTANTS.CUSTOM_CONTAINER_STYLES
                  }
                />
              </span>
            </span>
          )}
        </span>
        <ul css={styles.specList}>
          <li css={styles.spec}>
            {brand.label} {size} {loadSpeedRating}
          </li>
          {deliveryInfo?.value && (
            <li css={styles.spec}>{deliveryInfo.value}</li>
          )}
          {warrantySpec && <li css={styles.spec}>{warrantySpec.concise}</li>}
          {category && <li css={styles.spec}>{category.name}</li>}
        </ul>
        <Link
          css={styles.link}
          theme={THEME.ORANGE}
          href={link.href}
          onClick={onClose}
        >
          View tire details
        </Link>
      </div>
    </Modal>
  );
}

export default TopTireDetailsModal;
