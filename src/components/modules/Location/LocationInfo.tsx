import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import { LINK_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { styles } from './Location.styles';

function LocationInfo() {
  return (
    <div css={styles.infoContainer}>
      <p>
        <Markdown renderers={{ paragraph: 'span' }}>
          {ui('location.locationInfo')}
        </Markdown>
        {/* TODO: update link when available */}
        <Link theme={LINK_THEME.LIGHT} href="/#" css={styles.infoLink}>
          {ui('location.learnMoreLabel')}
        </Link>
      </p>
    </div>
  );
}

export default LocationInfo;
