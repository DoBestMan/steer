import queryString from 'query-string';

import { useScrollToAnchor } from '~/hooks/useScrollToAnchor';
import { getParsedHash } from '~/lib/utils/routes';

import InsightsItem, { InsightsItemProps } from './InsightsItem';

interface Props extends InsightsItemProps {
  target: string;
}

function AnchorButton({ target, ...rest }: Props) {
  const { scrollToAnchor } = useScrollToAnchor();
  const isClient = typeof window !== 'undefined';
  const currentPath = isClient && window.location.href;
  const currentHash = !!currentPath && getParsedHash(currentPath);
  const query = queryString.stringify({
    ...(currentHash || {}),
    anchor: target,
  });

  return (
    <a href={`#${query}`} onClick={scrollToAnchor}>
      <InsightsItem hasAction {...rest} />
    </a>
  );
}

export default AnchorButton;
