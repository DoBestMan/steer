import Link from 'next/link';
import {
  forwardRef,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  TouchEventHandler,
} from 'react';

import { useBaseLinkProps, UseBaseLinkProps } from './BaseLink.hooks';

export interface BaseLinkProps extends UseBaseLinkProps {
  children?: ReactNode;
  onClick?: MouseEventHandler;
  onFocus?: () => void;
  onTouchStart?: TouchEventHandler;
}

type RefType =
  | ((instance: HTMLAnchorElement | null) => void)
  | MutableRefObject<HTMLAnchorElement | null>
  | null;

// Wrapper for Next's Link component to parse various combinations
// of absolute, relative, external, and internal links
function BaseLink(
  {
    children,
    href,
    isExternal,
    routeQueryParamOptions,
    ...rest
  }: BaseLinkProps,
  ref: RefType,
) {
  const {
    as,
    externalProps,
    finalHref,
    prefetch,
    isInternal,
  } = useBaseLinkProps({
    href,
    isExternal,
    routeQueryParamOptions,
  });
  return (
    <Link href={finalHref} as={as} prefetch={prefetch} passHref>
      <a
        href={!isInternal ? href : undefined}
        {...externalProps}
        {...rest}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
      >
        {children}
      </a>
    </Link>
  );
}

export default forwardRef(BaseLink);
