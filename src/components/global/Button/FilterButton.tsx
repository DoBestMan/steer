import { MouseEvent, MouseEventHandler, ReactChild, useState } from 'react';

import { BUTTON_THEME, LINK_BUTTON_TYPE, LINK_TYPES } from '~/lib/constants';

import Icon from '../Icon/Icon';
import { ICONS } from '../Icon/Icon.constants';
import Button from './Button';
import styles from './Button.styles';

interface Props {
  children: ReactChild;
  hasDropDown?: boolean;
  isActive: boolean;
  isDisabled?: boolean;
  onClick: MouseEventHandler;
  tabIndex?: number;
  theme?: BUTTON_THEME;
  type?: LINK_BUTTON_TYPE;
}

/**
 * @todo
 * Presumably we will pass down a dropdown component when this is used for
 * the filters. In which case `isDropdown` can be removed.
 * Filters will also need a11y controls to announce update of filtered list.
 */
function FilterButton({
  children,
  hasDropDown = false,
  isActive,
  onClick,
  theme = BUTTON_THEME.LIGHT,
  ...rest
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const iconName = isExpanded
    ? ICONS.SMALL_CHEVRON_UP
    : ICONS.SMALL_CHEVRON_DOWN;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e);
    setIsExpanded(!isExpanded);
  };

  return (
    <Button
      as={LINK_TYPES.BUTTON}
      isToggleActive={isActive}
      isToggle
      onClick={handleClick}
      // style={isActive ? BUTTON_STYLE.SOLID : BUTTON_STYLE.OUTLINED}
      theme={theme}
      {...rest}
    >
      {children}
      {hasDropDown && <Icon name={iconName} css={styles.filterIcon} />}
    </Button>
  );
}

export default FilterButton;
