import { abbreviateThousand } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

export const UNITS: Record<string, string> = {
  USD: 'UnitUSD',
  MILES: 'UnitMiles',
};

export const mapUnitToAriaFormatter = {
  [UNITS.USD]: (value: number) => `$${value}`,
  [UNITS.MILES]: (value: number) =>
    `${value} ${ui('catalog.filters.milesAbbr')}`,
};

export const mapUnitToLabelFormatter = {
  [UNITS.USD]: (value: number) => `$${value}`,
  [UNITS.MILES]: (value: number) =>
    `${abbreviateThousand(value)} ${ui('catalog.filters.milesAbbr')}`,
};
