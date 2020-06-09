import Link from '~/components/global/Link/Link';
import { LINK_THEME, LINK_TYPES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { SearchModalEnum, SearchStateEnum } from './Search.types';
import styles from './SearchAutocomplete.styles';

interface Props {
  onAddRearTire: () => void;
  onSetActiveModal: (modalType: SearchModalEnum | null) => () => void;
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
          onClick={onSetActiveModal(SearchModalEnum.TIRE_SIZE)}
          theme={LINK_THEME.LIGHT}
        >
          {ui('search.notSure')}
        </Link>
      )}
      {isTireSizeState && (
        <Link
          as={LINK_TYPES.BUTTON}
          css={[typography.smallCopy, styles.secondaryActionButton]}
          onClick={onAddRearTire}
          theme={LINK_THEME.LIGHT}
        >
          {ui('search.addRearTire')}
        </Link>
      )}
      {isVehicleState && (
        <Link
          as={LINK_TYPES.BUTTON}
          css={[typography.smallCopy, styles.secondaryActionButton]}
          onClick={onSetActiveModal(SearchModalEnum.VEHICLE_TRIM)}
          theme={LINK_THEME.LIGHT}
        >
          {ui('search.notSure')}
        </Link>
      )}
    </div>
  );
}

export default SearchSecondaryActions;
