import { CSSTransition } from 'react-transition-group';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteMenu } from '~/data/models/SiteMenu';
import { TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles, { fade } from './SubNav.styles';
import SubNavLinks from './SubNavLinks';

interface Props extends Pick<SiteMenu, 'siteMenuBrowseList'> {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileLinks({
  isOpen,
  onClose,
  siteMenuBrowseList,
}: Props) {
  return (
    <CSSTransition
      // stagger text fade in
      timeout={{ enter: TIME.MS500, exit: 0 }}
      in={isOpen}
    >
      {(state) => (
        <div css={[styles.mobileLinks, fade[state]]}>
          <button
            aria-label={ui('nav.close')}
            css={[styles.action, styles.close]}
            onClick={onClose}
          >
            <Icon name={ICONS.CLOSE} />
          </button>
          <div css={styles.borderMobile} />
          <SubNavLinks siteMenuBrowseList={siteMenuBrowseList} />
        </div>
      )}
    </CSSTransition>
  );
}
