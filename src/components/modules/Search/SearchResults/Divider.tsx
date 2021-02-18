import styles from './SearchResults.styles';

function Divider() {
  return (
    <div css={styles.divider}>
      <span css={styles.dividerLabel}>OR</span>
    </div>
  );
}

export default Divider;
