import { useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICON_SIZES, ICONS } from '~/components/global/Icon/Icon.constants';
import { COLORS, RATINGS } from '~/lib/constants';
import { percentageFromNumber } from '~/lib/utils/number';
import { randomString } from '~/lib/utils/string';

import styles from './Stars.styles';

interface Props {
  color?: string;
  isSmall?: boolean;
  number: number;
}

function Stars({ number, color = COLORS.GLOBAL.ORANGE, isSmall }: Props) {
  const [ratingGradientId, setRatingGradientId] = useState<string>();
  const ratingFillWidth = percentageFromNumber(number, RATINGS.MAX_RATING);

  useEffect(() => {
    setRatingGradientId(randomString());
  }, []);

  return (
    <div
      css={[
        styles.container,
        { width: isSmall ? ICON_SIZES.FIVE_STARS.w / 2 : 'auto' },
      ]}
    >
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
          <stop offset="0%" stopColor={COLORS.DARK.GRAY_40} />
        </linearGradient>
      </svg>
      <Icon
        css={[
          {
            '--rating-gradient-id': `url(#${ratingGradientId})`,
            width: isSmall ? ICON_SIZES.FIVE_STARS.w / 2 : 'auto',
          },
          styles.stars,
        ]}
        name={ICONS.FIVE_STARS}
      />
    </div>
  );
}

export default Stars;
