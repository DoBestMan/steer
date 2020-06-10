import { useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import MomentList, {
  MomentListItem,
} from '~/components/global/MomentList/MomentList';
import { Props as RatingsListItem } from '~/components/global/RatingsList/RatingsBar/RatingsBar';
import RatingsList from '~/components/global/RatingsList/RatingsList';
import Stars from '~/components/global/Stars/Stars';
import { truncateText } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { layout } from '~/styles/layout.styles';

import styles from './ReviewCard.styles';

export interface ReviewCardProps {
  body: string;
  car?: string;
  date: string;
  id: string;
  isVerified?: boolean;
  location?: string;
  momentList?: Array<MomentListItem>;
  ratingStars: number;
  ratings?: Array<RatingsListItem>;
  title: string;
}

function ReviewCard({
  body,
  car,
  date,
  isVerified,
  location,
  momentList,
  ratings,
  ratingStars,
  title,
}: ReviewCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const formattedBody = isCollapsed
    ? truncateText(body, 140, ui('common.ellipsis'))
    : body;

  function toggleCollapsed() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <article css={styles.container}>
      <div css={styles.ratingTopContainer}>
        <span css={styles.title}>{title}</span>
        <Stars number={ratingStars} isSmall />
      </div>
      <div css={[layout.container, layout.centeredHorizontal]}>
        <div css={styles.customerInfo}>
          {!!car && <span>{car}</span>}
          {!!location && <span>{location}</span>}
          {isVerified && (
            <span css={styles.verifiedCustomer}>
              {ui('pdp.reviews.verifiedCustomer')}
              <Icon
                css={styles.verifiedCustomerIcon}
                name={ICONS.REVIEWS_VERIFIED}
              />
            </span>
          )}
        </div>
        <span css={styles.date}>{date}</span>
      </div>

      <div css={styles.body}>
        <Markdown>{formattedBody}</Markdown>
      </div>

      {isCollapsed ? (
        <Link
          as="button"
          icon={ICONS.CHEVRON_DOWN}
          css={styles.readMore}
          onClick={toggleCollapsed}
        >
          {ui('pdp.reviews.readMore')}
        </Link>
      ) : (
        <div css={styles.additionalContentContainer}>
          {!!momentList && <MomentList data={momentList} />}
          {!!ratings && <RatingsList ratings={ratings} />}
        </div>
      )}
    </article>
  );
}

export default ReviewCard;
