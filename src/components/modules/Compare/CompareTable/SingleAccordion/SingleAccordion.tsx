import { useEffect, useRef, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { useWindowSize } from '~/hooks/useWindowSize';
import { CSSStyles, CSSStylesProp, KEYCODES } from '~/lib/constants';

import { LABEL_INITIAL_HEIGHT } from '../../Compare.constants';
import styles from './SingleAccordion.styles';

interface Props {
  customStyle?: CSSStylesProp | CSSStyles;
  description: string;
  id: string;
  label: string;
  setHeight?: (value: number) => void;
}

function SingleAccordion({
  id,
  description,
  label,
  setHeight,
  customStyle,
}: Props) {
  const innerElement = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const { width } = useWindowSize();
  const buttonId = `single-accordion-button-${id}`;
  const panelId = `single-accordion-panel-${id}`;

  const onToggle = () => {
    setIsExpanded((state) => !state);
  };

  const mouseDownHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    onToggle && onToggle();
  };

  const keyUpHandler = (event: React.KeyboardEvent) => {
    if (event.keyCode !== KEYCODES.ENTER && event.keyCode !== KEYCODES.SPACE) {
      return;
    }

    onToggle && onToggle();
  };

  useEffect(() => {
    if (!innerElement.current) {
      setHeight && setHeight(LABEL_INITIAL_HEIGHT);
      return;
    }

    setContainerHeight(
      innerElement.current.offsetHeight + LABEL_INITIAL_HEIGHT,
    );
    setHeight &&
      setHeight(innerElement.current.offsetHeight + LABEL_INITIAL_HEIGHT);
  }, [innerElement, setContainerHeight, width, isExpanded, setHeight]);

  return (
    <div css={[styles.root, customStyle]}>
      <button
        aria-controls={panelId}
        aria-expanded={isExpanded}
        onMouseDown={mouseDownHandler}
        onKeyUp={keyUpHandler}
        id={buttonId}
      >
        <span>{label}</span>
        <span css={styles.buttonIcon}>
          {isExpanded ? (
            <Icon name={ICONS.CHEVRON_UP} />
          ) : (
            <Icon name={ICONS.CHEVRON_DOWN} />
          )}
        </span>
      </button>
      {isExpanded && (
        <div
          id={panelId}
          aria-labelledby={buttonId}
          aria-hidden={!isExpanded}
          role="region"
          css={[isExpanded && { maxHeight: containerHeight }]}
        >
          <div ref={innerElement}>
            <p css={styles.content}>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleAccordion;
