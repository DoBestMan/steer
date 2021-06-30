import { useRouter } from 'next/router';
import React from 'react';

import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './AccountHeader.styles';

interface Props {
  description: string;
  showCancellationMessage?: boolean;
  showNotifcation?: boolean;
  showReturnOption?: boolean;
  title: string;
}

export default function AccountHeader({
  title,
  description,
  showReturnOption,
  showCancellationMessage,
  showNotifcation,
}: Props) {
  const router = useRouter();
  function handleRedirect() {
    router.push({ pathname: ROUTE_MAP[ROUTES.USER_ACCOUNT] });
  }
  return (
    <GridItem
      css={[styles.header, showNotifcation && styles.paddingForNotification]}
    >
      {showReturnOption && (
        <button css={[styles.returnHomeContainer]} onClick={handleRedirect}>
          <Icon name={ICONS.CHEVRON_LEFT} css={styles.backIcon} />
          <h1 css={styles.subTitleText}>{ui('account.returnToAccountHome')}</h1>
        </button>
      )}
      <h1 css={styles.title}>{title}</h1>
      <p css={[styles.subTitleText, styles.description]}>{description}</p>
      {showCancellationMessage && (
        <div css={styles.cancellationContainer}>
          <h1 css={styles.cancellationText}>
            {ui('account.myOrderCancellation')}
          </h1>
        </div>
      )}
    </GridItem>
  );
}
