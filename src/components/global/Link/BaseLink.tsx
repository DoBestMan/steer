import Link from 'next/link';
import { ReactNode } from 'react';

import { useBaseLinkProps, UseBaseLinkProps } from './BaseLink.hooks';

interface Props extends UseBaseLinkProps {
  children: ReactNode;
}

// Wrapper for Next's Link component to parse various combinations
// of absolute, relative, external, and internal links
function BaseLink({ children, href, isExternal, ...rest }: Props) {
  const { as, externalProps, finalHref, prefetch } = useBaseLinkProps({
    href,
    isExternal,
  });
  return (
    <Link href={finalHref} as={as} prefetch={prefetch}>
      <a href={finalHref} {...externalProps} {...rest}>
        {children}
      </a>
    </Link>
  );
}

export default BaseLink;
