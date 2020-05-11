import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import { LINK_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

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
          {ui('location.freeShipping')}
        </p>
      ) : (
        <p>
          <Markdown>{ui('location.locationInfo')}</Markdown>
          {/* TODO: update link when available */}
          <Link theme={LINK_THEME.LIGHT} href="/#" css={styles.infoLink}>
            {ui('location.learnMoreLabel')}
          </Link>
        </p>
      )}
    </div>
  );
}

export default LocationInfo;
