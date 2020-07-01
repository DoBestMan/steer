import { CSSObject } from '@emotion/core';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import SearchLabel from '~/components/modules/Search/SearchLabel/SearchLabel';
import { BREAKPOINT_SIZES, CSSObjectType } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './NavSearchButton.styles';

interface Props {
  border: CSSObjectType;
  handleToggleSearch: () => void;
  iconColor: CSSObjectType;
  textColor: CSSObject;
}

function NavSearchButton({
  border,
  handleToggleSearch,
  iconColor,
  textColor,
}: Props) {
  return (
    <button
      aria-label={ui('common.modal.open', { moduleName: 'search' })}
      css={[typography.primarySubhead, styles.button, textColor, border]}
      onClick={handleToggleSearch}
      type="button"
    >
      <Icon
        css={[styles.icon, iconColor]}
        name={ICONS.SEARCH}
        aria-hidden="true"
      />
      <SearchLabel fullLabelAt={BREAKPOINT_SIZES.XL} hideOnSmallMedium />
    </button>
  );
}

export default NavSearchButton;
