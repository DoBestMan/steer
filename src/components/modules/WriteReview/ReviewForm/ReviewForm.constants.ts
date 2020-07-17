import {
  SiteProductLineReviewItemInputAverageMilesDriven,
  SiteProductLineReviewItemInputDrivingLocation,
  SiteProductLineReviewItemInputDrivingStyle,
} from '~/data/models/SiteProductLineReviewItemInput';
import { ui } from '~/lib/utils/ui-dictionary';

export const RATING_NOT_APPLICABLE = 'NA';
export const RATING_OPTIONS = [1, 2, 3, 4, 5, RATING_NOT_APPLICABLE];

export const RATING_LABELS = [
  ui('reviews.form.sections.ratings.labels.one'),
  ui('reviews.form.sections.ratings.labels.two'),
  ui('reviews.form.sections.ratings.labels.three'),
  ui('reviews.form.sections.ratings.labels.four'),
  ui('reviews.form.sections.ratings.labels.five'),
  ui('reviews.form.sections.ratings.labels.na'),
];

export enum FIELDS {
  ADDITIONAL_COMMENTS = 'additionalComments',
  AVERAGE_MILES_DRIVEN = 'averageMilesDriven',
  COMFORT = 'comfort',
  DRIVING_LOCATION = 'drivingLocation',
  DRIVING_STYLE = 'drivingStyle',
  DRY = 'dry',
  EMAIL = 'email',
  NAME = 'name',
  NOISE = 'noise',
  PURCHASE_DATE = 'purchaseDate',
  TOKEN = 'token',
  TREADWEAR = 'treadwear',
  VEHICLE = 'vehicle',
  WET = 'wet',
  WINTER = 'winter',
  WOULD_BUY_AGAIN = 'wouldBuyAgain',
}

export const RADIO_GROUPS = {
  AVERAGE_MILES_DRIVEN: {
    title: ui('reviews.form.sections.miles.title'),
    options: [
      {
        label: ui('reviews.form.sections.miles.options.one'),
        value: SiteProductLineReviewItemInputAverageMilesDriven.Miles5000,
      },
      {
        label: ui('reviews.form.sections.miles.options.two'),
        value: SiteProductLineReviewItemInputAverageMilesDriven.Miles9999,
      },
      {
        label: ui('reviews.form.sections.miles.options.three'),
        value: SiteProductLineReviewItemInputAverageMilesDriven.Miles14999,
      },
      {
        label: ui('reviews.form.sections.miles.options.four'),
        value: SiteProductLineReviewItemInputAverageMilesDriven.Miles19999,
      },
      {
        label: ui('reviews.form.sections.miles.options.five'),
        value: SiteProductLineReviewItemInputAverageMilesDriven.Miles29999,
      },
      {
        label: ui('reviews.form.sections.miles.options.six'),
        value: SiteProductLineReviewItemInputAverageMilesDriven.Miles39999,
      },
    ],
  },
  DRIVING_STYLE: {
    title: ui('reviews.form.sections.drivingStyle.title'),
    options: [
      {
        label: ui('reviews.form.sections.drivingStyle.options.one'),
        value: SiteProductLineReviewItemInputDrivingStyle.Cautious,
      },
      {
        label: ui('reviews.form.sections.drivingStyle.options.two'),
        value: SiteProductLineReviewItemInputDrivingStyle.Confident,
      },
      {
        label: ui('reviews.form.sections.drivingStyle.options.three'),
        value: SiteProductLineReviewItemInputDrivingStyle.Aggressive,
      },
      {
        label: ui('reviews.form.sections.drivingStyle.options.four'),
        value: SiteProductLineReviewItemInputDrivingStyle.Extreme,
      },
    ],
  },
  DRIVING_LOCATION: {
    title: ui('reviews.form.sections.whereUsed.title'),
    options: [
      {
        label: ui('reviews.form.sections.whereUsed.options.one'),
        value: SiteProductLineReviewItemInputDrivingLocation.AllHighway,
      },
      {
        label: ui('reviews.form.sections.whereUsed.options.two'),
        value: SiteProductLineReviewItemInputDrivingLocation.MostlyCity,
      },
      {
        label: ui('reviews.form.sections.whereUsed.options.three'),
        value:
          SiteProductLineReviewItemInputDrivingLocation.CombinedHighwayCity,
      },
      {
        label: ui('reviews.form.sections.whereUsed.options.four'),
        value: SiteProductLineReviewItemInputDrivingLocation.TrackAutocross,
      },
      {
        label: ui('reviews.form.sections.whereUsed.options.five'),
        value: SiteProductLineReviewItemInputDrivingLocation.RuralRoads,
      },
      {
        label: ui('reviews.form.sections.whereUsed.options.six'),
        value: SiteProductLineReviewItemInputDrivingLocation.OffRoad,
      },
    ],
  },
  BUY_AGAIN: {
    title: ui('reviews.form.sections.buyAgain.title'),
    options: [
      {
        label: ui('reviews.form.sections.buyAgain.options.yes'),
        value: ui('reviews.form.sections.buyAgain.options.yes'),
      },
      {
        label: ui('reviews.form.sections.buyAgain.options.no'),
        value: ui('reviews.form.sections.buyAgain.options.no'),
      },
    ],
  },
};
