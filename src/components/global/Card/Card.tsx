import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import Link from '~/components/global/Link/Link';
import { SiteInsightItemDefault } from '~/data/models/SiteInsightItemDefault';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { typography } from '~/styles/typography.styles';

import styles from './Card.styles';

function Card({
  body,
  eyebrow,
  eyebrowIcon,
  figures,
  link,
  linkLabel,
  title,
}: SiteInsightItemDefault) {
  const decorators = figures?.map((figure, idx) => {
    if (
      figure.type === ICON_IMAGE_TYPE.ICON ||
      figure.type === ICON_IMAGE_TYPE.IMAGE
    ) {
      return (
        <IconOrImage key={idx} widths={[200, 300, 500, 800]} {...figure} />
      );
    }

    if ('value' in figure) {
      return figure.value;
    }

    return;
  });
  return (
    <GridItem
      gridColumnS="2/5"
      gridColumnM="2/5"
      gridColumnL="2/9"
      gridColumnXL="2/7"
      isGrid
      css={[typography.jumboHeadline, styles.root]}
    >
      <GridItem
        css={styles.decoratorContainer}
        gridColumnL="1/4"
        gridColumnXL="1/3"
      >
        <div css={[typography.jumboHeadline, styles.decorator]}>
          {decorators}
        </div>
      </GridItem>
      <GridItem css={styles.cardContent} gridColumnL="4/8" gridColumnXL="3/6">
        {eyebrow && eyebrowIcon && (
          <div css={styles.eyebrow}>
            <span>{eyebrow}</span>
            <Icon name={eyebrowIcon.svgId} css={styles.eyebrowIcon} />
          </div>
        )}
        <h3 css={styles.title}>{title}</h3>
        <p css={[typography.bodyCopy, styles.description]}>{body}</p>
        <Link href={link.href} icon={ICONS.CHEVRON_RIGHT}>
          {linkLabel}
        </Link>
      </GridItem>
    </GridItem>
  );
}

export default Card;
