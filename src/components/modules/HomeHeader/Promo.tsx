import styles from './Promo.styles';

import { typography } from '~/styles/typography.styles';

export interface PromoProps {
  countdownEnd: string | null;
  text: string;
}

function Promo({ text, countdownEnd }: PromoProps) {
  return (
    <div css={styles.container}>
      <span css={typography.eyebrow}>{text}</span>
      {countdownEnd && (
        <span css={[typography.smallCopy, styles.countdown]}>
          {countdownEnd}
        </span>
      )}
    </div>
  );
}

export default Promo;
