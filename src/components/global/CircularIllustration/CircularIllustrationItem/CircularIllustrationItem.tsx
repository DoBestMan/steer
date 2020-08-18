import Car from '~/components/global/Car/Car';
import Icon from '~/components/global/Icon/Icon';
import Image from '~/components/global/Image/Image';
import Sticker from '~/components/global/Sticker/Sticker';
import { SiteGraphicTile } from '~/data/models/SiteGraphicTile';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import { styles } from './CircularIllustrationItem.styles';

export enum TitlePlacement {
  'bottom' = 'bottom',
  'top' = 'top',
}

export interface CirclularIllustrationProps extends SiteGraphicTile {
  titlePlacement?: TitlePlacement;
}

function CircularIllustrationItem({
  highlight,
  image,
  title,
  byline,
  titlePlacement = TitlePlacement['top'],
}: CirclularIllustrationProps) {
  return (
    <div css={styles.root}>
      <div css={styles.graphic}>
        {highlight && (
          <div css={styles.tag}>
            <Sticker label={highlight} />
          </div>
        )}
        <div css={styles.circle}>
          <div css={styles.logoImage}>
            {image && image.type === ICON_IMAGE_TYPE.IMAGE && (
              <Image {...image} widths={[150, 200, 250]} />
            )}
            {image && image.type === ICON_IMAGE_TYPE.ICON && (
              <Icon name={image.svgId} />
            )}
            {image && image.type === ICON_IMAGE_TYPE.CAR && (
              <Car carId={image.vehicleType} css={styles.car} />
            )}
          </div>
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
    </div>
  );
}

export default CircularIllustrationItem;
