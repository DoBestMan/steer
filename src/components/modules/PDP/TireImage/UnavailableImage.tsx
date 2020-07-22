import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';

import styles from './UnavailableImage.styles';

interface UnavailableImageProps {
  image: SiteImage;
}

function UnavailableImage({ image }: UnavailableImageProps) {
  return (
    <div css={styles.root}>
      <Image
        altText={image.altText}
        src={image.src}
        customStyles={styles.image}
        css={styles.image}
        responsive
      />
      <span css={styles.label}>{image.altText}</span>
    </div>
  );
}

export default UnavailableImage;
