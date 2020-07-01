import Video, { Props as VideoProps } from '~/components/global/Video/Video';
import { SiteImage } from '~/data/models/SiteImage';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';
import { getWidthFromMaxHeight } from '~/lib/utils/number';

import CarouselImage from './CarouselImage';
import CarouselImageButton from './CarouselImageButton';
import styles from './TireImage.styles';

export type ImageItemProps = {
  image?: SiteImage;
  productImageType?: PRODUCT_IMAGE_TYPES;
  video?: VideoProps;
};

interface Props {
  handleClick?: (index: number) => void;
  handleImageClick: (index: number) => () => void;
  imageItem: ImageItemProps;
  index: number;
  isFullscreen?: boolean;
  maxHeight: number;
}

function TireImageCarouselItem({
  handleClick,
  handleImageClick,
  imageItem,
  index,
  isFullscreen,
  maxHeight,
}: Props) {
  const { image, video } = imageItem;
  const imageWidth =
    image?.width &&
    image?.height &&
    getWidthFromMaxHeight(image.width, image.height, maxHeight);

  return (
    <>
      {image &&
        (handleClick ? (
          <CarouselImageButton
            handleClick={handleImageClick(index)}
            image={image}
            maxHeight={maxHeight}
            imageWidth={imageWidth}
          />
        ) : (
          <CarouselImage image={image} isFullscreen={isFullscreen} />
        ))}

      {video && (
        <Video
          containerStyles={styles.videoContainerStyles}
          videoStyles={styles.videoStyles}
          posterFrame={video.posterFrame}
          sizes={video.sizes}
          youtubeId={video.youtubeId}
        />
      )}
    </>
  );
}

export default TireImageCarouselItem;
