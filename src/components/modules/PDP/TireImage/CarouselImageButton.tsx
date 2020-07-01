import { SiteImage } from '~/data/models/SiteImage';
import { ui } from '~/lib/utils/ui-dictionary';

import CarouselImage from './CarouselImage';
import styles from './TireImage.styles';

interface Props {
  handleClick: () => void;
  image: SiteImage;
  imageWidth?: number;
  maxHeight: number;
}

function CarouselImageButton({
  handleClick,
  image,
  maxHeight,
  imageWidth,
}: Props) {
  return (
    <button
      aria-label={ui('pdp.tireImage.imageZoomButton', { label: image.altText })}
      onClick={handleClick}
      type="button"
      css={[
        styles.imageButton,
        {
          height: maxHeight,
          width: imageWidth,
        },
      ]}
    >
      <CarouselImage image={image} />
    </button>
  );
}

export default CarouselImageButton;
