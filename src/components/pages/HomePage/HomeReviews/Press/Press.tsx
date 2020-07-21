import Image from '~/components/global/Image/Image';
import { typography } from '~/styles/typography.styles';

import styles from './Press.styles';

const pressReviews = [
  {
    logoSrc: '/static/assets/homepage/press/inc.png',
    name: 'Inc. Magazine',
    quote: 'Fastest-growing',
  },
  {
    logoSrc: '/static/assets/homepage/press/forbes.png',
    name: 'Forbes',
    quote: 'Innovative',
  },
  {
    logoSrc: '/static/assets/homepage/press/tire-business.png',
    name: 'Tire Business',
    quote: 'A new way',
  },
];

function Press() {
  return (
    <ul css={styles.container}>
      {pressReviews.map((review) => (
        <li css={styles.item} key={review.name}>
          <Image css={styles.logo} src={review.logoSrc} altText={review.name} />
          <div css={[typography.bodyCopy, styles.copy]}>{review.quote}</div>
        </li>
      ))}
    </ul>
  );
}

export default Press;
