import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Input from '~/components/global/Input/Input';
import Markdown from '~/components/global/Markdown/Markdown';
import Toast, { TOAST_TYPE } from '~/components/global/Toast/Toast';
import { SiteTireSalesFormInput } from '~/data/models/SiteTireSalesFormInput';
import { apiSendTireSalesForm } from '~/lib/api/send-tire-sales-form';
import { ui } from '~/lib/utils/ui-dictionary';

import { FIELDS } from './TireSalesForm.constants';
import styles from './TireSalesForm.styles';

interface FormValues {
  [FIELDS.EMAIL]: string;
  [FIELDS.FIRST_NAME]: string;
  [FIELDS.LAST_NAME]: string;
  [FIELDS.TIRE_NUMBER]: string;
  [FIELDS.TIRE_BRAND]: string;
  [FIELDS.VEHICLE_MODEL]: string;
  [FIELDS.TIRE_SIZE]: string;
  [FIELDS.TOKEN]: string;
}

const initialState = {
  [FIELDS.EMAIL]: '',
  [FIELDS.FIRST_NAME]: '',
  [FIELDS.LAST_NAME]: '',
  [FIELDS.TIRE_NUMBER]: '',
  [FIELDS.TIRE_BRAND]: '',
  [FIELDS.VEHICLE_MODEL]: '',
  [FIELDS.TIRE_SIZE]: '',
  [FIELDS.TOKEN]: '',
};

const toastMessages: {
  [key in TOAST_TYPE | string]: JSX.Element | string;
} = {
  [TOAST_TYPE.SUCCESS]: (
    <Markdown>{ui('seoPage.tireSalesPage.toast.success')}</Markdown>
  ),
  [TOAST_TYPE.ERROR]: (
    <Markdown>{ui('seoPage.tireSalesPage.toast.error')}</Markdown>
  ),
};

function TireSalesForm() {
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<TOAST_TYPE | string>('');

  const hasRequiredFieldFilled =
    !!formValues[FIELDS.EMAIL] &&
    !!formValues[FIELDS.FIRST_NAME] &&
    !!formValues[FIELDS.LAST_NAME] &&
    !!formValues[FIELDS.TIRE_BRAND] &&
    !!formValues[FIELDS.TIRE_NUMBER] &&
    !!formValues[FIELDS.TIRE_SIZE] &&
    !!formValues[FIELDS.VEHICLE_MODEL];

  useEffect(() => {
    setIsFormValid(hasRequiredFieldFilled);
  }, [formValues, hasRequiredFieldFilled]);

  const postFormData = async (formData: SiteTireSalesFormInput) => {
    try {
      await apiSendTireSalesForm(formData);
      setToastMessage(TOAST_TYPE.SUCCESS);
      setFormValues(initialState);
    } catch (error) {
      setToastMessage(TOAST_TYPE.ERROR);
    }
  };

  const handleDismiss = () => {
    setToastMessage('');
  };

  const handleSubmit = async () => {
    // Generate recaptcha3 token
    if (typeof window.grecaptcha !== 'undefined') {
      window.grecaptcha.ready(function () {
        try {
          window.grecaptcha
            .execute(process.env.RECAPTCHA_SITE_KEY || '', { action: 'submit' })
            .then(function (token: string) {
              postFormData({
                ...formValues,
                [FIELDS.TOKEN]: token,
              } as SiteTireSalesFormInput);
            });
        } catch (error) {
          console.info(error);
          setToastMessage(TOAST_TYPE.ERROR);
        }
      });
    } else {
      console.info('Could not find recaptcha3 in the window');
      setToastMessage(TOAST_TYPE.ERROR);
    }
  };

  const handleSetFormFieldValue = (fieldName: string) => (value: string) => {
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
  };

  const handleClearMessage = () => {};

  return (
    <Grid>
      <GridItem gridColumnXL={'4/12'}>
        <h2 css={styles.title}>{ui('seoPage.tireSalesPage.form.title')}</h2>
      </GridItem>
      <GridItem gridColumnXL={'4/12'}>
        <form>
          <fieldset css={styles.group}>
            <div css={styles.input}>
              <Input
                id="first_name"
                value={formValues[FIELDS.FIRST_NAME]}
                onChange={handleSetFormFieldValue(FIELDS.FIRST_NAME)}
                label={ui('seoPage.tireSalesPage.form.placeholders.firstName')}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="last_name"
                value={formValues[FIELDS.LAST_NAME]}
                onChange={handleSetFormFieldValue(FIELDS.LAST_NAME)}
                label={ui('seoPage.tireSalesPage.form.placeholders.lastName')}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="email"
                value={formValues[FIELDS.EMAIL]}
                onChange={handleSetFormFieldValue(FIELDS.EMAIL)}
                label={ui('seoPage.tireSalesPage.form.placeholders.email')}
                type="email"
              />
            </div>
            <div css={styles.input}>
              <Input
                id="tireQuantity"
                value={formValues[FIELDS.TIRE_NUMBER]}
                onChange={handleSetFormFieldValue(FIELDS.TIRE_NUMBER)}
                label={ui(
                  'seoPage.tireSalesPage.form.placeholders.tireQuantity',
                )}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="vehicleModel"
                value={formValues[FIELDS.VEHICLE_MODEL]}
                onChange={handleSetFormFieldValue(FIELDS.VEHICLE_MODEL)}
                label={ui(
                  'seoPage.tireSalesPage.form.placeholders.vehicleModel',
                )}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="tireSize"
                value={formValues[FIELDS.TIRE_SIZE]}
                onChange={handleSetFormFieldValue(FIELDS.TIRE_SIZE)}
                label={ui('seoPage.tireSalesPage.form.placeholders.tireSize')}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="tireBrand"
                value={formValues[FIELDS.TIRE_BRAND]}
                onChange={handleSetFormFieldValue(FIELDS.TIRE_BRAND)}
                label={ui('seoPage.tireSalesPage.form.placeholders.tireBrand')}
              />
            </div>
          </fieldset>
          <div css={[styles.group, styles.buttonSection]}>
            <Button
              isDisabled={!isFormValid}
              onClick={handleSubmit}
              css={styles.submitButton}
              type="button"
            >
              {ui('contactPage.message.submitButton')}
            </Button>
          </div>
        </form>
        {toastMessage && (
          <Toast
            customContainerStyles={styles.toast}
            isOpen={!!toastMessage}
            onDismiss={handleDismiss}
            handleClearMessage={handleClearMessage}
          >
            {toastMessages[toastMessage]}
          </Toast>
        )}
      </GridItem>
    </Grid>
  );
}

export default TireSalesForm;
