import { styles } from './StarRating.styles';

const IMAGE_URLS: Record<string, string> = {
  BACKGROUND_STARS: '/static/assets/five-stars-bkg.svg',
  FRONT_STARS: '/static/assets/five-stars.svg',
};
const IMAGE_ALT_TAGS = {
  BACKGROUND_STARS: 'five stars background',
  FRONT_STARTS: 'five stars',
};
const DEFAULT_STAR_WIDTH = 100;

interface StarRatingProps {
  rating: number;
  width?: number;
}

function StarRating({ rating, width }: StarRatingProps) {
  const ratingPercentage = Math.round((rating * 100) / 5);
  const ratingWidth = width || DEFAULT_STAR_WIDTH;
  const containerWidth = { width: ratingWidth };
  const starImageWidth = { maxWidth: ratingWidth, width: ratingWidth };

  return (
    <div aria-hidden="true" css={[styles.container, containerWidth]}>
      <div>
        <img
          css={starImageWidth}
          src={IMAGE_URLS.BACKGROUND_STARS}
          alt={IMAGE_ALT_TAGS.BACKGROUND_STARS}
        />
      </div>
      <div css={styles.frontStars} style={{ width: `${ratingPercentage}%` }}>
        <img
          css={starImageWidth}
          src={IMAGE_URLS.FRONT_STARS}
          alt={IMAGE_ALT_TAGS.FRONT_STARTS}
        />
      </div>
    </div>
  );
}

export default StarRating;
