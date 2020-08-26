import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Modal from '~/components/global/Modal/Modal';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import { THEME } from '~/lib/constants';
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
  const modalContentLabel = ui('pdp.tireImage.modalLabel', {
    label: brand.label,
  });

  return (
    <Modal
      hasCloseButton={false}
      hasDefaultPadding={false}
      isFullscreen
      contentLabel={modalContentLabel}
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

      <Link
        as="button"
        icon={ICONS.CLOSE}
        aria-label={ui('common.modal.close', { modalContentLabel })}
        onClick={handleClose}
        theme={THEME.LIGHT}
        css={styles.closeButton}
      />

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
