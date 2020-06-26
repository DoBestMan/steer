import { select, text } from '@storybook/addon-knobs';

import { ICONS } from '~/components/global/Icon/Icon.constants';

import FeaturedInfoModule from './FeaturedInfoModule';

export default {
  component: FeaturedInfoModule,
  title: 'Global/Featured Info Module',
};

export function FeaturedInfoModuleWithKnobs() {
  const copy = text(
    'Copy',
    'Most drivers replace 4 tires. If you had a flat tire, replace at least two.',
  );
  const title = text(
    'Title',
    'Replace tires in pairs for better traction and braking',
  );
  const featureDescription = text('Feature description', 'Pro Tip');
  const icon = select('Icon Name', ICONS, ICONS.QUANTITY_SELECTOR_CAR_TILTED);

  return (
    <FeaturedInfoModule
      copy={copy}
      featureDescription={featureDescription}
      icon={icon}
      title={title}
    />
  );
}
