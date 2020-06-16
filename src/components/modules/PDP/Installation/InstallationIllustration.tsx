import Car from '~/components/global/Car/Car';
import { STROKE_WIDTH as CAR_STROKE_WIDTH } from '~/components/global/Car/Car.constants';
import { CARS } from '~/components/global/Car/CarDetails.constants';
import Scenary from '~/components/global/Scenery/Scenery';
import { SCENERIES } from '~/components/global/Scenery/Scenery.constants';
import { COLORS } from '~/lib/constants';

import { Props as InputProps } from './Installation';
import styles from './InstallationIllustration.styles';

interface Props extends Pick<InputProps, 'carID' | 'sceneryID'> {
  animateIn?: boolean;
}

const carScale = 0.8;

function InstallationAnimation({
  carID = CARS.AUDI_A6,
  sceneryID = SCENERIES.URBAN,
  animateIn,
  ...rest
}: Props) {
  return (
    <div css={styles.root} {...rest}>
      <Scenary
        sceneryID={sceneryID}
        css={[styles.scenery, animateIn && styles.sceneryAnimate]}
      />
      <div css={[styles.shop, animateIn && styles.shopAnimate]} />
      <Car
        carId={carID}
        scale={carScale}
        solid
        solidColor={COLORS.GLOBAL.WHITE}
        strokeWidth={CAR_STROKE_WIDTH / carScale}
        css={[styles.car, animateIn && styles.carAnimate]}
      />
    </div>
  );
}

export default InstallationAnimation;
