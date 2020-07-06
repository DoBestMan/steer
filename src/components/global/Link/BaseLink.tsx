import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';

import { useBaseLinkProps, UseBaseLinkProps } from './BaseLink.hooks';

export interface BaseLinkProps extends UseBaseLinkProps {
  children?: ReactNode;
  onClick?: MouseEventHandler;
  onFocus?: () => void;
}

// Wrapper for Next's Link component to parse various combinations
// of absolute, relative, external, and internal links
function BaseLink({ children, href, isExternal, ...rest }: BaseLinkProps) {
  const {
    as,
    externalProps,
    finalHref,
    prefetch,
    isInternal,
  } = useBaseLinkProps({
    href,
    isExternal,
  });
  return (
    <Link href={finalHref} as={as} prefetch={prefetch} passHref>
      <a
        href={!isInternal ? finalHref : undefined}
        {...externalProps}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}

export default BaseLink;
