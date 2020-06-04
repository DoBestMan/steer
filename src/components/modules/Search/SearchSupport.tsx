import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Search.styles';
import { SearchResultType } from './Search.types';
import SearchSection from './SearchSection';

interface Props {
  onClick: () => void;
}

function SearchSupport({ onClick }: Props) {
  const supportResult = {
    label: ui('search.callUs'),
    labelSegments: [{ label: ui('search.callUs'), matches: false }],
    type: SearchResultType.SiteSearchResultTextItem,
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
