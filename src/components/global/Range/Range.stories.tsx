import { useState } from 'react';

import {
  mapUnitToLabelFormatter,
  UNITS,
} from '~/components/modules/Catalog/Filters/Filters.constants';
import { abbreviateThousand } from '~/lib/utils/string';

import Range from './Range';

export default {
  component: RangeSlider,
  title: 'Global/Range',
};

const styles = {
  root: {
    margin: 'auto',
    paddingTop: 200,
    width: 500,
  },
};

export function RangeSlider() {
  const [minCurrent, setMinCurrent] = useState(0);
  const [maxCurrent, setMaxCurrent] = useState(100);

  return (
    <div css={styles.root}>
      <Range
        {...{
          max: 100,
          maxCurrent,
          min: 0,
          minCurrent,
          name: 'Generic range slider',
          onMaxChange: setMaxCurrent,
          onMinChange: setMinCurrent,
        }}
      />
    </div>
  );
}

export function RangeWithDefaults() {
  const [minCurrent, setMinCurrent] = useState(15);
  const [maxCurrent, setMaxCurrent] = useState(57);

  return (
    <div css={styles.root}>
      <Range
        {...{
          max: 100,
          maxCurrent,
          min: 0,
          minCurrent,
          name: 'Generic range slider',
          onMaxChange: setMaxCurrent,
          onMinChange: setMinCurrent,
        }}
      />
    </div>
  );
}

export function RangeWithGraph() {
  const [minCurrent, setMinCurrent] = useState(0);
  const [maxCurrent, setMaxCurrent] = useState(100);

  return (
    <div css={styles.root}>
      <Range
        {...{
          hasGraph: true,
          max: 100,
          maxCurrent,
          min: 0,
          minCurrent,
          name: 'Generic range slider',
          onMaxChange: setMaxCurrent,
          onMinChange: setMinCurrent,
        }}
      />
    </div>
  );
}

export function RangeMileage() {
  const [minCurrent, setMinCurrent] = useState(0);
  const [maxCurrent, setMaxCurrent] = useState(30000);

  return (
    <div css={styles.root}>
      <Range
        {...{
          formatLabel: mapUnitToLabelFormatter[UNITS.MILES],
          getAriaText: abbreviateThousand,
          interval: 5000,
          max: 30000,
          maxCurrent,
          min: 0,
          minCurrent,
          name: 'Warranty mileage',
          onMaxChange: setMaxCurrent,
          onMinChange: setMinCurrent,
        }}
      />
    </div>
  );
}
