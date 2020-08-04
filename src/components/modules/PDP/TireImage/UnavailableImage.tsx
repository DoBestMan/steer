import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './UnavailableImage.styles';

interface UnavailableImageProps {
  image: SiteImage;
}

function UnavailableImage({ image }: UnavailableImageProps) {
  const label = ui('pdp.tireImage.unavailableImage');

  return (
    <div css={styles.root}>
      <Image
        altText={label}
        src={image.src}
        customContainerStyles={styles.image}
        css={styles.image}
        responsive
      />
      <span css={styles.label}>{label}</span>
    </div>
  );
}

export default UnavailableImage;
