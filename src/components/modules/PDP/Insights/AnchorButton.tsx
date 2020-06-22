import { useScrollToAnchor } from '~/hooks/useScrollToAnchor';

import InsightsItem, { Props as ItemProps } from './InsightsItem';

interface Props extends ItemProps {
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
