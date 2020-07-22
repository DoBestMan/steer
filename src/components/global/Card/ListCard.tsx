import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import Link from '~/components/global/Link/Link';
import { SiteInsightItemList } from '~/data/models/SiteInsightItemList';
import { isVehicleSvg } from '~/lib/utils/icon';

import styles from './ListCard.styles';

function ListCard({ items, more, title }: SiteInsightItemList) {
  return (
    <GridItem
      gridColumnS="2/5"
      gridColumnM="2/5"
      gridColumnL="2/9"
      gridColumnXL="2/7"
      isGrid
      css={styles.root}
    >
      <GridItem gridColumnL="1/4" gridColumnXL="1/3">
        <h2 css={styles.title}>{title}</h2>
      </GridItem>
      <GridItem gridColumnL="4/8" gridColumnXL="3/6" css={styles.cardContent}>
        <ul css={styles.list}>
          {items.map(({ icon, label, link }) => (
            <li css={styles.listItem} key={label}>
              <Link href={link.href}>
                <p>{label}</p>
              </Link>
              <div css={styles.imageContainer}>
                <span
                  css={[
                    styles.image,
                    isVehicleSvg(icon) && styles.imageVehicle,
                  ]}
                >
                  <IconOrImage {...icon} css={styles.icon} />
                </span>
              </div>
            </li>
          ))}
        </ul>
        {more && (
          <div css={styles.cta}>
            <Link href={more.link.href} icon={ICONS.CHEVRON_RIGHT}>
              {more.label}
            </Link>
          </div>
        )}
      </GridItem>
    </GridItem>
  );
}

export default ListCard;
