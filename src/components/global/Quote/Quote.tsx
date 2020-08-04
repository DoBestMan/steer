import styles from '~/components/global/Quote/Quote.styles';
import { typography } from '~/styles/typography.styles';

export interface QuoteProps {
  byline?: string;
  quote: string;
}
function Quote({ byline, quote }: QuoteProps) {
  return (
    <blockquote css={styles.quoteContainer}>
      <p css={[styles.keyPoint, typography.largeCopy]}>{quote}</p>
      {byline && (
        <footer css={[styles.byline, typography.smallCopyTight]}>
          {byline}
        </footer>
      )}
    </blockquote>
  );
}

export default Quote;
