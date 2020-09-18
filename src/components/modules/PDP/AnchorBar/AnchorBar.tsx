import {
  Anchor,
  ANCHORS,
} from '~/components/pages/ProductDetail/mappers/anchorList';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import AnchorButton from '../AnchorButton/AnchorButton';
import styles from './AnchorBar.styles';

interface Props {
  anchorList: Anchor[];
}

function AnchorBar({ anchorList }: Props) {
  const { greaterThan } = useBreakpoints();

  // Remove the insights anchor link on large breakpoint and above.
  let anchors = [...anchorList];
  if (greaterThan.M) {
    anchors = anchors.filter(
      (anchorItem) => anchorItem.anchor !== ANCHORS.INSIGHTS_ANCHOR,
    );
  }

  return (
    <div css={styles.container}>
      {anchors.map(({ anchor, label, offset }) => (
        <AnchorButton key={anchor} offset={offset} target={anchor}>
          <div css={styles.label}>{label}</div>
        </AnchorButton>
      ))}
    </div>
  );
}

export default AnchorBar;
