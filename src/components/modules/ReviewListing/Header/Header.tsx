import Breadcrumbs, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderLandingPage, {
  HeaderLandingPageProps,
} from '~/components/global/HeaderLandingPage/HeaderLandingPage';
import Filters from '~/components/modules/ReviewListing/Filters/Filters';
import { FilterItem } from '~/components/modules/ReviewListing/Filters/Filters.types';
import { HEADER_SIZE, THEME } from '~/lib/constants';

import styles from './Header.styles';

export interface ReviewListingHeaderProps extends HeaderLandingPageProps {
  breadcrumbs: BreadcrumbsItem[];
  filters: FilterItem[];
}

function Header({
  breadcrumbs,
  body,
  filters,
  title,
  subTitle,
}: ReviewListingHeaderProps) {
  return (
    <Grid css={styles.container}>
      <GridItem css={styles.breadcrumbs}>
        <Breadcrumbs navigationItems={breadcrumbs} theme={THEME.ORANGE} />
      </GridItem>
      <GridItem>
        <HeaderLandingPage
          body={body}
          title={title}
          subTitle={subTitle}
          theme={THEME.ORANGE}
          titleSize={HEADER_SIZE.PRIMARY}
        />
      </GridItem>
      <GridItem css={styles.filtersContainer}>
        <Filters filters={filters} />
      </GridItem>
    </Grid>
  );
}

export default Header;
