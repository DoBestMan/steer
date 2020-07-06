import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import { apiGetOrderTracking } from '~/lib/api/track-order';
import { INPUT_TYPE } from '~/lib/constants';
import { onlyNumbers } from '~/lib/utils/regex';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderTrackingForm.styles';

function OrderTrackingForm() {
  const [hasError, setHasError] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (orderId && shippingZip) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [orderId, shippingZip, hasError]);

  const handleShippingZipChange = (value: string) => {
    const newValue = value.replace(onlyNumbers, '');
    setShippingZip(newValue);
  };

  const handleButtonClick = async () => {
    hasError && setHasError(false);

    try {
      await apiGetOrderTracking({
        orderId,
        zip: shippingZip,
      });
    } catch (err) {
      setHasError(true);
    }
  };

  return (
    <form css={styles.root}>
      <div css={styles.input}>
        <Input
          error={{ hasError }}
          value={orderId}
          onChange={setOrderId}
          label={ui('common.form.orderId')}
          type={INPUT_TYPE.TEXT}
        />
      </div>
      <div css={styles.input}>
        <Input
          error={{
            hasError,
            errorMessage: ui('tracking.orderTrackingError'),
          }}
          value={shippingZip}
          onChange={handleShippingZipChange}
          label={ui('common.form.shippingZip')}
          type={INPUT_TYPE.TEXT}
        />
      </div>
      <div css={styles.submitButtonWrapper}>
        <Button
          css={styles.submitButton}
          isDisabled={!isFormValid}
          onClick={handleButtonClick}
          type="button"
        >
          {ui('tracking.orderTrackingSubmit')}
        </Button>
      </div>
    </form>
  );
}

export default OrderTrackingForm;
