import { useMemo } from 'react';

import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Search.styles';
import SearchSection from './SearchSection/SearchSection';

// We need to mock out this search result so that it
// correctly renders in SearchSection
const createSupportResultItem = (customerServiceNumber: {
  display: string;
  value: string;
}) => {
  return {
    action: {
      link: {
        href: `tel:${customerServiceNumber.value}`,
        isExternal: true,
      },
      type: 'SiteSearchResultActionLink',
    },
    detailLabel: null,
    label: ui('search.callUs', { phone: customerServiceNumber.display }),
    labelSegments: [],
    type: 'SiteSearchResultTextItem',
  } as SiteSearchResultTextItem;
};

interface Props {
  customerServiceNumber: { display: string; value: string };
  onClick: () => void;
}

function SearchSupport({ customerServiceNumber, onClick }: Props) {
  const supportResult = useMemo(
    () => createSupportResultItem(customerServiceNumber),
    [customerServiceNumber],
  );

  return (
    <div css={styles.searchSectionWrapper}>
      <SearchSection
        label={ui('search.support')}
        onClick={onClick}
        siteSearchResultList={[supportResult]}
      />
    </div>
  );
}

export default SearchSupport;
