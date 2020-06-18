import { text } from '@storybook/addon-knobs';
import { useState } from 'react';

import { typography } from '~/styles/typography.styles';

import RadioSelector from './RadioSelector';

export default {
  component: RadioSelector,
  title: 'Global/Radio Selector',
};

export function RadioSelectorDefault() {
  const label = text('Label', 'Remove Coverage');
  const firstValue = 'first-value';
  const secondValue = 'second-value';

  const [activeValue, setIsActive] = useState(firstValue);
  function handleSetIsActive(value: string) {
    setIsActive(value);
  }

  return (
    <div>
      <RadioSelector
        activeValue={activeValue}
        label={label}
        name="radio-selector-default"
        onChange={handleSetIsActive}
        value={firstValue}
      />
      <RadioSelector
        activeValue={activeValue}
        label={label}
        name="radio-selector-default"
        onChange={handleSetIsActive}
        value={secondValue}
      />
    </div>
  );
}

function OuterContent() {
  return <a>Link</a>;
}

export function RadioSelectorContent() {
  const label = text('Label', 'Remove Coverage');
  const firstValue = 'first-value';
  const secondValue = 'second-value';

  const [activeValue, setIsActive] = useState(firstValue);
  function handleSetIsActive(value: string) {
    setIsActive(value);
  }

  return (
    <div>
      <RadioSelector
        activeValue={activeValue}
        label={label}
        name="radio-selector-content"
        onChange={handleSetIsActive}
        value={firstValue}
        outerContent={<OuterContent />}
      >
        <div css={typography.bodyCopyTight}>
          <p>Recommended</p>
          <p>Protection for 3 years</p>
          <p>Replacement up to 100% of the tire cost</p>
        </div>
      </RadioSelector>
      <RadioSelector
        activeValue={activeValue}
        label={label}
        name="radio-selector-content"
        onChange={handleSetIsActive}
        value={secondValue}
      />
    </div>
  );
}
