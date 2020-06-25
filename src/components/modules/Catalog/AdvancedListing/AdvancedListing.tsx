import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import MomentList from '~/components/global/MomentList/MomentList';
import Prices from '~/components/global/Prices/Prices';
import RatingsList from '~/components/global/RatingsList/RatingsList';
import Stars from '~/components/global/Stars/Stars';
import Sticker from '~/components/global/Sticker/Sticker';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import {
  BREAKPOINT_SIZES,
  COLORS,
  RATINGS_DISPLAY,
  THEME,
} from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './AdvancedListing.styles';
import { AdvancedListingProps } from './AdvancedListing.types';

const MAX_PROMOS = 2;

function AdvancedListing({
  brand,
  name,
  imageList,
  dataMomentList,
  defaultImage,
  highlight,
  link,
  siteCatalogPromotionInfo,
  size,
  performanceRatingList,
  priceList,
  rating,
  specList,
}: AdvancedListingProps) {
  const { bk } = useBreakpoints();
  const displayedImage =
    imageList.find((image) => image.productImageType === defaultImage) ||
    imageList[0];

  const numberOfPromosToDisplay =
    siteCatalogPromotionInfo && siteCatalogPromotionInfo.count > MAX_PROMOS
      ? 1
      : MAX_PROMOS;

  return (
    <Grid css={styles.root}>
      <GridItem
        css={styles.imageWrapper}
        gridColumnM="2 / 5"
        gridColumnL="2 / 7"
      >
        <div css={styles.image}>
          {highlight && (
            <div css={styles.sticker}>
              <Sticker label={highlight} />
            </div>
          )}
          <Image {...displayedImage.image} altText={name} />
        </div>
      </GridItem>
      <GridItem
        css={styles.info}
        isGrid
        gridColumnM="5 / 8"
        gridColumnL="7 / 14"
      >
        <GridItem
          css={styles.leftSection}
          gridColumnS="1 / 3"
          gridColumnM="1/3"
          gridColumnL="1/4"
        >
          <div>
            <div css={styles.brand}>
              <BrandLogoOrLabel brand={brand} widths={[200, 400, 600]} />
            </div>
            <Prices
              currentPriceCSS={typography.secondaryHeadline}
              priceList={priceList}
            />
            <h3 css={styles.title}>
              <BaseLink css={styles.linkText} href={link.href}>
                {name} <Icon css={styles.linkIcon} name={ICONS.CHEVRON_RIGHT} />
              </BaseLink>
            </h3>
            <div css={styles.title}>{size}</div>
          </div>
          <ul css={styles.momentList}>
            {siteCatalogPromotionInfo?.list
              .slice(0, numberOfPromosToDisplay)
              .map((item) => (
                <li css={[styles.moment, styles.momentPromo]} key={item.label}>
                  {item.icon && (
                    <Icon css={styles.momentIcon} name={item.icon.svgId} />
                  )}
                  {item.label}{' '}
                  {siteCatalogPromotionInfo.count > MAX_PROMOS &&
                    ui('catalog.productListing.morePromos', {
                      number: siteCatalogPromotionInfo.count - 1,
                    })}
                </li>
              ))}
            {dataMomentList?.map((item) => (
              <li css={styles.moment} key={item.label}>
                <Icon css={styles.momentIcon} name={item.icon.svgId} />
                {item.label}
              </li>
            ))}
          </ul>
        </GridItem>
        <GridItem
          css={styles.rightSection}
          gridColumnS="3 / 5"
          gridColumnM="3/4"
          gridColumnL="4/8"
        >
          {rating && (
            <div css={styles.reviews}>
              <div css={styles.rating}>
                <Stars
                  isSmall={bk !== BREAKPOINT_SIZES.XL}
                  bgColor={COLORS.LIGHT.OFF_WHITE}
                  color={
                    bk === BREAKPOINT_SIZES.XL
                      ? COLORS.GLOBAL.ORANGE
                      : COLORS.GLOBAL.BLACK
                  }
                  number={rating.value}
                />
                <span css={styles.ratingValue}>
                  {rating.value}{' '}
                  <span css={styles.ratingQuantity}>({rating.quantity})</span>
                </span>
              </div>
              <div css={styles.reviewsCount}>
                {ui('catalog.productListing.customerReviews', {
                  number: rating.quantity,
                })}
              </div>
            </div>
          )}
          <div css={styles.bottomSection}>
            <div css={styles.specList}>
              <MomentList
                data={specList}
                theme={THEME.LIGHT}
                display={RATINGS_DISPLAY.COMPACT}
              />
            </div>
          </div>
          <div css={[styles.bottomSection, styles.ratingBarsSection]}>
            <div css={styles.ratingBars}>
              <RatingsList
                ratings={performanceRatingList}
                display={RATINGS_DISPLAY.COMPACT}
                theme={THEME.LIGHT}
              />
            </div>
          </div>
        </GridItem>
      </GridItem>
    </Grid>
  );
}

export default AdvancedListing;
