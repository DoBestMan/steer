import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';
import { CSSStyles } from '~/lib/constants';

import styles from './TireImage.styles';

interface CarouselImageProps {
  image: SiteImage;
  isFullscreen?: boolean;
}

function CarouselImage({ image, isFullscreen }: CarouselImageProps) {
  return (
    <Image
      altText={image.altText}
      customStyles={
        [
          styles.imageCustomStyles,
          isFullscreen && styles.imageFullscreen,
        ] as CSSStyles
      }
      src={image.src}
      css={styles.imageStyles}
      responsive
    />
  );
}

export default CarouselImage;
