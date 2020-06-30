import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import { INPUT_TYPE } from '~/lib/constants';
import { onlyNumbers } from '~/lib/utils/regex';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderTrackingForm.styles';

function OrderTrackingForm() {
  const [orderId, setOrderId] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (orderId && shippingZip) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [orderId, shippingZip]);

  const handleShippingZipChange = (value: string) => {
    const newValue = value.replace(onlyNumbers, '');
    setShippingZip(newValue);
  };

  const handleButtonClick = () => {
    // TODO handle call to API [WCS-721]
  };

  return (
    <form css={styles.root}>
      <div css={styles.input}>
        <Input
          value={orderId}
          onChange={setOrderId}
          label={ui('common.form.orderId')}
          type={INPUT_TYPE.TEXT}
        />
      </div>
      <div css={styles.input}>
        <Input
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
