import RatingsBar, {
  Props as RatingsListItem,
} from '~/components/global/RatingsList/RatingsBar/RatingsBar';
import { RATINGS_DISPLAY, RATINGS_THEME } from '~/lib/constants';

interface Props {
  display?: RATINGS_DISPLAY;
  ratings: Array<RatingsListItem>;
  theme?: RATINGS_THEME;
}

export function RatingsList({
  display = RATINGS_DISPLAY.DEFAULT,
  ratings,
  theme = RATINGS_THEME.DARK,
}: Props) {
  return (
    <ul>
      {ratings.map(({ label, rating }) => (
        <RatingsBar
          display={display}
          key={label}
          label={label}
          rating={rating}
          theme={theme}
        ></RatingsBar>
      ))}
    </ul>
  );
}
export default RatingsList;
