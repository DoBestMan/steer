import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Car from '~/components/global/Car/Car';
import { Cars } from '~/components/global/Car/Car.enums';
import Sticker from '~/components/global/Sticker/Sticker';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';

import { styles } from './CircularIllustrationItem.styles';

export enum TitlePosition {
  'bottom' = 'bottom',
  'top' = 'top',
}

interface Props {
  brand?: SiteCatalogBrand;
  carId?: Cars;
  subTitle: string;
  tagLabel?: string;
  title: string;
  titlePosition?: TitlePosition;
}

function CircularIllustrationItem({
  tagLabel,
  brand,
  carId,
  title,
  subTitle,
  titlePosition = TitlePosition['top'],
}: Props) {
  return (
    <div css={styles.root}>
      <div css={styles.graphic}>
        {tagLabel && (
          <div css={styles.tag}>
            <Sticker label={tagLabel} />
          </div>
        )}
        <div css={styles.circle}>
          {brand && (
            <BrandLogoOrLabel
              brand={brand}
              customContainerStyles={styles.logo}
              widths={[150, 200, 250]}
            />
          )}
          {carId && !brand && <Car carId={carId} css={styles.car} />}
        </div>
      </div>

      <div
        css={[
          titlePosition === 'top' ? styles.title : styles.subTitle,
          styles.titlePositionTop,
        ]}
      >
        {titlePosition === 'top' ? title : subTitle}
      </div>
      <div
        css={[
          titlePosition === 'top' ? styles.subTitle : styles.title,
          styles.titlePositionBottom,
        ]}
      >
        {titlePosition === 'top' ? subTitle : title}
      </div>
    </div>
  );
}

export default CircularIllustrationItem;
