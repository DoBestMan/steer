import { useBreakpoints } from '~/hooks/useBreakpoints';

import FilterDropdown from './Dropdown';
import FilterModal from './FilterModal';

export interface PopupProps {
  isOpen: boolean;
  label: string;
  onClose: () => void;
  onSelectFilter: () => void;
}

interface Props extends PopupProps {
  isDropdown: boolean;
}

export default function FilterPopup({ isDropdown, ...props }: Props) {
  const { greaterThan } = useBreakpoints();
  if (isDropdown && greaterThan.M) {
    return <FilterDropdown {...props}>{props.label} content</FilterDropdown>;
  }

  return <FilterModal {...props}>{props.label} content</FilterModal>;
}
