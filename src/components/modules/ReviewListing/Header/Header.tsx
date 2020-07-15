import Breadcrumbs, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderDetailPage, {
  HeaderDetailPageProps,
} from '~/components/global/HeaderDetailPage/HeaderDetailPage';
import Filters from '~/components/modules/ReviewListing/Filters/Filters';
import { FilterItem } from '~/components/modules/ReviewListing/Filters/Filters.types';
import { HEADER_SIZE, THEME } from '~/lib/constants';

import styles from './Header.styles';

export interface ReviewListingHeaderProps extends HeaderDetailPageProps {
  breadcrumbs: BreadcrumbsItem[];
  filters: FilterItem[];
}

function Header({
  breadcrumbs,
  description,
  filters,
  header,
  subHeader,
}: ReviewListingHeaderProps) {
  return (
    <Grid css={styles.container}>
      <GridItem css={styles.breadcrumbs}>
        <Breadcrumbs navigationItems={breadcrumbs} theme={THEME.ORANGE} />
      </GridItem>
      <GridItem>
        <HeaderDetailPage
          description={description}
          header={header}
          subHeader={subHeader}
          theme={THEME.ORANGE}
          size={HEADER_SIZE.PRIMARY}
        />
      </GridItem>
      <GridItem css={styles.filtersContainer}>
        <Filters filters={filters} />
      </GridItem>
    </Grid>
  );
}

export default Header;
