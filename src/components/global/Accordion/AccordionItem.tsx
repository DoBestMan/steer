import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/Markdown';
import { useWindowSize } from '~/hooks/useWindowSize';
import { KEYCODES, SPACING, THEME } from '~/lib/constants';
import { MARKDOWN_PRIMITIVES } from '~/lib/constants/markdown';

import styles, { tStyles } from './AccordionItem.styles';

interface Props {
  children?: ReactNode;
  content?: string;
  id: string;
  isExpanded?: boolean;
  label: string;
  linkTarget?: string;
  onToggle?: () => void;
  theme?: THEME.LIGHT | THEME.DARK;
  value?: string;
}

function AccordionItem({
  id,
  children,
  content,
  label,
  value,
  onToggle,
  isExpanded,
  linkTarget,
  theme = THEME.DARK,
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

  const hasContent = content || children;

  return (
    <>
      <button
        aria-controls={panelId}
        aria-expanded={isExpanded}
        id={buttonId}
        onMouseDown={mouseDownHandler}
        onKeyUp={keyUpHandler}
        css={[
          styles.button,
          tStyles[theme].button,
          !hasContent && styles.buttonNoContent,
        ]}
      >
        <span css={styles.buttonLabel}>{label}</span>
        {value && <span css={styles.buttonValue}>{value}</span>}
        <span
          css={[styles.buttonIcon, isExpanded && styles.buttonIconExpanded]}
        >
          {hasContent && <Icon name={ICONS.CHEVRON_DOWN} />}
        </span>
      </button>
      {hasContent && (
        <div
          id={panelId}
          aria-labelledby={buttonId}
          aria-hidden={!isExpanded}
          role="region"
          css={[
            styles.contentContainer,
            tStyles[theme].contentContainer,
            isExpanded && { maxHeight: containerHeight + SPACING.SIZE_20 },
          ]}
        >
          <div ref={innerElement} css={styles.contentInnerContent}>
            {children}
            {content && (
              <Markdown
                css={[styles.markdown, tStyles[theme].markdown]}
                linkTarget={linkTarget}
                allowedTypes={MARKDOWN_PRIMITIVES}
                unwrapDisallowed
              >
                {content}
              </Markdown>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AccordionItem;
