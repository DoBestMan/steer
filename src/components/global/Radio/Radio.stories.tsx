import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { useState } from 'react';

import { SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { default as RadioSelector } from './RadioSelector';
import { default as TitleRadioComponent } from './TitleRadio';

export default {
  component: TitleRadio,
  title: 'Global/Radio',
};

export function TitleRadio() {
  const active = boolean('Active', true);
  return (
    <TitleRadioComponent
      label={text('Label', 'Radio label')}
      description={text(
        'Description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      )}
      name="radio"
      flair={text('Flair', 'Flair text')}
      count={number('Results count', 0)}
      activeValue={active ? 'value' : ''}
      value="value"
      onChange={action('Click radio')}
      isDisabled={boolean('Disabled', false)}
    />
  );
}

export function TitleRadioGroup() {
  const [activeValue, setActiveValue] = useState('value-1');
  return (
    <>
      <div css={{ marginBottom: SPACING.SIZE_15 }}>
        <TitleRadioComponent
          label="First radio label"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          name="radio"
          flair={null}
          count={12}
          activeValue={activeValue}
          value="value-1"
          onChange={setActiveValue}
          isDisabled={false}
        />
      </div>
      <TitleRadioComponent
        label="Second radio label"
        description={null}
        name="radio"
        flair="Flair text"
        count={0}
        activeValue={activeValue}
        value="value-2"
        onChange={setActiveValue}
        isDisabled={false}
      />
    </>
  );
}

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
