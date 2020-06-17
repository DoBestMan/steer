import { MouseEventHandler } from 'react';

import { LINK_BUTTON_TYPE, LINK_TYPES, THEME } from '~/lib/constants';

import Icon from '../Icon/Icon';
import { ICONS } from '../Icon/Icon.constants';
import Button from './Button';
import styles from './Button.styles';

interface Props {
  isActive: boolean;
  isDisabled?: boolean;
  isDropdownOpen: boolean;
  isVisible?: boolean;
  label: string;
  onClick: MouseEventHandler;
  tabIndex?: number;
  theme?: THEME.DARK | THEME.LIGHT | THEME.ORANGE;
  type?: LINK_BUTTON_TYPE;
}

function FilterButton({
  isActive,
  isDropdownOpen,
  isVisible = true,
  label,
  onClick,
  theme = THEME.LIGHT,
  ...rest
}: Props) {
  if (!isVisible) {
    return null;
  }
  const iconName = isDropdownOpen
    ? ICONS.SMALL_CHEVRON_UP
    : ICONS.SMALL_CHEVRON_DOWN;

  return (
    <Button
      as={LINK_TYPES.BUTTON}
      isToggleActive={isActive || isDropdownOpen}
      isToggle
      onClick={onClick}
      theme={theme}
      css={!isActive && isDropdownOpen && styles.filterButtonSelecting}
      {...rest}
    >
      {label}
      <Icon name={iconName} css={styles.filterIcon} />
    </Button>
  );
}

export default FilterButton;
