import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';
import { LOADING_OPTIONS } from '~/lib/constants';

interface CarouselImageProps {
  height?: number;
  image: SiteImage;
  width?: number;
}

function CarouselImage({ image, width, height }: CarouselImageProps) {
  return (
    <Image
      loading={LOADING_OPTIONS.EAGER}
      altText={image.altText}
      width={width}
      height={height}
      src={image.src}
      responsive
    />
  );
}

export default CarouselImage;
