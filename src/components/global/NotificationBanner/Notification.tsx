import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { SiteNotifications } from '~/data/models/SiteNotifications';
import { LINK_TYPES, TIME } from '~/lib/constants';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './Notification.styles';

function Notification({
  endDateTime,
  icon,
  id,
  labelLink,
  startDateTime,
  subtext,
  title,
}: SiteNotifications) {
  const newDate = new Date();
  const currentDate = newDate.toISOString();
  const [isVisible, setIsVisible] = useState(
    currentDate > startDateTime && currentDate < endDateTime,
  );
  const setNotificationIdInLocalStorage = () => {
    const sessionIds = window.localStorage.getItem(
      LOCAL_STORAGE[PROPERTIES.CLOSED_NOTIFICATION_BANNER_IDS],
    );
    let notificationStorageIds: string[] = [];
    if (sessionIds) {
      notificationStorageIds = JSON.parse(sessionIds);
      notificationStorageIds.push(id);
      window.localStorage.setItem(
        LOCAL_STORAGE[PROPERTIES.CLOSED_NOTIFICATION_BANNER_IDS],
        JSON.stringify(notificationStorageIds),
      );
    } else {
      notificationStorageIds.push(id);
      window.localStorage.setItem(
        LOCAL_STORAGE[PROPERTIES.CLOSED_NOTIFICATION_BANNER_IDS],
        JSON.stringify(notificationStorageIds),
      );
    }
  };
  const handleDismiss = () => {
    setIsVisible(false);
    setNotificationIdInLocalStorage();
  };
  const bannerClicked = () => {
    setNotificationIdInLocalStorage();
  };
  return isVisible ? (
    <CSSTransition timeout={{ enter: 0, exit: TIME.MS400 }}>
      <div css={styles.root}>
        <div css={[typography.jumboHeadline, styles.decorator]}>
          {icon && <Icon css={styles.bannerIcon} name={icon.svgId} />}
        </div>
        <GridItem css={styles.cardContent} gridColumnL="4/8" gridColumnXL="2/6">
          {labelLink && (
            <Link
              css={styles.descriptionLink}
              {...labelLink.link}
              onClick={bannerClicked}
            >
              <span css={styles.title}>{title}</span>
              <br />
              <span css={[typography.bodyCopy, styles.description]}>
                {subtext}
              </span>
            </Link>
          )}
        </GridItem>
        <Link
          as={LINK_TYPES.BUTTON}
          aria-label={ui('common.toast.close')}
          type="button"
          css={styles.icon}
          icon={ICONS.CLOSE}
          onClick={handleDismiss}
        />
      </div>
    </CSSTransition>
  ) : null;
}

export default Notification;
