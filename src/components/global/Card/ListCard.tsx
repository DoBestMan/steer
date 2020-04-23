import styles from './ListCard.styles';

import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage, {
  IconOrImageProps,
} from '~/components/global/IconOrImage/IconOrImage';

interface ListItem {
  href: string;
  image: IconOrImageProps;
  label: string;
}

interface Props {
  cta: string;
  ctaLink: string;
  listItems: ListItem[];
  title: string;
}

function ListCard({ cta, ctaLink, listItems, title }: Props) {
  return (
    <GridItem
      gridColumnS="2/5"
      gridColumnM="2/5"
      gridColumnL="2/7"
      gridColumnXL="2/7"
      isGrid
      css={styles.root}
    >
      <GridItem gridColumnL="1/3" gridColumnXL="1/3">
        <div css={styles.title}>{title}</div>
      </GridItem>
      <GridItem gridColumnL="3/6" gridColumnXL="3/6">
        <ul css={styles.list}>
          {listItems.map(({ href, image, label }) => (
            <li css={styles.listItem} key={label}>
              <div css={styles.content}>
                <Link href={href}>
                  <p>{label}</p>
                </Link>
                <div css={styles.imageContainer}>
                  <div css={styles.image}>
                    <IconOrImage {...image} css={styles.icon} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div css={styles.cta}>
          <Link href={ctaLink} icon={ICONS.CHEVRON_RIGHT}>
            {cta}
          </Link>
        </div>
      </GridItem>
    </GridItem>
  );
}

export default ListCard;
