import { ui } from '~/lib/utils/ui-dictionary';

import { supportResultMock } from './Search.mocks';
import styles from './Search.styles';
import SearchSection from './SearchSection';

interface Props {
  onClick: () => void;
}

function SearchSupport({ onClick }: Props) {
  return (
    <div css={styles.searchSectionWrapper}>
      <SearchSection
        label={ui('search.support')}
        onClick={onClick}
        siteSearchResultList={[supportResultMock]}
      />
    </div>
  );
}

export default SearchSupport;
