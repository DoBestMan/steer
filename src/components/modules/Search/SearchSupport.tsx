import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Search.styles';
import SearchSection from './SearchSection';

interface Props {
  onClick: () => void;
}

function SearchSupport({ onClick }: Props) {
  const supportResult = {
    displayValue: ui('search.callUs'),
    type: 'term',
    value: 'call-us',
  };

  return (
    <div css={styles.searchSectionWrapper}>
      <SearchSection
        label={ui('search.support')}
        onClick={onClick}
        searchResults={[supportResult]}
      />
    </div>
  );
}

export default SearchSupport;
