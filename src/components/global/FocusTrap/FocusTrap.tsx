import createFocusTrap from 'focus-trap';
import {
  forwardRef,
  MutableRefObject,
  ReactChild,
  useEffect,
  useState,
} from 'react';

import { TIME } from '~/lib/constants';

interface Props {
  active?: boolean;
  children: ReactChild;
}

// ref type requires all of these, typecast in `modalRef` because we will only ever pass a MutableRefObject
type RefType =
  | ((instance: HTMLDivElement | null) => void)
  | MutableRefObject<HTMLDivElement | null>
  | null;
function FocusTrap(props: Props, ref: RefType) {
  const { active = false, children } = props;
  const modalRef = ref as MutableRefObject<HTMLDivElement>;
  const [
    focusTrapInstance,
    setFocusTrapInstance,
  ] = useState<null | FocusTrapInstance>(null); // see index.d.ts
  const [
    previouslyFocusedElement,
    setPreviouslyFocusedElement,
  ] = useState<null | HTMLElement>(null);
  useEffect(() => {
    if (active) {
      if (modalRef.current && !focusTrapInstance) {
        const focusTrap = modalRef.current && createFocusTrap(modalRef.current);
        setFocusTrapInstance(focusTrap);
        setPreviouslyFocusedElement(document.activeElement as HTMLElement);

        setTimeout(() => {
          focusTrap.activate();
        }, TIME.MS400);
      }
    } else {
      if (focusTrapInstance) {
        focusTrapInstance.deactivate();
        setFocusTrapInstance(null);
      }
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        setPreviouslyFocusedElement(null);
      }
    }
  }, [active, modalRef, focusTrapInstance, previouslyFocusedElement]);

  return <div ref={ref}>{children}</div>;
}

export default forwardRef(FocusTrap);
