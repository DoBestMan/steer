import createFocusTrap from 'focus-trap';
import {
  forwardRef,
  MutableRefObject,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { NAV_ID } from '~/components/modules/Nav/Nav';

interface Props {
  active?: boolean;
  children: ReactNode;
  shouldFocusOnOpen?: boolean;
  shouldReturnFocus?: boolean;
}

// ref type requires all of these, typecast in `modalRef` because we will only ever pass a MutableRefObject
type RefType =
  | ((instance: HTMLDivElement | null) => void)
  | MutableRefObject<HTMLDivElement | null>
  | null;
function FocusTrap(
  {
    active = false,
    children,
    shouldFocusOnOpen = true,
    shouldReturnFocus = true,
    ...rest
  }: Props,
  ref: RefType,
) {
  const modalRef = ref as MutableRefObject<HTMLDivElement>;
  const [
    focusTrapInstance,
    setFocusTrapInstance,
  ] = useState<null | FocusTrapInstance>(null); // see index.d.ts
  const [
    previouslyFocusedElement,
    setPreviouslyFocusedElement,
  ] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) {
      return;
    }
    setPreviouslyFocusedElement(document.activeElement as HTMLElement);
  }, [active]);

  useEffect(() => {
    if (active) {
      if (modalRef.current && !focusTrapInstance) {
        const focusTrap =
          modalRef.current &&
          createFocusTrap(modalRef.current, {
            clickOutsideDeactivates: true,
            returnFocusOnDeactivate: false,
            onActivate: () => {
              if (shouldFocusOnOpen) {
                return;
              }
              modalRef.current.focus();
            },
            onDeactivate: () => {
              if (shouldReturnFocus) {
                previouslyFocusedElement?.focus();
              } else {
                document.getElementById(NAV_ID)?.focus();
              }
              previouslyFocusedElement && setPreviouslyFocusedElement(null);
            },
          });
        setFocusTrapInstance(focusTrap);
        focusTrap.activate();
      }
    } else {
      if (focusTrapInstance) {
        focusTrapInstance.deactivate();
        setFocusTrapInstance(null);
      }
    }
  }, [
    active,
    modalRef,
    focusTrapInstance,
    previouslyFocusedElement,
    shouldFocusOnOpen,
    shouldReturnFocus,
  ]);

  return (
    <div tabIndex={0} ref={ref} {...rest}>
      {children}
    </div>
  );
}

export default forwardRef(FocusTrap);
