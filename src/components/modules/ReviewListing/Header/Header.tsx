import Breadcrumbs, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderDetailPage, {
  HeaderDetailPageProps,
} from '~/components/global/HeaderDetailPage/HeaderDetailPage';
import Filters, {
  FilterItem,
} from '~/components/modules/ReviewListing/Filters/Filters';
import { HEADER_COLOR, HEADER_SIZE } from '~/lib/constants';

import styles from './Header.styles';

interface Props extends HeaderDetailPageProps {
  breadcrumbs: BreadcrumbsItem[];
  filters: FilterItem[];
}

function Header({
  breadcrumbs,
  description,
  filters,
  header,
  subHeader,
}: Props) {
  return (
    <Grid css={styles.container}>
      <GridItem css={styles.breadcrumbs}>
        <Breadcrumbs
          currentPath={breadcrumbs.slice().pop()?.url}
          navigationItems={breadcrumbs}
        />
      </GridItem>
      <GridItem>
        <HeaderDetailPage
          description={description}
          header={header}
          subHeader={subHeader}
          headerColor={HEADER_COLOR.WHITE}
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
