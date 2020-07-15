import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import { COLORS } from '~/lib/constants';

import TechnicalSpecs from './TechnicalSpecs';
import { description, image, sizesList, specList } from './TechnicalSpecs.mock';

export default {
  component: TechnicalSpecs,
  title: 'PDP/Technical Specs',
};

export function TechnicalSpecsWithKnobs() {
  const descriptionContent = text('Description', description);
  const hasImage = boolean('Has image?', true);

  return (
    <div css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>
      <TechnicalSpecs
        description={descriptionContent}
        image={hasImage ? image : undefined}
        specs={specList}
        sizes={sizesList}
        openStaticModal={action('Open modal')}
      />
    </div>
  );
}
