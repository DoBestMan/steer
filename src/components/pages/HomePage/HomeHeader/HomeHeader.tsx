import { useEffect, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Car from '~/components/global/Car/Car';
import { Cars } from '~/components/global/Car/Car.enums';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/Markdown';
import Scenary from '~/components/global/Scenery/Scenery';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import Weather from '~/components/global/Weather/Weather';
import { SiteHero } from '~/data/models/SiteHero';
import { usePreferedReduceMotion } from '~/hooks/usePreferedReduceMotion';
import { TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import {
  animations,
  CAR_ROTATION_DURATION,
  SCENERY_OR_WEATHER_DURATION,
  styles,
} from './HomeHeader.styles';

const ANIMATION_DURATION = TIME.MS2000;
const INTERVAL_CAR_ROTATION = TIME.MS5000;

function HomeHeader({
  body,
  eyebrow,
  sceneryType,
  title,
  vehicleTypes,
  weatherType,
}: SiteHero) {
  // Have at least 1 car
  vehicleTypes =
    vehicleTypes && vehicleTypes.length ? vehicleTypes : [Cars['car--sedan']];

  const [canShow, setCanShow] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentCarIdx, setCurrentCarIdx] = useState<number>(0);
  const hasMotion = usePreferedReduceMotion();

  // Save an itnernal copy to avoid having the weather/scenary being updated while transitioning
  const [internalSceneryType, setInternalSceneryType] = useState<string | null>(
    sceneryType,
  );
  const [internalWeatherType, setInternalWeatherType] = useState<string | null>(
    weatherType,
  );

  const carId = vehicleTypes[currentCarIdx];

  // Default landscape in case data doesn't provide one
  if (!sceneryType) {
    sceneryType = Sceneries['scenery--rural'];
  }

  // Start the animation with a delay
  // So we have time to potentially grab new data
  useEffect(() => {
    // No need to wait
    if (!hasMotion) {
      setCanShow(true);
      return () => {};
    }

    const timer = setTimeout(() => {
      setCanShow(true);

      // we animated only if hasMotion
      setIsAnimating(hasMotion);
    }, TIME.MS1000);

    return () => clearTimeout(timer);
  }, [hasMotion]);

  // Car rotation
  useEffect(() => {
    if (canShow && !isAnimating && hasMotion) {
      const timer = setInterval(() => {
        // Next car to show
        let nextCarIdx = currentCarIdx + 1;
        if (nextCarIdx > vehicleTypes.length - 1) {
          nextCarIdx = 0;
        }

        setCurrentCarIdx(nextCarIdx);
      }, INTERVAL_CAR_ROTATION);

      return () => clearInterval(timer);
    }

    return () => {};
  }, [canShow, isAnimating, currentCarIdx, hasMotion, vehicleTypes]);

  // Internal Scenary copy
  useEffect(() => {
    if (!isAnimating) {
      setInternalSceneryType(sceneryType);
    }
  }, [isAnimating, sceneryType]);

  // Internal Weather copy
  useEffect(() => {
    if (!isAnimating) {
      setInternalWeatherType(weatherType);
    }
  }, [isAnimating, weatherType]);

  function onEntered() {
    setIsAnimating(false);
  }

  return (
    <Transition
      appear
      in={canShow}
      timeout={hasMotion ? ANIMATION_DURATION : 0}
      onEntered={onEntered}
    >
      {(containerTransitionState: TransitionStatus) => {
        const eyebrowStyles = [
          styles.eyebrow,
          hasMotion && animations[`copyElement_${containerTransitionState}`],
        ];

        const titleStyles = [
          typography.jumboHeadline,
          styles.title,
          hasMotion && animations[`copyElement_${containerTransitionState}`],
        ];

        const descriptionStyles = [
          typography.bodyCopy,
          styles.description,
          hasMotion && animations[`copyElement_${containerTransitionState}`],
        ];

        const vehicleContainerStyles = [
          styles.vehicleContainer,
          !hasMotion && styles.vehicleContainerWithoutAnimation,
          hasMotion &&
            animations[`vehicleContainer_${containerTransitionState}`],
        ];

        const weatherStyles = [
          styles.weather,
          hasMotion && animations[`weather_${containerTransitionState}`],
        ];

        const sceneryContainerStyles = [
          styles.sceneryContainer,
          hasMotion &&
            animations[`sceneryContainer_${containerTransitionState}`],
        ];

        return (
          <div css={styles.container}>
            <Grid css={styles.copyContainer}>
              <GridItem gridColumnS="2/6" gridColumnM="2/8" gridColumnXL="2/8">
                {eyebrow && (
                  <div css={eyebrowStyles}>
                    <span css={typography.eyebrow}>{eyebrow}</span>
                  </div>
                )}
                <h1 css={titleStyles}>
                  <Markdown>{title}</Markdown>
                </h1>

                <p css={descriptionStyles}>
                  <Markdown>{body}</Markdown>
                </p>
              </GridItem>
            </Grid>

            <Weather
              weatherID={internalWeatherType}
              css={weatherStyles}
              animate={hasMotion}
            />

            {/* If Scenery changes, nice fade in / fade out */}
            {internalSceneryType && (
              <TransitionGroup css={sceneryContainerStyles}>
                <Transition
                  appear
                  key={internalSceneryType}
                  timeout={hasMotion ? SCENERY_OR_WEATHER_DURATION : 0}
                >
                  {(carTransitionState: TransitionStatus) => {
                    const sceneryStyles = [
                      styles.scenery,
                      hasMotion && animations[`scenery_${carTransitionState}`],
                    ];

                    return (
                      <div css={sceneryStyles}>
                        <Scenary
                          sceneryID={internalSceneryType}
                          animate={hasMotion}
                        />
                      </div>
                    );
                  }}
                </Transition>
              </TransitionGroup>
            )}

            <TransitionGroup css={vehicleContainerStyles}>
              <Transition
                appear
                key={carId}
                timeout={hasMotion ? CAR_ROTATION_DURATION : 0}
              >
                {(carTransitionState: TransitionStatus) => {
                  const vehicleStyles = [
                    styles.vehicle,
                    hasMotion && animations[`vehicle_${carTransitionState}`],
                  ];

                  return (
                    <div css={vehicleStyles}>
                      <Car
                        solid
                        animateWheel={hasMotion}
                        scaleAcrossBreakpoints
                        carId={carId}
                      />
                    </div>
                  );
                }}
              </Transition>
            </TransitionGroup>
          </div>
        );
      }}
    </Transition>
  );
}

export default HomeHeader;
