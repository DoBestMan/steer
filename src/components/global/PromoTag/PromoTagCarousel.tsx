import Carousel from '~/components/global/Carousel/Carousel';

import PromoTag, { PromoTagProps } from './PromoTag';
import styles from './PromoTagCarousel.styles';

interface Props {
  tags: PromoTagProps[];
}

function PromoTagCarousel({ tags }: Props) {
  return (
    <div css={styles.root}>
      <Carousel wrapperClass="promo-tags-wrapper" freeScroll>
        {tags.map((item, idx) => (
          <div css={styles.tag} key={idx}>
            <PromoTag {...item} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default PromoTagCarousel;
