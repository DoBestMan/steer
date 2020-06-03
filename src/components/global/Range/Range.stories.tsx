import Range from './Range';

export default {
  component: RangeSlider,
  title: 'Range',
};

const styles = {
  root: {
    margin: 'auto',
    paddingTop: 200,
    width: 500,
  },
};
export function RangeSlider() {
  return (
    <div css={styles.root}>
      <Range
        {...{
          max: 100,
          maxDefault: 100,
          maxLabel: '100',
          min: 0,
          minDefault: 0,
          minLabel: '0',
          name: 'Generic range slider',
        }}
      />
    </div>
  );
}

export function RangeWithDefaults() {
  return (
    <div css={styles.root}>
      <Range
        {...{
          max: 100,
          maxDefault: 57,
          maxLabel: '100',
          min: 0,
          minDefault: 15,
          minLabel: '0',
          name: 'Generic range slider',
        }}
      />
    </div>
  );
}

export function RangeMileage() {
  return (
    <div css={styles.root}>
      <Range
        {...{
          formatLabel: (value: number) =>
            value ? `${value.toString().slice(0, -3)}k` : '0',
          getAriaText: (value: number) => `${value} miles`,
          interval: 5000,
          max: 30000,
          maxDefault: 0,
          maxLabel: '100',
          min: 0,
          minDefault: 0,
          minLabel: '0',
          name: 'Warranty mileage',
        }}
      />
    </div>
  );
}
