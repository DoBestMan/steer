import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import Link from '~/components/global/Link/Link';
import { SiteMenuBrowseGroupItem } from '~/data/models/SiteMenuBrowseGroupItem';
import { THEME } from '~/lib/constants';
import { isVehicleSvg } from '~/lib/utils/icon';
import { typography } from '~/styles/typography.styles';

import styles from './BrowseTires.styles';
import Flair from './Flair';

interface Props extends SiteMenuBrowseGroupItem {
  focusRef?: (span: HTMLSpanElement) => void;
}

function BrowseTiresGroupItem({ header, items, more, focusRef }: Props) {
  return (
    <div css={[styles.categoryList, header?.icon && styles.iconOffset]}>
      {header && (
        <div css={[typography.eyebrow, styles.listTitle]}>
          {header.title}
          {header.icon && (
            <span css={styles.image}>
              <IconOrImage {...header.icon} />
            </span>
          )}
        </div>
      )}
      <ul css={[styles.list, !header && styles.alignList]}>
        {items.map((item, idx) => (
          <li key={item.label} css={styles.listItem}>
            <span ref={(!idx && focusRef) || null} css={styles.linkLabel}>
              <Link theme={THEME.LIGHT} href={item.link.href} css={styles.link}>
                {item.label}
              </Link>
              {item.flair && <Flair {...item.flair} css={styles.selected} />}
            </span>
            <div css={styles.imageContainer}>
              {item.icon && (
                <span
                  css={[
                    styles.image,
                    isVehicleSvg(item.icon) && styles.imageVehicle,
                  ]}
                >
                  <IconOrImage {...item.icon} />
                </span>
              )}
            </div>
          </li>
        ))}
        {more && (
          <li css={styles.listItem}>
            <Link theme={THEME.LIGHT} href={more.link.href} css={styles.link}>
              {more.label}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default BrowseTiresGroupItem;
