import RatingsBar, {
  Props as RatingsListItem,
} from '~/components/global/RatingsList/RatingsBar/RatingsBar';
import { CSSStylesProp, RATINGS_DISPLAY, THEME } from '~/lib/constants';

interface Props {
  customContainerStyles?: CSSStylesProp;
  display?: RATINGS_DISPLAY;
  ratings: Array<RatingsListItem>;
  theme?: THEME;
}

export function RatingsList({
  customContainerStyles,
  display = RATINGS_DISPLAY.DEFAULT,
  ratings,
  theme = THEME.DARK,
}: Props) {
  return (
    <ul css={customContainerStyles}>
      {ratings.map(({ label, value }) => (
        <RatingsBar
          display={display}
          key={label}
          label={label}
          value={value}
          theme={theme}
        ></RatingsBar>
      ))}
    </ul>
  );
}
export default RatingsList;
