import {
  Children,
  createRef,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { KEYCODES } from '~/lib/constants';

import styles from './Tabs.styles';

interface Props {
  children: ReactNode;
  id: string; // To prevent duplicated ids (a11y)
  label?: string;
  tabsLabels: string[];
}

function Tabs({ tabsLabels, label, children, id }: Props) {
  const [currentTab, setCurrentTab] = useState(0);
  const [focusTab, setFocusTab] = useState(0);
  const [tabsRefs, setTabsRefs] = useState<RefObject<HTMLButtonElement>[]>([]);

  const focusHandler = useCallback(
    (idx: number) => () => {
      setFocusTab(idx);
    },
    [setFocusTab],
  );

  const mouseDownHandler = useCallback(
    (idx: number) => (event: React.MouseEvent) => {
      event.preventDefault();

      setCurrentTab(idx);
    },
    [setCurrentTab],
  );

  const keyUpHandler = useCallback(
    (idx: number) => (event: React.KeyboardEvent) => {
      let nextTabIndex;
      switch (event.keyCode) {
        case KEYCODES.ENTER:
        case KEYCODES.SPACE:
          setCurrentTab(idx);
          break;

        case KEYCODES.ARROW_RIGHT:
          nextTabIndex =
            focusTab < tabsLabels.length - 1
              ? focusTab + 1
              : tabsLabels.length - 1;
          tabsRefs[nextTabIndex].current?.focus();
          break;

        case KEYCODES.ARROW_LEFT:
          nextTabIndex = focusTab > 0 ? focusTab - 1 : 0;
          tabsRefs[nextTabIndex].current?.focus();
          break;

        case KEYCODES.HOME:
          nextTabIndex = 0;
          tabsRefs[nextTabIndex].current?.focus();
          break;

        case KEYCODES.END:
          nextTabIndex = tabsLabels.length - 1;
          tabsRefs[nextTabIndex].current?.focus();
          break;

        default:
          break;
      }
    },
    [setCurrentTab, tabsLabels, tabsRefs, focusTab],
  );

  useEffect(() => {
    if (!tabsLabels.length) {
      return;
    }

    setTabsRefs(Array.from(Array(tabsLabels.length)).map(() => createRef()));
  }, [tabsLabels]);

  const getIds = (idx: number) => ({
    buttonId: `tab-button-${id}-${idx}`,
    panelId: `tab-panel-${id}-${idx}`,
  });

  return (
    <>
      <div role="tablist" aria-label={label} css={styles.tabs}>
        {tabsLabels.map((label, idx) => {
          const { buttonId, panelId } = getIds(idx);

          return (
            <button
              key={idx}
              ref={tabsRefs[idx]}
              role="tab"
              aria-selected={currentTab === idx}
              aria-controls={panelId}
              id={buttonId}
              tabIndex={currentTab === idx ? undefined : -1}
              onMouseDown={mouseDownHandler(idx)}
              onKeyUp={keyUpHandler(idx)}
              onFocus={focusHandler(idx)}
              css={styles.tabButton}
            >
              {label}
            </button>
          );
        })}
      </div>
      {Children.map(children, (child, idx) => {
        const { buttonId, panelId } = getIds(idx);

        return (
          <div
            key={idx}
            role="tabpanel"
            id={panelId}
            aria-labelledby={buttonId}
            aria-hidden={currentTab !== idx}
            css={styles.panel}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}

export default Tabs;
