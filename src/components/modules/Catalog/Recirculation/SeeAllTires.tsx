import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './SeeAllTires.styles';

interface Props {
  handleUpdateResults: (filters: Record<string, string>) => void;
  totalResults?: number;
}

function SeeAllTires({ handleUpdateResults, totalResults = 0 }: Props) {
  function handleSeeMore() {
    handleUpdateResults({ skipGroups: 'true' });
  }
  return (
    <div css={styles.root}>
      <button type="button" onClick={handleSeeMore}>
        <h3 css={styles.title}>
          <span>
            {ui('catalog.recirculation.seeAllTires', { number: totalResults })}
          </span>
          <Icon name={ICONS.CHEVRON_RIGHT} />
        </h3>
      </button>
      <p css={styles.description}>{ui('catalog.recirculation.allOfCatalog')}</p>
    </div>
  );
}

export default SeeAllTires;
