import { useScrollToAnchor } from '~/hooks/useScrollToAnchor';

import InsightsItem, { InsightsItemProps } from './InsightsItem';

interface Props extends InsightsItemProps {
  target: string;
}

function AnchorButton({ target, ...rest }: Props) {
  const { scrollToAnchor } = useScrollToAnchor();

  return (
    <a href={`#${target}`} onClick={scrollToAnchor}>
      <InsightsItem hasAction {...rest} />
    </a>
  );
}

export default AnchorButton;
