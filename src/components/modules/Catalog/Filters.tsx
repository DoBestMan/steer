import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Filters.styles';
import hStyles from './Header.styles';

interface Props {
  isAdvancedView?: boolean;
}

export default function Filters({ isAdvancedView }: Props) {
  const filterLabel = isAdvancedView
    ? ui('catalog.header.filterLabelAdvanced')
    : ui('catalog.header.filterLabel');
  return (
    <div>
      <p css={[styles.filterLabel, isAdvancedView && hStyles.textAdvanced]}>
        {filterLabel}:
      </p>
    </div>
  );
}
