import Markdown from '~/components/global/Markdown/Markdown';
import { ui } from '~/lib/utils/ui-dictionary';

import { styles } from './Location.styles';

function BrowserLocationFailed() {
  return (
    <div css={styles.useCurrentLocationContainer}>
      <span css={styles.browserLocationFailedMessage}>
        <Markdown>{ui('location.browserLocationFailedMessage')}</Markdown>
      </span>
    </div>
  );
}

export default BrowserLocationFailed;
