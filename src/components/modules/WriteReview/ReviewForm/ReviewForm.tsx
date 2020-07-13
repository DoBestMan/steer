import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HorizontalNumberPicker from '~/components/global/HorizontalNumberPicker/HorizontalPickerNoCarousel';
import Input from '~/components/global/Input/Input';
import TitleRadio from '~/components/global/Radio/TitleRadio';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import {
  FIELDS,
  RADIO_GROUPS,
  RATING_LABELS,
  RATING_OPTIONS,
} from './ReviewForm.constants';
import styles from './ReviewForm.styles';

interface Props {
  tire: string;
}

// Revisit this type during integration - having trouble getting it to work
interface FormValues {
  [name: string]: any;
}

interface FormFieldKey {
  [name: string]: string;
}

function ReviewForm({ tire }: Props) {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const hasRequiredFieldsFilled =
    formValues[FIELDS.DRY.VALUE] !== undefined &&
    formValues[FIELDS.WET.VALUE] !== undefined &&
    formValues[FIELDS.WINTER.VALUE] !== undefined &&
    formValues[FIELDS.COMFORT.VALUE] !== undefined &&
    formValues[FIELDS.NOISE.VALUE] !== undefined &&
    formValues[FIELDS.TREADWEAR.VALUE] !== undefined &&
    formValues[FIELDS.NAME.VALUE] &&
    formValues[FIELDS.EMAIL.VALUE] &&
    formValues[FIELDS.VEHICLE.VALUE] &&
    formValues[FIELDS.MILES.VALUE] &&
    formValues[FIELDS.DRIVING_STYLE.VALUE] &&
    formValues[FIELDS.WHERE_USED.VALUE] &&
    formValues[FIELDS.BUY_AGAIN.VALUE];

  useEffect(() => {
    if (hasRequiredFieldsFilled) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formValues, hasRequiredFieldsFilled]);

  function handleFormSubmit() {
    // TODO: Integrate form
  }

  const handleSelectPickerOption = (field: FormFieldKey) => (
    _value: number | string,
    index: number,
  ) => {
    setFormValues({
      ...formValues,
      [field.VALUE]: index,
      [field.RATING_LABEL]: RATING_LABELS[index],
    });
  };

  const handleSetFormFieldValue = (field: FormFieldKey) => (value: string) => {
    setFormValues({
      ...formValues,
      [field.VALUE]: value,
    });
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
            selectedIndex={formValues[FIELDS.DRY.VALUE]}
            title={ui('reviews.form.sections.ratings.dry')}
            subTitle={
              <span css={styles.subTitle}>
                {formValues[FIELDS.DRY.RATING_LABEL]}
              </span>
            }
          />
        </div>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.WET)}
            selectedIndex={formValues[FIELDS.WET.VALUE]}
            title={ui('reviews.form.sections.ratings.wet')}
            subTitle={
              <span css={styles.subTitle}>
                {formValues[FIELDS.WET.RATING_LABEL]}
              </span>
            }
          />
        </div>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.WINTER)}
            selectedIndex={formValues[FIELDS.WINTER.VALUE]}
            title={ui('reviews.form.sections.ratings.winter')}
            subTitle={
              <span css={styles.subTitle}>
                {formValues[FIELDS.WINTER.RATING_LABEL]}
              </span>
            }
          />
        </div>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.COMFORT)}
            selectedIndex={formValues[FIELDS.COMFORT.VALUE]}
            title={ui('reviews.form.sections.ratings.comfort')}
            subTitle={
              <span css={styles.subTitle}>
                {formValues[FIELDS.COMFORT.RATING_LABEL]}
              </span>
            }
          />
        </div>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.NOISE)}
            selectedIndex={formValues[FIELDS.NOISE.VALUE]}
            title={ui('reviews.form.sections.ratings.noise')}
            subTitle={
              <span css={styles.subTitle}>
                {formValues[FIELDS.NOISE.RATING_LABEL]}
              </span>
            }
          />
        </div>
        <div css={styles.picker}>
          <HorizontalNumberPicker
            customContainerStyles={styles.pickerContainer}
            numbers={RATING_OPTIONS}
            onSelect={handleSelectPickerOption(FIELDS.TREADWEAR)}
            selectedIndex={formValues[FIELDS.TREADWEAR.VALUE]}
            title={ui('reviews.form.sections.ratings.treadwear')}
            subTitle={
              <span css={styles.subTitle}>
                {formValues[FIELDS.TREADWEAR.RATING_LABEL]}
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
              value={formValues[FIELDS.ADDITIONAL_COMMENTS.VALUE]}
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
                value={formValues[FIELDS.NAME.VALUE]}
                onChange={handleSetFormFieldValue(FIELDS.NAME)}
                label={ui('reviews.form.sections.about.name')}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="email"
                value={formValues[FIELDS.EMAIL.VALUE]}
                onChange={handleSetFormFieldValue(FIELDS.EMAIL)}
                label={ui('reviews.form.sections.about.email')}
              />
            </div>
            <div css={styles.input}>
              <Input
                id="datePurchased"
                value={formValues[FIELDS.DATE_PURCHASED.VALUE]}
                onChange={handleSetFormFieldValue(FIELDS.DATE_PURCHASED)}
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
              {/* TODO: hook input up to vehicle search during integration */}
              <Input
                id="vehicle"
                value={formValues[FIELDS.VEHICLE.VALUE]}
                onChange={handleSetFormFieldValue(FIELDS.VEHICLE)}
                label={ui('reviews.form.sections.vehicle.vehicleInfo')}
              />
            </div>
          </fieldset>

          <fieldset css={styles.group}>
            <h2 css={styles.groupTitle}>{RADIO_GROUPS.MILES.title}</h2>
            <div css={styles.radioGroup}>
              {RADIO_GROUPS.MILES.options.map(({ label, value }) => {
                return (
                  <TitleRadio
                    activeValue={formValues[FIELDS.MILES.VALUE]}
                    label={label}
                    name="miles"
                    onChange={handleSetFormFieldValue(FIELDS.MILES)}
                    value={value}
                    key={value}
                  />
                );
              })}
            </div>
          </fieldset>

          <fieldset css={styles.group}>
            <h2 css={styles.groupTitle}>{RADIO_GROUPS.DRIVING_STYLE.title}</h2>
            <div css={styles.radioGroup}>
              {RADIO_GROUPS.DRIVING_STYLE.options.map(({ label, value }) => {
                return (
                  <TitleRadio
                    activeValue={formValues[FIELDS.DRIVING_STYLE.VALUE]}
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
            <h2 css={styles.groupTitle}>{RADIO_GROUPS.WHERE_USED.title}</h2>
            <div css={styles.radioGroup}>
              {RADIO_GROUPS.WHERE_USED.options.map(({ label, value }) => {
                return (
                  <TitleRadio
                    activeValue={formValues[FIELDS.WHERE_USED.VALUE]}
                    label={label}
                    name="whereUsed"
                    onChange={handleSetFormFieldValue(FIELDS.WHERE_USED)}
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
                    activeValue={formValues[FIELDS.BUY_AGAIN.VALUE]}
                    label={label}
                    name="wouldBuyAgain"
                    onChange={handleSetFormFieldValue(FIELDS.BUY_AGAIN)}
                    value={value}
                    key={value}
                  />
                );
              })}
            </div>
          </fieldset>

          <div css={[styles.group, styles.centeredOnMobile]}>
            {/* TODO: implement captcha - WCS-797 */}
            <Button
              css={styles.submitButton}
              isDisabled={!isFormValid}
              onClick={handleFormSubmit}
              type="button"
            >
              {ui('reviews.form.submit')}
            </Button>
          </div>
        </form>
      </GridItem>
    </Grid>
  );
}

export default ReviewForm;
