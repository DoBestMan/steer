import { useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './ControlButton.styles';

interface ButtonProps {
  currentIndex: number;
  slideTo: (index: number) => void;
}

function PrevButton({ currentIndex, slideTo }: ButtonProps) {
  const [isHoverd, setHovered] = useState(false);

  function handleClick() {
    slideTo(currentIndex - 1);
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
      aria-label={ui('pdp.tireImage.nextButtonLabel')}
      css={[styles.root, styles.prevButton, isHoverd && styles.isHoverd]}
    >
      <Icon name={ICONS.CHEVRON_LEFT} />
    </button>
  );
}

export default PrevButton;
