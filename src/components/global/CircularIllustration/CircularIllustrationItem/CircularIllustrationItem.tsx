import Car from '~/components/global/Car/Car';
import Icon from '~/components/global/Icon/Icon';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import Sticker from '~/components/global/Sticker/Sticker';
import { SiteGraphicTile } from '~/data/models/SiteGraphicTile';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { CSSStyles } from '~/lib/constants';

import { styles } from './CircularIllustrationItem.styles';

export enum TitlePlacement {
  'bottom' = 'bottom',
  'top' = 'top',
}

export interface CirclularIllustrationProps extends SiteGraphicTile {
  imageMaxWidthCustomStyles?: CSSStyles;
  titlePlacement?: TitlePlacement;
}

function CircularIllustrationItem({
  highlight,
  link,
  image,
  title,
  byline,
  titlePlacement = TitlePlacement['top'],
  imageMaxWidthCustomStyles = styles.logoImage,
}: CirclularIllustrationProps) {
  return (
    <div css={styles.root}>
      <BaseLink href={link.href} css={styles.baseLink}>
        <div css={styles.graphic}>
          {highlight && (
            <div css={styles.tag}>
              <Sticker label={highlight} />
            </div>
          )}
          <div css={styles.circle}>
            {image && image.type === ICON_IMAGE_TYPE.IMAGE && (
              <div css={imageMaxWidthCustomStyles}>
                <Image {...image} widths={[80, 100, 200]} />
              </div>
            )}
            {image && image.type === ICON_IMAGE_TYPE.ICON && (
              <Icon name={image.svgId} />
            )}
            {image && image.type === ICON_IMAGE_TYPE.CAR && (
              <div css={imageMaxWidthCustomStyles}>
                <Car carId={image.vehicleType} css={styles.car} />
              </div>
            )}
          </div>
        </div>

        <div
          css={[
            titlePlacement === 'top' ? styles.title : styles.byline,
            styles.titlePlacementTop,
          ]}
        >
          {titlePlacement === 'top' ? title : byline}
        </div>
        <div
          css={[
            titlePlacement === 'top' ? styles.byline : styles.title,
            styles.titlePlacementBottom,
          ]}
        >
          {titlePlacement === 'top' ? byline : title}
        </div>
      </BaseLink>
    </div>
  );
}

export default CircularIllustrationItem;
