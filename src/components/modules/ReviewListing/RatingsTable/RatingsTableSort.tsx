import Link from '~/components/global/Link/Link';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './RatingsTableSort.styles';

interface Props {
  resultsCount: number;
}

export default function RatingsTableSort({ resultsCount }: Props) {
  // TODO: Sort will be functional when integrated as it relies on context
  const placeholderSortLabel = 'Top rated';

  return (
    <div css={styles.root}>
      <p css={styles.results}>
        {ui('catalog.filters.results', { number: resultsCount })}
      </p>
      <div css={styles.sort}>
        <p css={styles.sortLabel}>{ui('catalog.filters.sortBy')} </p>
        <Link
          className="dropdown-button"
          theme={THEME.LIGHT}
          as="button"
          aria-expanded={false}
          css={styles.button}
        >
          {placeholderSortLabel}
        </Link>
      </div>
    </div>
  );
}
