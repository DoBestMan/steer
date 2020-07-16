import { SwiperInstance } from 'react-id-swiper';

import Image from '~/components/global/Image/Image';
import { SiteCatalogProductImageTypeEnum } from '~/data/models/SiteCatalogProductImage';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import { SiteYouTubeVideoTypeEnum } from '~/data/models/SiteYouTubeVideo';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './TireImage.styles';

interface Props {
  assetList: SiteProductLine['assetList'];
  currentIndex: number;
  isFullscreen?: boolean;
  swiper: SwiperInstance;
}

function TireImageThumbs({
  currentIndex,
  assetList,
  isFullscreen,
  swiper,
}: Props) {
  const handleClick = (index: number) => () => {
    return swiper.slideTo(index);
  };

  return (
    <div
      css={[
        styles.thumbsContainer,
        isFullscreen && styles.thumbsContainerFullScreen,
      ]}
    >
      {assetList.map((imageItem, index) => {
        const fallbackAlt = ui('pdp.tireImage.thumbAltText', {
          number: index + 1,
        });

        const src =
          imageItem.type === SiteYouTubeVideoTypeEnum.SiteYouTubeVideo
            ? imageItem.poster.src
            : imageItem.image.src;

        const altText =
          imageItem.type === SiteYouTubeVideoTypeEnum.SiteYouTubeVideo
            ? imageItem.poster.altText
            : imageItem.image.altText;

        return (
          <button
            css={[
              styles.thumb,
              index === currentIndex && styles.thumbActive,
              imageItem.type ===
                SiteCatalogProductImageTypeEnum.SiteCatalogProductImage &&
                styles.imageThumb,
            ]}
            key={`tire-image-thumb-${index}`}
            onClick={handleClick(index)}
          >
            <Image
              altText={altText || fallbackAlt}
              responsive
              src={src || ''}
            />
          </button>
        );
      })}
    </div>
  );
}

export default TireImageThumbs;
