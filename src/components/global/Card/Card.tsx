import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import { getSrcset } from '~/components/global/Image/Image.utils';
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
      // If image, generate/replace the srcSet based on layout
      if (figure.type === ICON_IMAGE_TYPE.IMAGE && figure.src) {
        figure.srcSet = getSrcset(figure.src, {
          '200w': { width: 200 },
          '300w': { width: 300 },
          '500w': { width: 500 },
          '800w': { width: 800 },
        });
      }

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
      css={[typography.jumboHeadline, styles.root]}
    >
      <GridItem gridColumnL="1/3" gridColumnXL="1/3">
        <div css={[typography.jumboHeadline, styles.decorator]}>
          {decorators}
        </div>
      </GridItem>
      <GridItem gridColumnL="3/6" gridColumnXL="3/6">
        {eyebrow && eyebrowIcon && (
          <div css={[typography.secondaryHeadline, styles.eyebrow]}>
            <span>{eyebrow}</span>
            <Icon name={eyebrowIcon.svgId} css={styles.eyebrowIcon} />
          </div>
        )}
        <p css={[typography.secondaryHeadline, styles.title]}>{title}</p>
        <p css={[typography.bodyCopy, styles.description]}>{body}</p>
        <Link href={link.href} icon={ICONS.CHEVRON_RIGHT}>
          {linkLabel}
        </Link>
      </GridItem>
    </GridItem>
  );
}

export default Card;
