import Button from '~/components/global/Button/Button';
import { ui } from '~/lib/utils/ui-dictionary';

interface Props {
  onApplyFilters: () => void;
}

function ActionBar({ onApplyFilters }: Props) {
  return (
    <div>
      <Button onClick={onApplyFilters}>{ui('catalog.filters.apply')}</Button>
    </div>
  );
}

export default ActionBar;
