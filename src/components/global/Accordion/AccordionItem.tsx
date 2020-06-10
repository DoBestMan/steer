import { useCallback, useEffect, useRef, useState } from 'react';
import { NodeType } from 'react-markdown';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/Markdown';
import { useWindowSize } from '~/hooks/useWindowSize';
import { KEYCODES } from '~/lib/constants';

import styles from './AccordionItem.styles';

interface Props {
  content: string;
  id: string;
  title: string;
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

function AccordionItem({ id, content, title }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const innerElement = useRef<HTMLDivElement | null>(null);
  const { width } = useWindowSize();
  const buttonId = `accordion-button-${id}`;
  const panelId = `accordion-panel-${id}`;

  const toggleIsExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsExpanded]);

  const mouseDownHandler = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();

      toggleIsExpanded();
    },
    [toggleIsExpanded],
  );

  const keyUpHandler = useCallback(
    (event: React.KeyboardEvent) => {
      if (
        event.keyCode !== KEYCODES.ENTER &&
        event.keyCode !== KEYCODES.SPACE
      ) {
        return;
      }

      toggleIsExpanded();
    },
    [toggleIsExpanded],
  );

  useEffect(() => {
    if (!innerElement.current) {
      return;
    }

    setContainerHeight(innerElement.current.offsetHeight);
  }, [innerElement, setContainerHeight, width, content, isExpanded]);

  return (
    <div css={styles.container}>
      <button
        aria-controls={panelId}
        aria-expanded={isExpanded}
        id={buttonId}
        onMouseDown={mouseDownHandler}
        onKeyUp={keyUpHandler}
        css={styles.button}
      >
        <span>{title}</span>
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
        <div ref={innerElement}>
          <Markdown
            linkTarget="_blank"
            allowedTypes={markdownAllowedTypes}
            unwrapDisallowed
          >
            {content}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

export default AccordionItem;
