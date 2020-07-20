import Markdown from '~/components/global/Markdown/Markdown';
import { ui } from '~/lib/utils/ui-dictionary';

import { styles } from './Location.styles';

function LocationInfo() {
  return (
    <div css={styles.infoContainer}>
      <p>
        <Markdown renderers={{ paragraph: 'span' }}>
          {ui('location.locationInfo')}
        </Markdown>
      </p>
    </div>
  );
}

export default LocationInfo;
