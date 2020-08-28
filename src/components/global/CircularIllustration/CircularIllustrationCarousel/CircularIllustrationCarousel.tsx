import Carousel from '~/components/global/Carousel/Carousel';
import CircularIllustrationItem from '~/components/global/CircularIllustration/CircularIllustrationItem/CircularIllustrationItem';
import { SiteGraphicTile } from '~/data/models/SiteGraphicTile';
import { CSSStyles } from '~/lib/constants';

import styles from './CircularIllustrationCarousel.styles';

interface Props {
  dataItems: Array<SiteGraphicTile>;
  imageMaxWidthCustomStyles?: CSSStyles;
  itemCustomStyle?: CSSStyles;
}

function CircularIllustrationCarousel({
  dataItems,
  itemCustomStyle,
  imageMaxWidthCustomStyles,
}: Props) {
  return (
    <div css={styles.root}>
      <div css={styles.carousel}>
        {dataItems && (
          <Carousel
            wrapperClass="illustration-carousel"
            params={{ mousewheel: { forceToAxis: true } }}
          >
            {dataItems?.map((dataItem: SiteGraphicTile, index) => (
              <div
                css={[styles.item, itemCustomStyle]}
                key={`car_carousel_${index}`}
              >
                <CircularIllustrationItem
                  {...dataItem}
                  imageMaxWidthCustomStyles={imageMaxWidthCustomStyles}
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default CircularIllustrationCarousel;
