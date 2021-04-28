import React from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import Carousel from '~/components/global/Carousel/CarouselDynamic';
import FiltersCarousel from '~/components/global/FiltersCarousel/FiltersCarousel';
import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Skeleton from '~/components/global/Loading/Skeleton';
import Sticker from '~/components/global/Sticker/Sticker';
import { STICKER_SIZES } from '~/components/global/Sticker/Sticker.styles';
import { RADIUS, THEME } from '~/lib/constants';
import { ordinalSuffixOf } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './CatalogLoading.styles';

function CatalogLoading() {
  const filterButtonLabels = [
    ui('catalog.header.tireType'),
    ui('catalog.header.brand'),
    ui('catalog.header.price'),
    ui('catalog.header.load'),
    ui('catalog.header.speedRating'),
    ui('catalog.header.warranty'),
    ui('catalog.header.more'),
  ];

  return (
    <>
      <div css={styles.header}>
        <Skeleton
          width="100%"
          height="40px"
          radius={RADIUS.RADIUS_8}
          theme={THEME.DARK}
        />
        <Skeleton
          width="80%"
          height="24px"
          radius={RADIUS.RADIUS_8}
          theme={THEME.DARK}
        />
        <Skeleton
          width="150%"
          height="24px"
          radius={RADIUS.RADIUS_8}
          theme={THEME.DARK}
        />
        <p css={[styles.filterLabel]}>{ui('catalog.header.filterLabel')}:</p>
        <FiltersCarousel activeFilter={null}>
          {filterButtonLabels.map((label, index) => (
            <FilterButton
              key={index}
              theme={THEME.DARK}
              label={label}
              isActive={false}
              isDisabled={false}
              isDropdownOpen={false}
              onClick={() => {}}
              css={styles.filterButton}
            />
          ))}
        </FiltersCarousel>
      </div>
      <div css={styles.subFilterWrapper}>
        <div css={styles.subFilter}>
          <Skeleton width="40%" />
          <Skeleton width="30%" />
        </div>
        <div css={styles.sortBy}>
          <p css={styles.sortLabel}>{ui('catalog.filters.sortBy')} </p>
          <Link
            className="dropdown-button"
            theme={THEME.LIGHT}
            as="button"
            css={styles.sort}
          >
            Best Match
          </Link>
        </div>
      </div>
      <div css={styles.curation}>
        <Skeleton width="60%" height="40px" />
        <Skeleton width="50%" height="24px" />
        <Carousel wrapperClass="assets-wrapper">
          {new Array(5).fill(0).map((_, index) => (
            <span key={index} css={styles.assetContainer}>
              <span css={styles.sticker}>
                <Sticker
                  label={ui('catalog.topPicks.ordinalLabel', {
                    ordinal: ordinalSuffixOf(index + 1),
                  })}
                  size={STICKER_SIZES.SMALL}
                  customCss={styles.stickerCustom}
                  customTypography={typography.primarySubhead}
                />
              </span>
              <span css={styles.asset}>
                <Image
                  altText="tire"
                  src="https://images.simpletire.com/image/upload/v1612896361/steer/common/tire-skeleton.png"
                  widths={[115]}
                  height="160"
                  width="115"
                />
              </span>
            </span>
          ))}
        </Carousel>
        <Carousel>
          {new Array(5).fill(0).map((_, index) => (
            <Skeleton
              key={index}
              customContainerStyles={styles.curationItem}
              width="180px"
              height="180px"
              radius={RADIUS.RADIUS_10}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default CatalogLoading;
