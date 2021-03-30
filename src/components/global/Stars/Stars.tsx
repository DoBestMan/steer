import { useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICON_SIZES, ICONS } from '~/components/global/Icon/Icon.constants';
import StarRating from '~/components/global/Stars/StarRating';
import { useClientType } from '~/hooks/useClientType';
import { COLORS, RATINGS } from '~/lib/constants';
import { percentageFromNumber } from '~/lib/utils/number';
import { randomString } from '~/lib/utils/string';

import styles from './Stars.styles';

export const HALF_WIDTH_STARS = ICON_SIZES.FIVE_STARS.w / 2;

export interface Props {
  bgColor?: string;
  color?: string;
  number: number;
  ssr?: boolean;
  width?: number;
}

function Stars({
  bgColor = COLORS.GLOBAL.GRAY_50,
  number,
  color = COLORS.GLOBAL.ORANGE,
  width,
  ssr = false,
}: Props) {
  const [ratingGradientId, setRatingGradientId] = useState<string>();
  const ratingFillWidth = percentageFromNumber(number, RATINGS.MAX_RATING);
  const { isClient } = useClientType();

  useEffect(() => {
    setRatingGradientId(randomString());
  }, []);

  return (
    <>
      {!isClient && ssr ? (
        <div css={styles.containerServerSide}>
          <StarRating rating={number} width={width} />
        </div>
      ) : (
        <div css={[styles.container, { width: width ? width : 'auto' }]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            css={{ height: 0, width: 0 }}
            focusable="false"
            width="100%"
            height="100%"
            viewBox={`0 0 ${ICON_SIZES.FIVE_STARS.w} ${ICON_SIZES.FIVE_STARS.h}`}
          >
            <linearGradient
              id={ratingGradientId}
              gradientUnits="userSpaceOnUse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset={`${ratingFillWidth}%`} stopColor={color} />
              <stop offset="0%" stopColor={bgColor} />
            </linearGradient>
          </svg>
          <Icon
            css={[
              {
                '--rating-gradient-id': `url(#${ratingGradientId})`,
                width: width ? width : 'auto',
              },
              styles.stars,
            ]}
            name={ICONS.FIVE_STARS}
          />
        </div>
      )}
    </>
  );
}

export default Stars;
