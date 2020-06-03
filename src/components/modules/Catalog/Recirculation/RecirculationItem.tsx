import Icon from '~/components/global/Icon/Icon';
import BaseLink from '~/components/global/Link/BaseLink';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteLink } from '~/data/models/SiteLink';

import styles from './RecirculationItem.styles';

export interface ItemProps {
  description: string;
  icon?: SiteIcon;
  label: string;
  link: SiteLink;
}

function RecirculationItem({ description, icon, label, link }: ItemProps) {
  return (
    <li css={styles.item}>
      <BaseLink css={styles.link} href={link.href} isExternal={link.isExternal}>
        <div>
          <h3 css={styles.title}>{label}</h3>
          <p css={styles.description}>{description}</p>
        </div>
        {icon && <Icon css={styles.icon} name={icon.svgId} />}
      </BaseLink>
    </li>
  );
}

export default RecirculationItem;
