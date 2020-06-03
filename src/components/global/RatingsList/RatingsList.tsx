import RatingsBar from '~/components/global/RatingsList/RatingsBar/RatingsBar';

export interface RatingsListItem {
  label: string;
  rating: number;
}

interface Props {
  ratings: Array<RatingsListItem>;
}

export function RatingsList({ ratings }: Props) {
  return (
    <ul>
      {ratings.map(({ label, rating }: RatingsListItem) => (
        <RatingsBar key={label} label={label} rating={rating}></RatingsBar>
      ))}
    </ul>
  );
}
export default RatingsList;
