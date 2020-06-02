import Glider from 'react-glider';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import { LINK_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { statsMock } from './ShopWithConfidence.mock';
import styles from './ShopWithConfidence.styles';

function ShopWithConfidence() {
  return (
    <div>
      <div css={styles.heading}>
        <h3 css={styles.title}>
          {ui('pdp.shopWithConfidence.title')}

          <Icon name={ICONS.CHECKMARK} css={styles.checkmark} />
        </h3>

        <Link
          css={styles.learnMoreButton}
          as="button"
          // TODO update link url when available
          href="/#"
          theme={LINK_THEME.LIGHT}
        >
          {ui('pdp.shopWithConfidence.linkLabel')}
        </Link>
      </div>

      <div css={styles.gliderContainer}>
        <Glider draggable slidesToShow="auto">
          {statsMock.map((item) => (
            <div key={item.heading}>
              <span css={styles.statHeading}>{item.heading}</span>
              <span css={styles.statDetail}>
                <Markdown>{item.detail}</Markdown>
              </span>
            </div>
          ))}
        </Glider>
      </div>
    </div>
  );
}

export default ShopWithConfidence;