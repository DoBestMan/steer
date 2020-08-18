import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Input from '~/components/global/Input/Input';
import Markdown from '~/components/global/Markdown/Markdown';
import TitleRadio from '~/components/global/Radio/TitleRadio';
import Toast, { TOAST_TYPE } from '~/components/global/Toast/Toast';
import { SiteCustomerSupportFormInput } from '~/data/models/SiteCustomerSupportFormInput';
import { apiSendCustomerSupportForm } from '~/lib/api/send-customer-support-form';
import { ui } from '~/lib/utils/ui-dictionary';

import { FIELDS } from './CustomerSupportForm.constants';
import styles from './CustomerSupportForm.styles';

interface FormValues {
  [FIELDS.EMAIL]: string;
  [FIELDS.FIRST_NAME]: string;
  [FIELDS.LAST_NAME]: string;
  [FIELDS.MESSAGE]: string | null;
  [FIELDS.ORDER_NUMBER]: string | null;
  [FIELDS.PHONE_NUMBER]: string;
  [FIELDS.SUBJECT]: string | null;
  [FIELDS.FILE]: string | null;
  [FIELDS.TOKEN]: string;
}

interface Props {
  selections: Array<{ label: string; value: string }>;
}

const initialState = {
  [FIELDS.EMAIL]: '',
  [FIELDS.FIRST_NAME]: '',
  [FIELDS.LAST_NAME]: '',
  [FIELDS.MESSAGE]: '',
  [FIELDS.ORDER_NUMBER]: '',
  [FIELDS.PHONE_NUMBER]: '',
  [FIELDS.SUBJECT]: null,
  [FIELDS.FILE]: null,
  [FIELDS.TOKEN]: '',
};

const LIMIT_FILE_SIZE = 5000;
const toastMessages: {
  [key in TOAST_TYPE | string]: JSX.Element | string;
} = {
  [TOAST_TYPE.SUCCESS]: (
    <Markdown>{ui('contactPage.message.success')}</Markdown>
  ),
  [TOAST_TYPE.ERROR]: <Markdown>{ui('contactPage.message.error')}</Markdown>,
};

function SendMessageForm({ selections }: Props) {
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<TOAST_TYPE | string>('');
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState('');

  const hasRequiredFieldFilled =
    !!formValues[FIELDS.EMAIL] &&
    !!formValues[FIELDS.FIRST_NAME] &&
    !!formValues[FIELDS.LAST_NAME] &&
    !!formValues[FIELDS.MESSAGE] &&
    !!formValues[FIELDS.PHONE_NUMBER] &&
    !!formValues[FIELDS.PHONE_NUMBER] &&
    !!formValues[FIELDS.ORDER_NUMBER] &&
    !!formValues[FIELDS.SUBJECT];

  useEffect(() => {
    setIsFormValid(hasRequiredFieldFilled);
  }, [formValues, hasRequiredFieldFilled]);

  const postFormData = async (formData: SiteCustomerSupportFormInput) => {
    try {
      await apiSendCustomerSupportForm(formData);
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
              } as SiteCustomerSupportFormInput);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFilename(file.name);
      if (file.size / 1024 < LIMIT_FILE_SIZE) {
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onloadstart = function () {
          setLoading(true);
        };

        reader.onerror = function () {
          console.info('An error has occured while reading the file.');
          setToastMessage(TOAST_TYPE.ERROR);
          setLoading(false);
        };

        reader.onloadend = function () {
          setFormValues({
            ...formValues,
            [FIELDS.FILE]: reader.result as string,
          });
          setLoading(false);
        };
      } else {
        console.info('You can upload a file up to 5000kb.');
        setToastMessage(TOAST_TYPE.ERROR);
      }
    }
  };

  const handleClearMessage = () => {};

  return (
    <Grid>
      <GridItem gridColumnXL={'4/12'}>
        <h2 css={styles.title}>{ui('contactPage.message.title')}</h2>
      </GridItem>
      <GridItem gridColumnXL={'4/12'}>
        <form>
          <fieldset css={styles.group}>
            <div css={styles.input}>
              <Input
                id="first_name"
                value={formValues[FIELDS.FIRST_NAME]}
                onChange={handleSetFormFieldValue(FIELDS.FIRST_NAME)}
                label={ui('contactPage.message.placeholders.firstName')}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="last_name"
                value={formValues[FIELDS.LAST_NAME]}
                onChange={handleSetFormFieldValue(FIELDS.LAST_NAME)}
                label={ui('contactPage.message.placeholders.lastName')}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="email"
                value={formValues[FIELDS.EMAIL]}
                onChange={handleSetFormFieldValue(FIELDS.EMAIL)}
                label={ui('contactPage.message.placeholders.email')}
                type="email"
              />
            </div>
            <div css={styles.input}>
              <Input
                id="phone_number"
                value={formValues[FIELDS.PHONE_NUMBER]}
                onChange={handleSetFormFieldValue(FIELDS.PHONE_NUMBER)}
                label={ui('contactPage.message.placeholders.phoneNumber')}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="order_number"
                value={formValues[FIELDS.ORDER_NUMBER] as string}
                onChange={handleSetFormFieldValue(FIELDS.ORDER_NUMBER)}
                label={ui('contactPage.message.placeholders.orderNumber')}
              />
            </div>
          </fieldset>
          <fieldset css={styles.group}>
            <h3 css={styles.subjectTitle}>
              {ui('contactPage.message.subject.subject')}
              <span css={styles.subjectOptional}>
                {ui('contactPage.message.subject.optional')}
              </span>
            </h3>
            <div css={styles.radioGroup}>
              {selections.map(({ label, value }) => {
                return (
                  <TitleRadio
                    activeValue={formValues[FIELDS.SUBJECT] as string}
                    label={label}
                    name="subject"
                    onChange={handleSetFormFieldValue(FIELDS.SUBJECT)}
                    value={value}
                    key={value}
                  />
                );
              })}
            </div>
          </fieldset>
          <fieldset css={styles.group}>
            <label htmlFor="message" css={styles.label}>
              {ui('contactPage.message.messageTitle')}
            </label>
            <Input
              id="message"
              isTextArea
              value={formValues[FIELDS.MESSAGE] as string}
              onChange={handleSetFormFieldValue(FIELDS.MESSAGE)}
              label={ui('contactPage.message.placeholders.message')}
            />
          </fieldset>
          <fieldset css={[styles.group, styles.relative]}>
            <span css={styles.filename}>{filename}</span>
            <label htmlFor="attach-file" css={styles.label}>
              <span>{ui('contactPage.message.attach')}</span>
            </label>
            <input
              id="attach-file"
              type="file"
              accept=".jpg, .jpeg, .png, .bmp"
              css={styles.attachFile}
              onChange={handleFileChange}
            />
          </fieldset>
          <div css={[styles.group, styles.buttonSection]}>
            {/* TODO: implement captcha - WCS-797 */}
            <Button
              isDisabled={!isFormValid || loading}
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
export default SendMessageForm;
