import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

const TIRE_SEARCH_STEPS = [
  uiJSX('search.findTireSize.stepOne', {
    link: <a href="#">the sidewall</a>,
  }),
  uiJSX('search.findTireSize.stepTwo', {
    link: <a href="#">inside the frame</a>,
  }),
  uiJSX('search.findTireSize.stepThree', {
    link: <a href="#">the owner&apos;s manual</a>,
  }),
];

export const TIRE_SEARCH_MODAL_DATA = {
  alternateSearch: {
    title: ui('search.findTireSize.alternateSearchTitle'),
    copy: ui('search.findTireSize.alternateSearchCopy'),
    linkText: ui('search.findTireSize.alternateSearchLink'),
    linkURL: '#',
  },
  eyebrow: ui('search.findTireSize.eyebrow'),
  imageAlt: ui('search.findTireSize.imageAlt'),
  imageSrcLg: '/static/assets/search/find-tire-size-lg.png',
  imageSrcSm: '/static/assets/search/find-tire-size-sm.png',
  modalLabel: ui('search.findTireSize.modalLabel'),
  steps: TIRE_SEARCH_STEPS,
  title: ui('search.findTireSize.title'),
};

const VEHICLE_TRIM_STEPS = [
  ui('search.identifyTrim.stepOne'),
  ui('search.identifyTrim.stepTwo'),
  ui('search.identifyTrim.stepThree'),
];

export const VEHICLE_TRIM_MODAL_DATA = {
  alternateSearch: {
    title: ui('search.identifyTrim.alternateSearchTitle'),
    copy: ui('search.identifyTrim.alternateSearchCopy'),
    linkText: ui('search.identifyTrim.alternateSearchLink'),
    linkURL: '#',
  },
  eyebrow: ui('search.identifyTrim.eyebrow'),
  imageAlt: ui('search.identifyTrim.imageAlt'),
  imageSrcLg: '/static/assets/search/vehicle-trim-lg.png',
  imageSrcSm: '/static/assets/search/vehicle-trim-sm.png',
  modalLabel: ui('search.identifyTrim.modalLabel'),
  steps: VEHICLE_TRIM_STEPS,
  title: ui('search.identifyTrim.title'),
};
