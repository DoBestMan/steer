import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { NodeType } from 'react-markdown';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/Markdown';
import { useWindowSize } from '~/hooks/useWindowSize';
import { KEYCODES } from '~/lib/constants';

import styles from './AccordionItem.styles';

interface Props {
  children?: ReactNode;
  content?: string;
  id: string;
  isExpanded?: boolean;
  label: string;
  onToggle?: () => void;
  value?: string;
}

// Allow only the simplest markdown to prevent unexpected markups
const markdownAllowedTypes: NodeType[] = [
  'root',
  'text',
  'break',
  'paragraph',
  'strong',
  'emphasis',
  'link',
];

function AccordionItem({
  id,
  children,
  content,
  label,
  value,
  onToggle,
  isExpanded,
}: Props) {
  const [containerHeight, setContainerHeight] = useState(0);
  const innerElement = useRef<HTMLDivElement | null>(null);
  const { width } = useWindowSize();
  const buttonId = `accordion-button-${id}`;
  const panelId = `accordion-panel-${id}`;

  const mouseDownHandler = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();

      onToggle && onToggle();
    },
    [onToggle],
  );

  const keyUpHandler = useCallback(
    (event: React.KeyboardEvent) => {
      if (
        event.keyCode !== KEYCODES.ENTER &&
        event.keyCode !== KEYCODES.SPACE
      ) {
        return;
      }

      onToggle && onToggle();
    },
    [onToggle],
  );

  useEffect(() => {
    if (!innerElement.current) {
      return;
    }

    setContainerHeight(innerElement.current.offsetHeight);
  }, [innerElement, setContainerHeight, width, content, isExpanded]);

  return (
    <>
      <button
        aria-controls={panelId}
        aria-expanded={isExpanded}
        id={buttonId}
        onMouseDown={mouseDownHandler}
        onKeyUp={keyUpHandler}
        css={styles.button}
      >
        <span css={styles.buttonLabel}>{label}</span>
        {value && <span css={styles.buttonValue}>{value}</span>}
        <Icon
          name={ICONS.CHEVRON_DOWN}
          css={[styles.buttonIcon, isExpanded && styles.buttonIconExpanded]}
        />
      </button>
      <div
        id={panelId}
        aria-labelledby={buttonId}
        aria-hidden={!isExpanded}
        role="region"
        css={[
          styles.contentContainer,
          isExpanded && { maxHeight: containerHeight },
        ]}
      >
        <div ref={innerElement} css={styles.contentInnerContent}>
          {children}
          {content && (
            <Markdown
              css={styles.markdown}
              linkTarget="_blank"
              allowedTypes={markdownAllowedTypes}
              unwrapDisallowed
            >
              {content}
            </Markdown>
          )}
        </div>
      </div>
    </>
  );
}

export default AccordionItem;
