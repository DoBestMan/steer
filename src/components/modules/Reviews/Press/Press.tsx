import styles from './Press.styles';

import { typography } from '~/styles/typography.styles';

export interface PressReviewProps {
  imageUrl: string;
  name: string;
  quote: string;
}

interface Props {
  pressReviews: PressReviewProps[];
}

function Press({ pressReviews }: Props) {
  return (
    <ul css={styles.container}>
      {pressReviews.map((review) => (
        <li css={styles.item} key={review.name}>
          <img css={styles.logo} src={review.imageUrl} alt={review.name} />
          <div css={[typography.bodyCopy, styles.copy]}>{review.quote}</div>
        </li>
      ))}
    </ul>
  );
}

export default Press;
