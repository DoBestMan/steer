import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HorizontalNumberPicker from '~/components/global/HorizontalNumberPicker/HorizontalPickerNoCarousel';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Input from '~/components/global/Input/Input';
import Markdown from '~/components/global/Markdown/Markdown';
import TitleRadio from '~/components/global/Radio/TitleRadio';
import { TOAST_TYPE } from '~/components/global/Toast/Toast';
import { useGlobalToastContext } from '~/context/GlobalToast.context';
import { useRouterContext } from '~/context/Router.context';
import { SiteProductLineReviewItemInput } from '~/data/models/SiteProductLineReviewItemInput';
import { apiPostReview } from '~/lib/api/write-review';
import { isValidPurchaseDate } from '~/lib/utils/date';
import { email, onlyNumbersAndForwardSlash } from '~/lib/utils/regex';
import { removeTireFromQueryParam } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import {
  FIELDS,
  RADIO_GROUPS,
  RATING_LABELS,
  RATING_NOT_APPLICABLE,
  RATING_OPTIONS,
} from './ReviewForm.constants';
import styles from './ReviewForm.styles';

interface Props {
  onSearchVehicle?: (event: React.MouseEvent) => void;
  queryParams: {
    [name: string]: string | string[];
  };
  tire: string;
  vehicle?: string | null;
}

interface RootFormValue {
  [FIELDS.ADDITIONAL_COMMENTS]: string | null;
  [FIELDS.NAME]: string;
  [FIELDS.EMAIL]: string;
  [FIELDS.PURCHASE_DATE]: string | null;
  [FIELDS.VEHICLE]: string;
  [FIELDS.AVERAGE_MILES_DRIVEN]: string;
  [FIELDS.DRIVING_STYLE]: string;
  [FIELDS.DRIVING_LOCATION]: string;
  [FIELDS.WOULD_BUY_AGAIN]: string;
  [FIELDS.TOKEN]: string;
}

interface FormValues extends Partial<RootFormValue> {
  performanceRating: Partial<{
    [FIELDS.DRY]: number | null;
    [FIELDS.COMFORT]: number | null;
    [FIELDS.NOISE]: number | null;
    [FIELDS.TREADWEAR]: number | null;
    [FIELDS.WET]: number | null;
    [FIELDS.WINTER]: number | null;
  }>;
}

interface PickerLabels {
  [name: string]: string | number;
}

const toastMessages: {
  [key in TOAST_TYPE | string]: JSX.Element | string;
} = {
  [TOAST_TYPE.SUCCESS]: <Markdown>{ui('reviews.form.success')}</Markdown>,
  [TOAST_TYPE.ERROR]: <Markdown>{ui('reviews.form.error')}</Markdown>,
};

const CONSTANTS = {
  DATE_MAX_LENGTH: 10,
  UNSELECTED_PICKER: -1,
};

const initialState = {
  [FIELDS.ADDITIONAL_COMMENTS]: '',
  [FIELDS.NAME]: '',
  [FIELDS.EMAIL]: '',
  [FIELDS.VEHICLE]: '',
  [FIELDS.PURCHASE_DATE]: '',
  performanceRating: {
    [FIELDS.DRY]: CONSTANTS.UNSELECTED_PICKER,
    [FIELDS.COMFORT]: CONSTANTS.UNSELECTED_PICKER,
    [FIELDS.NOISE]: CONSTANTS.UNSELECTED_PICKER,
    [FIELDS.TREADWEAR]: CONSTANTS.UNSELECTED_PICKER,
    [FIELDS.WET]: CONSTANTS.UNSELECTED_PICKER,
    [FIELDS.WINTER]: CONSTANTS.UNSELECTED_PICKER,
  },
};

