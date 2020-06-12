import Button from '~/components/global/Button/Button';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './ActionBar.styles';

interface Props {
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

function ActionBar({ onApplyFilters, onResetFilters }: Props) {
  return (
    <div css={styles.root}>
      <button css={styles.reset} onClick={onResetFilters}>
        Reset filters
      </button>
      <Button onClick={onApplyFilters}>{ui('catalog.filters.apply')}</Button>
    </div>
  );
}

export default ActionBar;
