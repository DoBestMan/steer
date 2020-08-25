import Car from '~/components/global/Car/Car';
import { STROKE_WIDTH as CAR_STROKE_WIDTH } from '~/components/global/Car/Car.constants';
import { CARS } from '~/components/global/Car/CarDetails.constants';
import Scenary from '~/components/global/Scenery/Scenery';
import { SCENERIES } from '~/components/global/Scenery/Scenery.constants';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { COLORS } from '~/lib/constants';

import { InstallationProps } from './Installation';
import styles from './InstallationIllustration.styles';

interface Props extends Pick<InstallationProps, 'vehicleType' | 'sceneryType'> {
  animateIn?: boolean;
}

function InstallationAnimation({
  vehicleType = CARS.AUDI_A6,
  sceneryType = SCENERIES.URBAN,
  animateIn,
  ...rest
}: Props) {
  const { lessThan } = useBreakpoints();
  const carScale = lessThan.XL ? 0.8 : 1;

  return (
    <div css={styles.root} {...rest}>
      <Scenary
        sceneryID={sceneryType}
        css={[styles.scenery, animateIn && styles.sceneryAnimate]}
      />
      <div css={[styles.shop, animateIn && styles.shopAnimate]} />
      <Car
        carId={vehicleType}
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
