import { ui } from '~/lib/utils/ui-dictionary';

export const RATING_OPTIONS = [1, 2, 3, 4, 5, 'NA'];

export const RATING_LABELS = [
  ui('reviews.form.sections.ratings.labels.one'),
  ui('reviews.form.sections.ratings.labels.two'),
  ui('reviews.form.sections.ratings.labels.three'),
  ui('reviews.form.sections.ratings.labels.four'),
  ui('reviews.form.sections.ratings.labels.five'),
  ui('reviews.form.sections.ratings.labels.na'),
];

export const RADIO_GROUPS = {
  MILES: {
    title: ui('reviews.form.sections.miles.title'),
    options: [
      {
        label: ui('reviews.form.sections.miles.options.one'),
        value: ui('reviews.form.sections.miles.options.one'),
      },
      {
        label: ui('reviews.form.sections.miles.options.two'),
        value: ui('reviews.form.sections.miles.options.two'),
      },
      {
        label: ui('reviews.form.sections.miles.options.three'),
        value: ui('reviews.form.sections.miles.options.three'),
      },
      {
        label: ui('reviews.form.sections.miles.options.four'),
        value: ui('reviews.form.sections.miles.options.four'),
      },
      {
        label: ui('reviews.form.sections.miles.options.five'),
        value: ui('reviews.form.sections.miles.options.five'),
      },
      {
        label: ui('reviews.form.sections.miles.options.six'),
        value: ui('reviews.form.sections.miles.options.six'),
      },
    ],
  },
  DRIVING_STYLE: {
    title: ui('reviews.form.sections.drivingStyle.title'),
    options: [
      {
        label: ui('reviews.form.sections.drivingStyle.options.one'),
        value: ui('reviews.form.sections.drivingStyle.options.one'),
      },
      {
        label: ui('reviews.form.sections.drivingStyle.options.two'),
        value: ui('reviews.form.sections.drivingStyle.options.two'),
      },
      {
        label: ui('reviews.form.sections.drivingStyle.options.three'),
        value: ui('reviews.form.sections.drivingStyle.options.three'),
      },
      {
        label: ui('reviews.form.sections.drivingStyle.options.four'),
        value: ui('reviews.form.sections.drivingStyle.options.four'),
      },
    ],
  },
  WHERE_USED: {
    title: ui('reviews.form.sections.whereUsed.title'),
    options: [
      {
        label: ui('reviews.form.sections.whereUsed.options.one'),
        value: ui('reviews.form.sections.whereUsed.options.one'),
      },
      {
        label: ui('reviews.form.sections.whereUsed.options.two'),
        value: ui('reviews.form.sections.whereUsed.options.two'),
      },
      {
        label: ui('reviews.form.sections.whereUsed.options.three'),
        value: ui('reviews.form.sections.whereUsed.options.three'),
      },
      {
        label: ui('reviews.form.sections.whereUsed.options.four'),
        value: ui('reviews.form.sections.whereUsed.options.four'),
      },
      {
        label: ui('reviews.form.sections.whereUsed.options.five'),
        value: ui('reviews.form.sections.whereUsed.options.five'),
      },
      {
        label: ui('reviews.form.sections.whereUsed.options.six'),
        value: ui('reviews.form.sections.whereUsed.options.six'),
      },
    ],
  },
  BUY_AGAIN: {
    title: ui('reviews.form.sections.buyAgain.title'),
    options: [
      {
        label: ui('reviews.form.sections.buyAgain.options.one'),
        value: ui('reviews.form.sections.buyAgain.options.one'),
      },
      {
        label: ui('reviews.form.sections.buyAgain.options.two'),
        value: ui('reviews.form.sections.buyAgain.options.two'),
      },
    ],
  },
};

export const FIELDS = {
  ADDITIONAL_COMMENTS: {
    VALUE: 'ADDITIONAL_COMMENTS_VALUE',
  },
  BUY_AGAIN: {
    VALUE: 'BUY_AGAIN_VALUE',
  },
  COMFORT: {
    VALUE: 'COMFORT_VALUE',
    RATING_LABEL: 'COMFORT_RATING_LABEL',
  },
  DATE_PURCHASED: {
    VALUE: 'DATE_PURCHASED_VALUE',
  },
  DRIVING_STYLE: {
    VALUE: 'DRIVING_STYLE_VALUE',
  },
  DRY: {
    VALUE: 'DRY_VALUE',
    RATING_LABEL: 'DRY_RATING_LABEL',
  },
  EMAIL: {
    VALUE: 'EMAIL_VALUE',
  },
  MILES: {
    VALUE: 'MILES_VALUE',
  },
  NAME: {
    VALUE: 'NAME_VALUE',
  },
  NOISE: {
    VALUE: 'NOISE_VALUE',
    RATING_LABEL: 'NOISE_RATING_LABEL',
  },
  TREADWEAR: {
    VALUE: 'TREADWEAR_VALUE',
    RATING_LABEL: 'TREADWEAR_RATING_LABEL',
  },
  VEHICLE: {
    VALUE: 'VEHICLE_VALUE',
  },
  WET: {
    VALUE: 'WET_VALUE',
    RATING_LABEL: 'WET_RATING_LABEL',
  },
  WHERE_USED: {
    VALUE: 'WHERE_USED_VALUE',
  },
  WINTER: {
    VALUE: 'WINTER_VALUE',
    RATING_LABEL: 'WINTER_RATING_LABEL',
  },
};
