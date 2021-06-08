import { CSSTransition } from 'react-transition-group';

import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { SiteNotifications } from '~/data/models/SiteNotifications';
import { LINK_TYPES, THEME, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './Notification.styles';
import { setNotificationIdWithExpiryInLocalStorage } from './Notifications.utils';

function Notification({
  icon,
  id,
  labelLink,
  subtext,
  title,
  theme = THEME.DARK,
  sessionExpiryTime = 360,
  handleNotificationClick,
}: SiteNotifications) {
  const handleDismiss = () => {
    setNotificationIdWithExpiryInLocalStorage(id, sessionExpiryTime);
    handleNotificationClick && handleNotificationClick();
  };

  return (
    <CSSTransition timeout={{ enter: 0, exit: TIME.MS400 }}>
      <div css={[styles.root, styles[theme]]}>
        <div css={[typography.jumboHeadline, styles.decorator]}>
          {icon && (
            <Icon css={[styles.bannerIcon, styles[theme]]} name={icon.svgId} />
          )}
        </div>
        <GridItem css={styles.cardContent} gridColumnL="4/8" gridColumnXL="2/6">
          {labelLink ? (
            <Link
              css={styles.descriptionLink}
              {...labelLink.link}
              onClick={handleDismiss}
            >
              <span css={styles.title}>{title}</span>
              <br />
              <span css={[typography.bodyCopy, styles.description]}>
                {subtext}
              </span>
            </Link>
          ) : (
            <span css={styles.descriptionLink}>
              <span css={styles.title}>{title}</span>
              <br />
              <span css={[typography.bodyCopy, styles.description]}>
                {subtext}
              </span>
            </span>
          )}
        </GridItem>
        {handleNotificationClick && (
          <Link
            as={LINK_TYPES.BUTTON}
            aria-label={ui('common.toast.close')}
            type="button"
            css={styles.icon}
            icon={ICONS.CLOSE}
            onClick={handleDismiss}
          />
        )}
      </div>
    </CSSTransition>
  );
}

export default Notification;
