import { MouseEventHandler, ReactNode } from 'react';

import { BUTTON_THEME, LINK_BUTTON_TYPE, LINK_TYPES } from '~/lib/constants';

import Icon from '../Icon/Icon';
import { ICONS } from '../Icon/Icon.constants';
import Button from './Button';
import styles from './Button.styles';

interface Props {
  children: ReactNode;
  isActive: boolean;
  isDisabled?: boolean;
  isDropdownOpen: boolean;
  label: string;
  onClick: MouseEventHandler;
  tabIndex?: number;
  theme?: BUTTON_THEME;
  type?: LINK_BUTTON_TYPE;
}

function FilterButton({
  children,
  isActive,
  isDropdownOpen,
  label,
  onClick,
  theme = BUTTON_THEME.LIGHT,
  ...rest
}: Props) {
  const iconName = isDropdownOpen
    ? ICONS.SMALL_CHEVRON_UP
    : ICONS.SMALL_CHEVRON_DOWN;

  return (
    <>
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
      {children}
    </>
  );
}

export default FilterButton;
