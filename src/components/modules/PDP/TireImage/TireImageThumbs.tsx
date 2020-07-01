import { SwiperInstance } from 'react-id-swiper';

import Image from '~/components/global/Image/Image';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './TireImage.styles';
import { ImageItemProps } from './TireImageCarouselItem';

interface Props {
  currentIndex: number;
  imageList: ImageItemProps[];
  isFullscreen?: boolean;
  swiper: SwiperInstance;
}

function TireImageThumbs({
  currentIndex,
  imageList,
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
      {imageList.map((imageItem, index) => {
        const { image, video } = imageItem;
        const imageSrc = image?.src || video?.posterFrame || '';
        const altText =
          image?.altText ||
          ui('pdp.tireImage.thumbAltText', { number: index + 1 });

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
            <Image altText={altText} responsive src={imageSrc} />
          </button>
        );
      })}
    </div>
  );
}

export default TireImageThumbs;
