import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import SearchLabel from '~/components/modules/Search/SearchLabel/SearchLabel';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES, CSSStylesProp } from '~/lib/constants';
import { THEME } from '~/lib/constants/theme';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './NavSearchButton.styles';

interface Props {
  border: CSSStylesProp;
  handleToggleSearch: () => void;
  iconColor: CSSStylesProp;
  textColor: CSSStylesProp;
}

function NavSearchButton({
  border,
  handleToggleSearch,
  iconColor,
  textColor,
}: Props) {
  const { lessThan } = useBreakpoints();
  const { isDesktop } = useSiteGlobalsContext();

  return (
    <button
      aria-label={ui('common.modal.open', { moduleName: 'search' })}
      css={[typography.primarySubhead, styles.button, textColor, border]}
      onClick={handleToggleSearch}
      type="button"
    >
      <Icon
        aria-hidden="true"
        css={[styles.icon, iconColor]}
        theme={isDesktop && THEME.ORANGE}
        name={ICONS.SEARCH}
        ssHeight={15}
        ssr
      />
      {lessThan.L ? (
        ui('search.navLabel')
      ) : (
        <SearchLabel fullLabelAt={BREAKPOINT_SIZES.XL} />
      )}
    </button>
  );
}

export default NavSearchButton;
