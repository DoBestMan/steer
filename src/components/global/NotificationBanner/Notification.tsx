import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteLink } from '~/data/models/SiteLink';
import { LINK_TYPES, TIME } from '~/lib/constants';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './Notification.styles';

export interface NotificationProps {
  endDateTime: string;
  icon?: SiteIcon;
  id: string;
  labelLink?: {
    label: string;
    link: SiteLink;
  };
  startDateTime: string;
  subtext: string;
  suppressFromHomePage: boolean;
  title: string;
  type: string;
}

function Notification({
  endDateTime,
  icon,
  id,
  labelLink,
  startDateTime,
  subtext,
  suppressFromHomePage,
  title,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  const newDate = new Date();
  const currentDate = newDate.toISOString();

  const handleDismiss = () => {
    setIsVisible(false);
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
  return isVisible &&
    currentDate > startDateTime &&
    currentDate < endDateTime ? (
    <CSSTransition timeout={{ enter: 0, exit: TIME.MS400 }}>
      {!suppressFromHomePage && (
        <div>
          <div css={styles.root}>
            <div css={[typography.jumboHeadline, styles.decorator]}>
              {icon && <Icon css={styles.bannerIcon} name={icon.svgId} />}
            </div>
            <GridItem
              css={styles.cardContent}
              gridColumnL="4/8"
              gridColumnXL="2/6"
            >
              <div css={styles.title}>{title}</div>
              <p css={[typography.bodyCopy, styles.description]}>
                {subtext}
                {labelLink && (
                  <Link
                    {...labelLink.link}
                    icon={ICONS.CHEVRON_RIGHT}
                    css={styles.learnMore}
                  >
                    {labelLink.label}
                  </Link>
                )}
              </p>
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
        </div>
      )}
    </CSSTransition>
  ) : null;
}

export default Notification;