function ReviewForm({ tire, queryParams, vehicle, onSearchVehicle }: Props) {
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [pickerLabels, setPickerLabels] = useState<PickerLabels>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { prevUrl, prevRoute, router } = useRouterContext();

  useEffect(() => {
    if (vehicle) {
      setFormValues((prev) => ({
        ...prev,
        [FIELDS.VEHICLE]: vehicle,
      }));
    }
  }, [vehicle]);

  const {
    setGlobalToastMessage,
    handleShowTostOnNextPage,
  } = useGlobalToastContext();
  const brandName =
    queryParams.brand && removeTireFromQueryParam(queryParams.brand);

  const hasRequiredFieldsFilled =
    formValues.performanceRating &&
    formValues.performanceRating[FIELDS.DRY] !== CONSTANTS.UNSELECTED_PICKER &&
    formValues.performanceRating[FIELDS.WET] !== CONSTANTS.UNSELECTED_PICKER &&
    formValues.performanceRating[FIELDS.WINTER] !==
      CONSTANTS.UNSELECTED_PICKER &&
    formValues.performanceRating[FIELDS.COMFORT] !==
      CONSTANTS.UNSELECTED_PICKER &&
    formValues.performanceRating[FIELDS.NOISE] !==
      CONSTANTS.UNSELECTED_PICKER &&
    formValues.performanceRating[FIELDS.TREADWEAR] !==
      CONSTANTS.UNSELECTED_PICKER &&
    formValues[FIELDS.NAME] &&
    formValues[FIELDS.EMAIL] &&
    formValues[FIELDS.VEHICLE] &&
    formValues[FIELDS.AVERAGE_MILES_DRIVEN] &&
    formValues[FIELDS.DRIVING_STYLE] &&
    formValues[FIELDS.DRIVING_LOCATION] &&
    formValues[FIELDS.WOULD_BUY_AGAIN];

  const isValidDate = isValidPurchaseDate(
    formValues[FIELDS.PURCHASE_DATE] || '',
  );

  // Date is valid if empty or valid date
  const hasValidDate = formValues[FIELDS.PURCHASE_DATE] === '' || isValidDate;

  const hasValidFields =
    email.test(formValues[FIELDS.EMAIL] || '') && hasValidDate;

  const submitText = isFormValid
    ? ui('reviews.form.submit.valid')
    : ui('reviews.form.submit.invalid');

  useEffect(() => {
    if (hasRequiredFieldsFilled && hasValidFields) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formValues, hasRequiredFieldsFilled, hasValidFields]);

  const handleFormSubmit = async () => {
    const reformattedDataForSubmission = {
      ...formValues,
      [FIELDS.PURCHASE_DATE]:
        formValues[FIELDS.PURCHASE_DATE] === ''
          ? null
          : formValues[FIELDS.PURCHASE_DATE],
      [FIELDS.WOULD_BUY_AGAIN]:
        formValues[FIELDS.WOULD_BUY_AGAIN] ===
        ui('reviews.form.sections.buyAgain.options.yes')
          ? true
          : false,
      performanceRating: {
        [FIELDS.DRY]: reformatPickerValue(
          formValues.performanceRating[FIELDS.DRY] as number,
        ),
        [FIELDS.WET]: reformatPickerValue(
          formValues.performanceRating[FIELDS.WET] as number,
        ),
        [FIELDS.WINTER]: reformatPickerValue(
          formValues.performanceRating[FIELDS.WINTER] as number,
        ),
        [FIELDS.COMFORT]: reformatPickerValue(
          formValues.performanceRating[FIELDS.COMFORT] as number,
        ),
        [FIELDS.NOISE]: reformatPickerValue(
          formValues.performanceRating[FIELDS.NOISE] as number,
        ),
        [FIELDS.TREADWEAR]: reformatPickerValue(
          formValues.performanceRating[FIELDS.TREADWEAR] as number,
        ),
      },
    };

    // Generate recaptcha3 token
    if (typeof window.grecaptcha !== 'undefined') {
      window.grecaptcha.ready(function () {
        try {
          window.grecaptcha
            .execute(process.env.RECAPTCHA_SITE_KEY || '', { action: 'submit' })
            .then(function (token: string) {
              reformattedDataForSubmission[FIELDS.TOKEN] = token;

              postFormData(
                reformattedDataForSubmission as SiteProductLineReviewItemInput,
              );
            });
        } catch (error) {
          console.info(error);
          setGlobalToastMessage(toastMessages[TOAST_TYPE.ERROR]);
        }
      });
    } else {
      console.info('Could not find recaptcha3 in the window');
      setGlobalToastMessage(toastMessages[TOAST_TYPE.ERROR]);
    }
  };

  const reformatPickerValue = (index: number) => {
    // We need to do this because the picker keeps track of the selected option
    // with the index. The index controls which one is selected and if we change
    // this value in state, it affects which option is selected
    // Set the last option (N/A) to null and increment all others by 1
    const incrementPickerValue =
      index === RATING_OPTIONS.indexOf(RATING_NOT_APPLICABLE)
        ? null
        : index + 1;
    const pickerValue =
      index !== CONSTANTS.UNSELECTED_PICKER
        ? incrementPickerValue
        : CONSTANTS.UNSELECTED_PICKER;

    return pickerValue;
  };

  const postFormData = async (
    reformattedDataForSubmission: SiteProductLineReviewItemInput,
  ) => {
    try {
      await apiPostReview(
        brandName,
        queryParams.productLine.toString(),
        reformattedDataForSubmission,
      );

      setIsFormValid(false);
      setFormValues(initialState);
      setPickerLabels({});

      handleShowTostOnNextPage();
      setGlobalToastMessage(toastMessages[TOAST_TYPE.SUCCESS]);

      router.push(prevRoute, prevUrl);
    } catch (error) {
      setGlobalToastMessage(toastMessages[TOAST_TYPE.ERROR]);
    }
  };

  const handleSelectPickerOption = (field: string) => (
    _value: number | string,
    index: number,
  ) => {
    setFormValues({
      ...formValues,
      performanceRating: {
        ...formValues.performanceRating,
        [field]: index,
      },
    });
    setPickerLabels({
      ...pickerLabels,
      [field]: RATING_LABELS[index],
    });
  };

  const handleSetFormFieldValue = (field: string) => (value: string) => {
    let formattedValue = value;
    if (field === FIELDS.PURCHASE_DATE) {
      formattedValue = value
        .substring(0, CONSTANTS.DATE_MAX_LENGTH)
        .replace(onlyNumbersAndForwardSlash, '');
    }
    setFormValues({
      ...formValues,
      [field]: formattedValue,
    });
  };

  const handleClearVehicle = (event: React.MouseEvent) => {
    event.preventDefault();
    setFormValues((prev) => ({
      ...prev,
      [FIELDS.VEHICLE]: '',
    }));
  };

  return (
    <Grid>
      <GridItem gridColumnM="3/7" gridColumnL="3/12" gridColumnXL="4/11">
        <h1 css={styles.title}>
          {uiJSX('reviews.form.title', {
            tire: (
              <span key={tire} css={styles.titleTire}>
                {tire}
              </span>
            ),
          })}
        </h1>
      </GridItem>
      <GridItem gridColumnM="3/7" gridColumnL="3/12" gridColumnXL="4/11">
        <span css={styles.label}>
          {ui('reviews.form.sections.ratings.rateLabel')}
        </span>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.DRY)}
            initialIndex={formValues.performanceRating[FIELDS.DRY] as number}
            title={ui('reviews.form.sections.ratings.dry')}
            subTitle={
              <span css={styles.subTitle}>{pickerLabels[FIELDS.DRY]}</span>
            }
          />
        </div>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.WET)}
            initialIndex={formValues.performanceRating[FIELDS.WET] as number}
            title={ui('reviews.form.sections.ratings.wet')}
            subTitle={
              <span css={styles.subTitle}>{pickerLabels[FIELDS.WET]}</span>
            }
          />
        </div>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.WINTER)}
            initialIndex={formValues.performanceRating[FIELDS.WINTER] as number}
            title={ui('reviews.form.sections.ratings.winter')}
            subTitle={
              <span css={styles.subTitle}>{pickerLabels[FIELDS.WINTER]}</span>
            }
          />
        </div>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.COMFORT)}
            initialIndex={
              formValues.performanceRating[FIELDS.COMFORT] as number
            }
            title={ui('reviews.form.sections.ratings.comfort')}
            subTitle={
              <span css={styles.subTitle}>{pickerLabels[FIELDS.COMFORT]}</span>
            }
          />
        </div>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.NOISE)}
            initialIndex={formValues.performanceRating[FIELDS.NOISE] as number}
            title={ui('reviews.form.sections.ratings.noise')}
            subTitle={
              <span css={styles.subTitle}>{pickerLabels[FIELDS.NOISE]}</span>
            }
          />
        </div>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.TREADWEAR)}
            initialIndex={
              formValues.performanceRating[FIELDS.TREADWEAR] as number
            }
            title={ui('reviews.form.sections.ratings.treadwear')}
            subTitle={
              <span css={styles.subTitle}>
                {pickerLabels[FIELDS.TREADWEAR]}
              </span>
            }
          />
        </div>

        <form>
          <fieldset css={styles.group}>
            <label htmlFor="review" css={styles.label}>
              {ui('reviews.form.sections.ratings.reviewLabel')}
            </label>
            <Input
              id="review"
              isTextArea
              value={formValues[FIELDS.ADDITIONAL_COMMENTS] as string}
              onChange={handleSetFormFieldValue(FIELDS.ADDITIONAL_COMMENTS)}
              label={ui('reviews.form.sections.ratings.review')}
            />
          </fieldset>
          <fieldset css={styles.group}>
            <h2 css={styles.groupTitle}>
              {ui('reviews.form.sections.about.title')}
            </h2>
            <p css={styles.groupDescription}>
              {ui('reviews.form.sections.about.description')}
            </p>
            <div css={styles.input}>
              <Input
                id="name"
                value={formValues[FIELDS.NAME]}
                onChange={handleSetFormFieldValue(FIELDS.NAME)}
                label={ui('reviews.form.sections.about.name')}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="email"
                value={formValues[FIELDS.EMAIL]}
                onChange={handleSetFormFieldValue(FIELDS.EMAIL)}
                label={ui('reviews.form.sections.about.email')}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="datePurchased"
                value={formValues[FIELDS.PURCHASE_DATE] as string}
                onChange={handleSetFormFieldValue(FIELDS.PURCHASE_DATE)}
                label={ui('reviews.form.sections.about.datePurchased')}
                contextualLabel={ui(
                  'reviews.form.sections.about.datePurchasedContextual',
                )}
              />
            </div>
          </fieldset>

          <fieldset css={styles.group}>
            <h2 css={styles.groupTitle}>
              {ui('reviews.form.sections.vehicle.title')}
            </h2>
            <p css={styles.groupDescription}>
              {ui('reviews.form.sections.vehicle.description')}
            </p>
            <div css={styles.input}>
              <div css={styles.vehicleInput}>
                <Input
                  aria-label={ui('reviews.form.sections.vehicle.search')}
                  id="vehicle"
                  readonly
                  value={formValues[FIELDS.VEHICLE]}
                  onChange={handleSetFormFieldValue(FIELDS.VEHICLE)}
                  label={ui('reviews.form.sections.vehicle.label')}
                />
                {onSearchVehicle && (
                  <button
                    onClick={onSearchVehicle}
                    css={styles.vehicleSearchButton}
                  >
                    <Icon name={ICONS.CHEVRON_RIGHT} />
                  </button>
                )}
              </div>
              <button
                onClick={handleClearVehicle}
                css={styles.vehicleClearSearch}
              >
                {ui('reviews.form.sections.vehicle.clear')}
              </button>
            </div>
          </fieldset>

          <fieldset css={styles.group}>
            <h2 css={styles.groupTitle}>
              {RADIO_GROUPS.AVERAGE_MILES_DRIVEN.title}
            </h2>
            <div css={styles.radioGroup}>
              {RADIO_GROUPS.AVERAGE_MILES_DRIVEN.options.map(
                ({ label, value }) => {
                  return (
                    <TitleRadio
                      activeValue={formValues[FIELDS.AVERAGE_MILES_DRIVEN]}
                      label={label}
                      name="miles"
                      onChange={handleSetFormFieldValue(
                        FIELDS.AVERAGE_MILES_DRIVEN,
                      )}
                      value={value}
                      key={value}
                    />
                  );
                },
              )}
            </div>
          </fieldset>

          <fieldset css={styles.group}>
            <h2 css={styles.groupTitle}>{RADIO_GROUPS.DRIVING_STYLE.title}</h2>
            <div css={styles.radioGroup}>
              {RADIO_GROUPS.DRIVING_STYLE.options.map(({ label, value }) => {
                return (
                  <TitleRadio
                    activeValue={formValues[FIELDS.DRIVING_STYLE]}
                    label={label}
                    name="drivingStyle"
                    onChange={handleSetFormFieldValue(FIELDS.DRIVING_STYLE)}
                    value={value}
                    key={value}
                  />
                );
              })}
            </div>
          </fieldset>

          <fieldset css={styles.group}>
            <h2 css={styles.groupTitle}>
              {RADIO_GROUPS.DRIVING_LOCATION.title}
            </h2>
            <div css={styles.radioGroup}>
              {RADIO_GROUPS.DRIVING_LOCATION.options.map(({ label, value }) => {
                return (
                  <TitleRadio
                    activeValue={formValues[FIELDS.DRIVING_LOCATION]}
                    label={label}
                    name="whereUsed"
                    onChange={handleSetFormFieldValue(FIELDS.DRIVING_LOCATION)}
                    value={value}
                    key={value}
                  />
                );
              })}
            </div>
          </fieldset>

          <fieldset css={styles.group}>
            <h2 css={styles.groupTitle}>{RADIO_GROUPS.BUY_AGAIN.title}</h2>
            <div css={styles.radioGroup}>
              {RADIO_GROUPS.BUY_AGAIN.options.map(({ label, value }) => {
                return (
                  <TitleRadio
                    activeValue={formValues[FIELDS.WOULD_BUY_AGAIN]}
                    label={label}
                    name="wouldBuyAgain"
                    onChange={handleSetFormFieldValue(FIELDS.WOULD_BUY_AGAIN)}
                    value={value}
                    key={value}
                  />
                );
              })}
            </div>
          </fieldset>

          <div css={[styles.group, styles.buttonGroup]}>
            <Button
              css={styles.submitButton}
              isDisabled={!isFormValid}
              onClick={handleFormSubmit}
              type="button"
            >
              {submitText}
            </Button>
          </div>
        </form>
      </GridItem>
    </Grid>
  );
}

export default ReviewForm;
