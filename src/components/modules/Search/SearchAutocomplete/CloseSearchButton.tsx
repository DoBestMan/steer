import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { LINK_TYPES, THEME } from '~/lib/constants';

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
        borderless
        css={[
          styles.closeSearchButton,
          isRearTireState && styles.closeSearchButtonRearTire,
        ]}
        onClick={onCloseSearchClick}
        theme={THEME.LIGHT}
        icon={ICONS.CLOSE}
      />
    </div>
  );
}

export default CloseSearchButton;
