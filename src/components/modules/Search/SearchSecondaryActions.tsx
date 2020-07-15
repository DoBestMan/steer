import Link from '~/components/global/Link/Link';
import { LINK_TYPES, THEME } from '~/lib/constants';
import { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { SearchStateEnum } from './Search.types';
import styles from './SearchAutocomplete.styles';

interface Props {
  onAddRearTire: () => void;
  onSetActiveModal: (modalId: string) => () => void;
  searchState: string;
}

function SearchSecondaryActions({
  onSetActiveModal,
  onAddRearTire,
  searchState,
}: Props) {
  const isVehicleState = searchState === SearchStateEnum.VEHICLE;
  const isTireSizeState = searchState === SearchStateEnum.TIRE_SIZE;
  const isRearTireState = searchState === SearchStateEnum.REAR_TIRE;

  return (
    <div css={styles.secondaryActionWrapper}>
      {(isTireSizeState || isRearTireState) && (
        <Link
          as={LINK_TYPES.BUTTON}
          css={[typography.smallCopy, styles.secondaryActionButton]}
          onClick={onSetActiveModal(STATIC_MODAL_IDS.HOW_TO_FIND_YOUR_SIZE)}
          theme={THEME.LIGHT}
        >
          {ui('search.notSure')}
        </Link>
      )}
      {isTireSizeState && (
        <Link
          as={LINK_TYPES.BUTTON}
          css={[typography.smallCopy, styles.secondaryActionButton]}
          onClick={onAddRearTire}
          theme={THEME.LIGHT}
        >
          {ui('search.addRearTire')}
        </Link>
      )}
      {isVehicleState && (
        <Link
          as={LINK_TYPES.BUTTON}
          css={[typography.smallCopy, styles.secondaryActionButton]}
          onClick={onSetActiveModal(STATIC_MODAL_IDS.HOW_TO_FIND_VEHICLE_TRIM)}
          theme={THEME.LIGHT}
        >
          {ui('search.notSure')}
        </Link>
      )}
    </div>
  );
}

export default SearchSecondaryActions;
