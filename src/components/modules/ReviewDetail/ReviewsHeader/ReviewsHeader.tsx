import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Breadcrumbs, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import BaseLink from '~/components/global/Link/BaseLink';
import MomentList, {
  MomentListItem,
} from '~/components/global/MomentList/MomentList';
import { Props as RatingsListItem } from '~/components/global/RatingsList/RatingsBar/RatingsBar';
import RatingsList from '~/components/global/RatingsList/RatingsList';
import StarsWithRating from '~/components/global/Stars/StarsWithRating';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './ReviewsHeader.styles';

export interface ReviewsHeaderProps {
  brand: SiteCatalogBrand;
  brandUrl: string;
  breadcrumbs: BreadcrumbsItem[];
  ratingStars: number;
  ratings: RatingsListItem[];
  stats: MomentListItem[];
  tire: string;
}

function ReviewsHeader({
  brand,
  brandUrl,
  breadcrumbs,
  ratingStars,
  ratings,
  stats,
  tire,
}: ReviewsHeaderProps) {
  return (
    <Grid as="section" css={styles.container}>
      <GridItem gridColumnL="3/13" gridColumnXL="4/12" css={styles.breadcrumbs}>
        <Breadcrumbs navigationItems={breadcrumbs} />
      </GridItem>
      <GridItem gridColumnM="2/6" gridColumnL="3/9" gridColumnXL="4/9">
        <BaseLink href={brandUrl} css={styles.brand}>
          <BrandLogoOrLabel brand={brand} />
        </BaseLink>
        <p css={styles.title}>{ui('reviews.tireReviews', { tire })}</p>
        <StarsWithRating
          number={ratingStars}
          typographyStyle={typography.labelHeadlineLarge}
        />
      </GridItem>
      <GridItem
        gridColumnL="3/13"
        gridColumnXL="4/12"
        css={styles.ratingsContainer}
      >
        <RatingsList ratings={ratings} theme={THEME.ORANGE} />
      </GridItem>
      <GridItem
        gridColumnL="3/13"
        gridColumnXL="4/12"
        css={styles.statsContainer}
      >
        <MomentList data={stats} theme={THEME.LIGHT} />
      </GridItem>
    </Grid>
  );
}
export default ReviewsHeader;
