import { boolean, text } from '@storybook/addon-knobs';

import { COLORS } from '~/lib/constants';

import TechnicalSpecs from './TechnicalSpecs';
import { description, image, sizesList, specList } from './TechnicalSpecs.mock';

export default {
  component: TechnicalSpecs,
  title: 'PDP/Technical Specs',
};

const customerServiceNumber = {
  display: '(888) 410 0604',
  value: '18884100604',
};

export function TechnicalSpecsWithKnobs() {
  const descriptionContent = text('Description', description);
  const isCustomerServiceEnabled = boolean('Is Business Hours', true);
  const hasImage = boolean('Has image?', true);

  return (
    <div css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>
      <TechnicalSpecs
        customerServiceNumber={customerServiceNumber}
        description={descriptionContent}
        image={hasImage ? image : undefined}
        specs={specList}
        sizes={sizesList}
        isCustomerServiceEnabled={isCustomerServiceEnabled}
      />
    </div>
  );
}
