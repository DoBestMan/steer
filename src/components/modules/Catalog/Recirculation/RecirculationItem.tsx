import Icon from '~/components/global/Icon/Icon';
import { SiteRecirculationItem } from '~/data/models/SiteCatalogSummaryRecirculation';

import styles from './RecirculationItem.styles';

interface Props {
  handleUpdateResults: (filters: Record<string, string>) => void;
}

function RecirculationItem({
  description,
  icon,
  label,
  siteQueryParams,
  handleUpdateResults,
}: Props & SiteRecirculationItem) {
  function handleClick() {
    handleUpdateResults(siteQueryParams);
  }

  return (
    <li css={styles.item}>
      <button type="button" onClick={handleClick} css={styles.link}>
        <div>
          <h3 css={styles.title}>{label}</h3>
          <p css={styles.description}>{description}</p>
        </div>
        {icon && <Icon css={styles.icon} name={icon.svgId} />}
      </button>
    </li>
  );
}

export default RecirculationItem;
