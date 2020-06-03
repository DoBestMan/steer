import { typography } from '~/styles/typography.styles';

import styles from './MomentList.styles';

export interface MomentListItem {
  label: string;
  value: string;
}

interface Props {
  data: Array<MomentListItem>;
}

export function MomentList({ data }: Props) {
  return (
    <ul css={styles.container}>
      {data.map(({ label, value }: MomentListItem) => (
        <li css={styles.item} key={label}>
          <span css={typography.bodyCopy}>{label}</span>
          <span css={[typography.primarySubhead, styles.value]}>{value}</span>
        </li>
      ))}
    </ul>
  );
}

export default MomentList;
