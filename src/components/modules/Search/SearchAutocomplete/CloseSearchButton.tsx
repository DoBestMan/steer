import Link from '~/components/global/Link/Link';
import { LINK_TYPES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './SearchAutocomplete.styles';

interface Props {
  isRearTireState: boolean;
  onCloseSearchClick: () => void;
}

function CloseSearchButton({ isRearTireState, onCloseSearchClick }: Props) {
  return (
    <div
      css={[
        styles.closeSearchWrapper,
        isRearTireState && styles.closeSearchRearTire,
      ]}
    >
      <Link
        as={LINK_TYPES.BUTTON}
        css={[
          typography.smallCopy,
          styles.closeSearchButton,
          isRearTireState && styles.closeSearchButtonRearTire,
        ]}
        onClick={onCloseSearchClick}
        theme={THEME.LIGHT}
      >
        {ui('search.cancelButtonLabel')}
      </Link>
    </div>
  );
}

export default CloseSearchButton;
