import { Cars } from '~/components/global/Car/Car.enums';
import Carousel from '~/components/global/Carousel/Carousel';
import CircularIllustrationItem, {
  TitlePosition,
} from '~/components/global/CircularIllustration/CircularIllustrationItem/CircularIllustrationItem';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';

import styles from './CircularIllustrationCarousel.styles';

export interface CarProps {
  id: Cars;
  subTitle: string;
  title: string;
}

interface Props {
  cars: Array<CarProps>;
  subTitle?: string;
  title: string;
}

function CarCarousel({ cars, title, subTitle }: Props) {
  return (
    <Grid css={styles.root}>
      <GridItem gridColumnL={'3/end'}>
        <div css={styles.titleContainer}>
          <h2 css={styles.title}>{title}</h2>
          {subTitle && <p css={styles.subTitle}>{subTitle}</p>}
        </div>
      </GridItem>

      <GridItem fullbleed css={styles.carousel}>
        <Carousel>
          {cars.map((car, index) => (
            <div css={styles.carContainer} key={`car_carousel_${index}`}>
              <CircularIllustrationItem
                carId={car.id}
                title={car.title}
                subTitle={car.subTitle}
                titlePosition={TitlePosition['bottom']}
              />
            </div>
          ))}
        </Carousel>
      </GridItem>
    </Grid>
  );
}

export default CarCarousel;
