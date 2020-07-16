import Image from '~/components/global/Image/Image';
import Modal from '~/components/global/Modal/Modal';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import { ui } from '~/lib/utils/ui-dictionary';

import TireImageCarousel from './TireImageCarousel';
import styles from './TireImageZoom.styles';

interface Props {
  activeSlide?: number;
  assetList: SiteProductLine['assetList'];
  brand: SiteCatalogBrand;
  currentIndex: number;
  handleClose: () => void;
  isModalOpen: boolean;
  setCurrentIndex: (index: number) => void;
}

function TireImageZoom({
  brand,
  currentIndex,
  handleClose,
  assetList,
  isModalOpen,
  setCurrentIndex,
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
          currentIndex={currentIndex}
          assetList={assetList}
          hasThumbs
          isFullscreen
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </Modal>
  );
}

export default TireImageZoom;
