import Image from '~/components/global/Image/Image';
import Modal from '~/components/global/Modal/Modal';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { ui } from '~/lib/utils/ui-dictionary';

import TireImageCarousel from './TireImageCarousel';
import { ImageItemProps } from './TireImageCarouselItem';
import styles from './TireImageZoom.styles';

interface Props {
  activeSlide?: number;
  brand: SiteCatalogBrand;
  handleClose: () => void;
  imageList: ImageItemProps[];
  isModalOpen: boolean;
}

function TireImageZoom({
  activeSlide,
  brand,
  handleClose,
  imageList,
  isModalOpen,
}: Props) {
  const { image, label } = brand;

  return (
    <Modal
      isFullscreen
      contentLabel={ui('pdp.tireImage.modalLabel', { label: brand.label })}
      onClose={handleClose}
      isOpen={isModalOpen}
    >
      <h2 css={styles.brandContainer}>
        {image && (
          <Image
            altText={image.altText}
            responsive
            src={image.src}
            css={styles.brandLogo}
          />
        )}
        <span css={styles.brandLabel}>{label}</span>
      </h2>
      <div css={styles.imageWrap}>
        <TireImageCarousel
          activeSlide={activeSlide}
          imageList={imageList}
          hasThumbs
          isFullscreen
        />
      </div>
    </Modal>
  );
}

export default TireImageZoom;
