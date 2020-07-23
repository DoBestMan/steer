import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';

interface CarouselImageProps {
  height?: number;
  image: SiteImage;
  width?: number;
}

function CarouselImage({ image, width, height }: CarouselImageProps) {
  return (
    <Image
      altText={image.altText}
      width={width}
      height={height}
      src={image.src}
      responsive
    />
  );
}

export default CarouselImage;
