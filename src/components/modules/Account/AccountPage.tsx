import React, { useState } from 'react';

import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Loading from '~/components/global/Loading/Loading';
import Notification from '~/components/global/NotificationBanner/Notification';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import AccountHeader from '~/components/modules/Account/AccountHeader/AccountHeader';
import AccountLoader from '~/components/modules/Account/AccountLoader/AccountLoader';
import AccountSection from '~/components/modules/Account/AccountSection/AccountSection';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { THEME } from '~/lib/constants';
import { AccountDetails } from '~/lib/constants/sso.types';
import { ui } from '~/lib/utils/ui-dictionary';

import { accountSectionArray } from './Account.constants';
import { useAccountContext } from './Account.context';
import styles from './Account.styles';

interface Props extends AccountDetails {
  isDataUpdated: boolean;
}

function Loader() {
  return (
    <div css={styles.loaderContainer}>
      <Loading />
    </div>
  );
}

export default function AccountPage({ serverData, isDataUpdated }: Props) {
  const [notificationStatus, toggleUpdateNotification] = useState<boolean>(
    isDataUpdated,
  );
  const { isLoading, handleLogout } = useAccountContext();

  function NotificationItem() {
    return (
      notificationStatus && (
        <GridItem css={styles.notificationContainer}>
          <Notification
            subtext={ui('account.accountNotificationDesc')}
            icon={{
              svgId: ICONS.CHECKMARK_BIG,
              type: ICON_IMAGE_TYPE.ICON,
            }}
            id="accountUpdate"
            title={ui('account.accountNotificationHeader')}
            type="accountUpdate"
            sessionExpiryTime={2}
            suppressFromHomePage
            handleNotificationClick={() => toggleUpdateNotification(false)}
          />
        </GridItem>
      )
    );
  }

  const { username, hasToken } = serverData.userDetails;
  const title = ui('account.userAccountTitle', {
    username,
  });
  const description = ui('account.userAccountDescription');
  return isLoading ? (
    <div>
      {Loader()}
      <PageIllustration carId={CARS[CARS_KEYS.SEDAN]} />
    </div>
  ) : (
    <>
      {hasToken ? (
        <Grid css={styles.container}>
          {NotificationItem()}
          <AccountHeader
            title={title}
            description={description}
            showNotifcation={notificationStatus}
          />
          <GridItem css={styles.gridContainer}>
            <ul css={styles.root}>
              {accountSectionArray.map((item, index) => (
                <li key={index} data-component={`${item.analytics}`}>
                  <AccountSection
                    {...item}
                    index={index}
                    numberOfElements={accountSectionArray.length}
                  />
                </li>
              ))}
              <Link
                onClick={handleLogout}
                key="logout"
                theme={THEME.LIGHT}
                css={styles.logoutContainer}
              >
                {ui('account.logout')}
              </Link>
            </ul>
          </GridItem>

          <PageIllustration carId={CARS[CARS_KEYS.SEDAN]} />
        </Grid>
      ) : (
        <AccountLoader />
      )}
    </>
  );
}
