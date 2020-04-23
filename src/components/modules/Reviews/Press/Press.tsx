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

function Press(props: Props) {
  return (
    <ul css={styles.container}>
      {props.pressReviews.map((review) => (
        <li css={styles.item} key={review.name}>
          <img css={styles.logo} src={review.imageUrl} alt={review.name} />
          <div css={[styles.copy, typography.bodyCopy]}>{review.quote}</div>
        </li>
      ))}
    </ul>
  );
}

export default Press;
