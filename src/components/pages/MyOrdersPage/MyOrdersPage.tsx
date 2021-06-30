import React, { useCallback, useEffect } from 'react';
import { Cookies } from 'react-cookie';

import Button from '~/components/global/Button/Button';
import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Loading from '~/components/global/Loading/Loading';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import { useAccountContext } from '~/components/modules/Account/Account.context';
import AccountHeader from '~/components/modules/Account/AccountHeader/AccountHeader';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import MyOrderItem from '~/components/pages/MyOrdersPage/MyOrderItem/MyOrderItem';
import { SSO_COOKIE_CONSTANTS } from '~/lib/constants/sso';
import { getSSOLoginURL } from '~/lib/utils/sso';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './MyOrdersPage.styles';

export default function MyOrdersPage() {
  const title = ui('account.myOrdersHeader');
  const description = ui('account.myOrdersDescription');
  const { getMyOrders, myOrders, isLoading } = useAccountContext();
  const { setIsSearchOpen } = useSearchModalContext();

  const fetchOrdersOnPageLoad = useCallback(async () => {
    await getMyOrders('1');
  }, [getMyOrders]);

  const cookies = new Cookies();
  const ssoToken = cookies.get(SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO);

  useEffect(() => {
    // if no sso token in cookie, redirect to sso login
    if (!ssoToken) {
      window.location.href = getSSOLoginURL();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchOrdersOnPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openSearchModal = useCallback(() => {
    setIsSearchOpen(true);
  }, [setIsSearchOpen]);

  function renderLoader() {
    return (
      (isLoading || !ssoToken) && (
        <div css={styles.loaderContainer}>
          <Loading />
        </div>
      )
    );
  }

  function renderList() {
    if (myOrders && ssoToken) {
      const { userOrders } = myOrders;
      return userOrders.map((item, index) => (
        <div key={index} css={styles.columnContainer}>
          <MyOrderItem {...item} />
        </div>
      ));
    }
    return (
      !isLoading && (
        <div css={[styles.columnContainer]}>
          <Button css={styles.button} onClick={openSearchModal}>
            {'Shop tires'}
          </Button>
        </div>
      )
    );
  }

  return (
    <>
      <Grid css={styles.container}>
        <AccountHeader
          title={title}
          description={description}
          showReturnOption
          showCancellationMessage
        />
        <GridItem>
          <div css={styles.columnContainer}>
            {renderLoader()}
            {renderList()}
          </div>
        </GridItem>
        <PageIllustration carId={CARS[CARS_KEYS.SEDAN]} />
      </Grid>
    </>
  );
}
