import React from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderAppointment.styles';

interface Props {
  appointmentDisplayArray: Array<string | null | undefined> | null | undefined;
  note: string | null | undefined;
  shippingAddressArray: Array<string | null | undefined> | null;
  showInstallIcon?: boolean;
  showShippingAddress?: boolean;
}
export default function OrderAppointment({
  note,
  shippingAddressArray,
  appointmentDisplayArray,
  showShippingAddress,
  showInstallIcon,
}: Props) {
  function tireInstallationComponent() {
    return (
      <div css={styles.installerIconContainer}>
        <div css={styles.tireInstallationContainer}>
          <Icon
            css={styles.tireInstallationIcon}
            ssHeight="auto"
            name={ICONS.TIRE_INSTALLATION}
            theme={THEME.DARK}
            ssr
          />
        </div>
        <h1 css={styles.orderDetailsText}>{ui('account.tireInstallation')}</h1>
      </div>
    );
  }

  return (
    <div css={styles.wrapper}>
      {appointmentDisplayArray && (
        <>
          <h5 css={styles.orderSubHeader}>
            {ui('tracking.serviceAppointment').toLocaleUpperCase()}
          </h5>
          {showInstallIcon && tireInstallationComponent()}
          <ul>
            {appointmentDisplayArray.map((item, i) => (
              <li css={styles.addressTextContainer} key={i}>
                {item && (
                  <div
                    css={[
                      styles.addressText,
                      i === 0 && styles.sectionHeader,
                      i === 3 && styles.orderDate,
                    ]}
                  >
                    {item}
                  </div>
                )}
              </li>
            ))}
          </ul>
          {note && (
            <div
              css={[
                styles.appointmentNote,
                showShippingAddress && styles.appointmentPadding,
              ]}
            >
              {note}
            </div>
          )}
          {showShippingAddress && <div css={styles.seperator} />}
        </>
      )}
      {showShippingAddress && shippingAddressArray && (
        <>
          <h5 css={styles.orderSubHeader}>
            {ui('tracking.shipping').toLocaleUpperCase()}
          </h5>
          <ul css={styles.shippingContainer}>
            {shippingAddressArray.map((item, i) => (
              <li css={styles.addressTextContainer} key={i}>
                {item && (
                  <div
                    css={[styles.addressText, i === 0 && styles.sectionHeader]}
                  >
                    {item}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div css={styles.seperator} />
        </>
      )}
    </div>
  );
}
