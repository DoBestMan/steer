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
import { email, phone } from '~/lib/utils/regex';
import { getMIMEType } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import { EMAIL_SOURCE_VALUE, FIELDS } from './CustomerSupportForm.constants';
import styles from './CustomerSupportForm.styles';

interface FormValues {
  [FIELDS.EMAIL]: string;
  [FIELDS.EMAIL_SOURCE]: string;
  [FIELDS.EMAIL_SOURCE_URL]: string | false;
  [FIELDS.FIRST_NAME]: string;
  [FIELDS.LAST_NAME]: string;
  [FIELDS.MESSAGE]: string | null;
  [FIELDS.ORDER_NUMBER]: string | null;
  [FIELDS.PHONE_NUMBER]: string;
  [FIELDS.SUBJECT]: string;
  [FIELDS.FILE]: string | null;
  [FIELDS.FILE_MIME_TYPE]: string | null;
  [FIELDS.TOKEN]: string;
}

interface Props {
  selections: Array<{ label: string; value: string }>;
}

const initialState = {
  [FIELDS.EMAIL]: '',
  [FIELDS.EMAIL_SOURCE]: '',
  [FIELDS.EMAIL_SOURCE_URL]: '',
  [FIELDS.FIRST_NAME]: '',
  [FIELDS.LAST_NAME]: '',
  [FIELDS.MESSAGE]: '',
  [FIELDS.ORDER_NUMBER]: '',
  [FIELDS.PHONE_NUMBER]: '',
  [FIELDS.SUBJECT]: '',
  [FIELDS.FILE]: '',
  [FIELDS.TOKEN]: '',
  [FIELDS.FILE_MIME_TYPE]: '',
};

const LIMIT_FILE_SIZE = 1024 * 4;
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
    !!formValues[FIELDS.SUBJECT];

  useEffect(() => {
    setIsFormValid(hasRequiredFieldFilled);
  }, [formValues, hasRequiredFieldFilled]);

  const postFormData = async (formData: SiteCustomerSupportFormInput) => {
    const res = await apiSendCustomerSupportForm(formData);
    if (res.isSuccess) {
      setToastMessage(TOAST_TYPE.SUCCESS);
      setFormValues(initialState);
      setFilename('');
      return;
    }
    setToastMessage(TOAST_TYPE.ERROR);
  };

  const hasValidEmail = email.test(formValues[FIELDS.EMAIL] || '');
  const hasValidNumber = phone.test(formValues[FIELDS.PHONE_NUMBER] || '');
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
            .then(async function (token: string) {
              setLoading(true);
              await postFormData({
                ...formValues,
                [FIELDS.EMAIL_SOURCE]: EMAIL_SOURCE_VALUE,
                [FIELDS.EMAIL_SOURCE_URL]: window.location.href,
                [FIELDS.TOKEN]: token,
              } as SiteCustomerSupportFormInput);
              setLoading(false);
            });
        } catch (error) {
          console.info(error);
          setLoading(false);
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
      event.target.value = '';
      setFilename(file.name);
      if (file.size / 1024 < LIMIT_FILE_SIZE) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadstart = function () {
          setLoading(true);
        };

        reader.onerror = function () {
          console.info('An error has occured while reading the file.');
          setToastMessage(TOAST_TYPE.ERROR);
          setLoading(false);
        };

        reader.onloadend = function () {
          const mimeType = getMIMEType(reader.result as string);
          const base64Content = (reader.result as string).split(',')[1];

          setFormValues({
            ...formValues,
            [FIELDS.FILE]: base64Content,
            [FIELDS.FILE_MIME_TYPE]: mimeType,
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
      <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
        <h2 css={styles.title}>{ui('contactPage.message.title')}</h2>
      </GridItem>
      <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
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
                error={{
                  hasError: !hasValidEmail,
                  errorMessage: ui('common.form.emailError'),
                }}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="phone_number"
                value={formValues[FIELDS.PHONE_NUMBER]}
                onChange={handleSetFormFieldValue(FIELDS.PHONE_NUMBER)}
                label={ui('contactPage.message.placeholders.phoneNumber')}
                error={{
                  hasError: !hasValidNumber,
                  errorMessage: ui(
                    'tireInstallerRegistration.form.errors.phone',
                  ),
                }}
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
          <div css={styles.subjectBG}>
            <fieldset css={styles.group}>
              <h3 css={styles.subjectTitle}>
                {ui('contactPage.message.subject.subject')}
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
          </div>
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
              accept=".jpg, .pdf"
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
