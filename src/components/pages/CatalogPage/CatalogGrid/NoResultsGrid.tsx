import { ui } from '~/lib/utils/ui-dictionary';

import styles from './NoResultsGrid.styles';

export default function NoResultsGrid() {
  return (
    <div css={styles.root}>
      <h2 css={styles.title}>{ui('catalog.noResults.title')}</h2>
      <p css={styles.text}>
        {ui('catalog.noResults.info')}
        <br />
        {ui('catalog.noResults.adjustSelection')}
      </p>
    </div>
  );
}
