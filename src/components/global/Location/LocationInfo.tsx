import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';

import { styles } from './Location.styles';

interface Props {
  isFreeShipping: boolean;
}

function LocationInfo({ isFreeShipping }: Props) {
  return (
    <div css={styles.infoContainer}>
      {isFreeShipping ? (
        <p css={styles.freeShipping}>
          <Icon name={ICONS.CHECKMARK} css={styles.freeShippingIcon} />
          We ship free to this location
        </p>
      ) : (
        <p>
          We use your location to provide accurate
          <br />
          pricing and help you find local shops.
          {/* TODO: update link when available */}
          <Link href="/" css={styles.infoLink}>
            Learn More
          </Link>
        </p>
      )}
    </div>
  );
}

export default LocationInfo;
