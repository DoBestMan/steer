import { SwiperInstance } from 'react-id-swiper';

import Image from '~/components/global/Image/Image';
import { Props as VideoProps } from '~/components/global/Video/Video';
import { SiteImage } from '~/data/models/SiteImage';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

import styles from './TireImage.styles';

interface Props {
  currentIndex: number;
  imageList: Array<{
    image?: SiteImage;
    productImageType?: PRODUCT_IMAGE_TYPES;
    video?: VideoProps;
  }>;
  swiper: SwiperInstance;
}

function TireImageThumbs({ currentIndex, imageList, swiper }: Props) {
  const handleClick = (index: number) => () => {
    return swiper.slideTo(index);
  };

  return (
    <div css={styles.thumbsContainer}>
      {imageList.map((imageItem, index) => {
        const { image, video } = imageItem;
        const imageSrc = image?.src || video?.posterFrame || '';

        return (
          <button
            css={[
              styles.thumb,
              index === currentIndex && styles.thumbActive,
              image && styles.imageThumb,
            ]}
            key={`tire-image-thumb-${index}`}
            onClick={handleClick(index)}
          >
            <Image altText={'image.altText'} responsive src={imageSrc} />
          </button>
        );
      })}
    </div>
  );
}

export default TireImageThumbs;
