import { SiteImage } from '~/data/models/SiteImage';
import { ui } from '~/lib/utils/ui-dictionary';

import CarouselImage from './CarouselImage';

interface Props {
  handleClick: () => void;
  height?: number;
  image: SiteImage;
  width?: number;
}

function CarouselImageButton({ handleClick, height, image, width }: Props) {
  return (
    <button
      aria-label={ui('pdp.tireImage.imageZoomButton', { label: image.altText })}
      onClick={handleClick}
      type="button"
      css={[
        {
          height,
          maxWidth: '100%',
          width,
        },
      ]}
      tabIndex={-1}
    >
      <CarouselImage image={image} height={height} width={width} />
    </button>
  );
}

export default CarouselImageButton;
