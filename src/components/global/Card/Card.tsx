import styles from './Card.styles';

import IconOrImage from '../IconOrImage/IconOrImage';

import { COLORS } from '~/lib/constants';

import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import { SiteInsightItemDefault } from '~/data/models/SiteInsightItemDefault';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

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
      return <IconOrImage key={idx} {...figure} />;
    }

    return figure.value;
  });
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
        <div css={styles.decorator}>{decorators}</div>
      </GridItem>
      <GridItem gridColumnL="3/6" gridColumnXL="3/6">
        {eyebrow && eyebrowIcon && (
          <div css={styles.eyebrow}>
            <span>{eyebrow}</span>
            <Icon
              fill={COLORS.GLOBAL.ORANGE}
              name={eyebrowIcon.svgId}
              css={styles.eyebrowIcon}
            />
          </div>
        )}
        <p css={styles.title}>{title}</p>
        <p css={styles.description}>{body}</p>
        <Link href={link.href} icon={ICONS.CHEVRON_RIGHT}>
          {linkLabel}
        </Link>
      </GridItem>
    </GridItem>
  );
}

export default Card;
