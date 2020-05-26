import createFocusTrap from 'focus-trap';
import {
  forwardRef,
  MutableRefObject,
  ReactNode,
  useEffect,
  useState,
} from 'react';

interface Props {
  active?: boolean;
  children: ReactNode;
}

// ref type requires all of these, typecast in `modalRef` because we will only ever pass a MutableRefObject
type RefType =
  | ((instance: HTMLDivElement | null) => void)
  | MutableRefObject<HTMLDivElement | null>
  | null;
function FocusTrap(props: Props, ref: RefType) {
  const { active = false, children, ...rest } = props;
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

        focusTrap.activate();
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

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}

export default forwardRef(FocusTrap);
