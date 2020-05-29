import { MouseEvent, MouseEventHandler, ReactChild, useState } from 'react';

import { BUTTON_THEME, LINK_BUTTON_TYPE, LINK_TYPES } from '~/lib/constants';

import Button from './Button';

interface Props {
  children: ReactChild;
  isActive: boolean;
  isDisabled?: boolean;
  onClick: MouseEventHandler;
  tabIndex?: number;
  theme?: BUTTON_THEME;
  type?: LINK_BUTTON_TYPE;
}

function FilterButtonToggle({
  children,
  isActive,
  onClick,
  theme = BUTTON_THEME.LIGHT,
  ...rest
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

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
      theme={theme}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default FilterButtonToggle;
