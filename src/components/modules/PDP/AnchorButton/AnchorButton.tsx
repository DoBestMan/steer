import queryString from 'query-string';
import { ReactNode } from 'react';

import { useScrollToAnchor } from '~/hooks/useScrollToAnchor';
import { getParsedHash } from '~/lib/utils/routes';

interface Props {
  children: ReactNode;
  offset?: number;
  target: string;
}

function AnchorButton({ children, offset, target }: Props) {
  const { scrollToAnchor } = useScrollToAnchor({ offset });
  const isClient = typeof window !== 'undefined';
  const currentPath = isClient && window.location.href;
  const currentHash = !!currentPath && getParsedHash(currentPath);
  const query = queryString.stringify({
    ...(currentHash || {}),
    anchor: target,
  });

  return (
    <a href={`#${query}`} onClick={scrollToAnchor}>
      {children}
    </a>
  );
}

export default AnchorButton;
