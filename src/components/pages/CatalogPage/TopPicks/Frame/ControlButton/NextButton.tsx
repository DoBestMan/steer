import { useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { CSSStyles } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './ControlButton.styles';

interface ButtonProps {
  currentIndex: number;
  customStyles?: CSSStyles;
  slideTo: (index: number) => void;
}

function NextButton({ slideTo, currentIndex, customStyles }: ButtonProps) {
  const [isHoverd, setHovered] = useState(false);
  function handleClick() {
    slideTo(currentIndex + 1);
  }

  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setHovered(false);
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ui('pdp.tireImage.previousButtonLabel')}
      css={[
        styles.root,
        styles.nextButton,
        isHoverd && styles.isHoverd,
        customStyles,
      ]}
    >
      <Icon name={ICONS.CHEVRON_RIGHT} />
    </button>
  );
}

export default NextButton;
