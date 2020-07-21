import Carousel from '~/components/global/Carousel/Carousel';

import { ContentModalProps } from '../Modal/Modal.types';
import PromoTag, { PromoTagProps } from './PromoTag';
import styles from './PromoTagCarousel.styles';

interface Props {
  openDynamicModal: (modalData: ContentModalProps) => void;
  tags: PromoTagProps[];
}

function PromoTagCarousel({ openDynamicModal, tags }: Props) {
  const handlePromoClick = (promoTag: PromoTagProps) => () => {
    if (promoTag.siteDynamicModal) {
      openDynamicModal(promoTag.siteDynamicModal);
    }
  };

  return (
    <div css={styles.root}>
      <Carousel wrapperClass="promo-tags-wrapper" freeScroll>
        {tags.map((item, idx) => (
          <div css={styles.tag} key={idx}>
            <PromoTag {...item} handleClick={handlePromoClick(item)} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default PromoTagCarousel;
