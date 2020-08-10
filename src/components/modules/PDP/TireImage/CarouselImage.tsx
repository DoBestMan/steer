import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';
import { LOADING_OPTIONS } from '~/lib/constants';

import styles from './TireImage.styles';

interface CarouselImageProps {
  height?: number;
  image: SiteImage;
  width?: number;
}

function CarouselImage({ image, width, height }: CarouselImageProps) {
  return (
    <Image
      altText={image.altText}
      customContainerStyles={styles.imageComponentContainer}
      height={height}
      loading={LOADING_OPTIONS.EAGER}
      src={image.src}
      width={width}
    />
  );
}

export default CarouselImage;
