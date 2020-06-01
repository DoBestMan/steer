import { useBreakpoints } from '~/hooks/useBreakpoints';
import { Breakpoint, BREAKPOINT_SIZES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './SearchLabel.styles';

interface Props {
  fullLabelAt?: Breakpoint;
  hideOnSmallMedium?: boolean;
}

function SearchLabel({
  fullLabelAt = BREAKPOINT_SIZES.L,
  hideOnSmallMedium = false,
}: Props) {
  const { lessThan } = useBreakpoints();

  if (lessThan[fullLabelAt]) {
    return (
      <span
        css={[styles.label, hideOnSmallMedium && styles.hideOnSmallMedium]}
        aria-label={ui('search.searchAutocompleteLabel')}
      >
        {ui('search.searchBy')}
        <span css={styles.scrollContainer} aria-hidden="true">
          <span css={styles.scrollItem}>
            {ui('search.searchCategories.vehicle').toLocaleLowerCase()}
          </span>
          <span css={styles.scrollItem}>
            {ui('search.searchCategories.tireSize').toLocaleLowerCase()}
          </span>
          <span css={styles.scrollItem}>
            {ui('search.searchCategories.brand').toLocaleLowerCase()}
          </span>
          <span css={styles.scrollItem}>
            {ui('search.searchCategories.vehicle').toLocaleLowerCase()}
          </span>
        </span>
      </span>
    );
  }
  return <span css={styles.label}>{ui('search.searchAutocompleteLabel')}</span>;
}

export default SearchLabel;
