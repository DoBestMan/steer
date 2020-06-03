import { text } from '@storybook/addon-knobs';

import { default as RecirculationComponent } from './Recirculation';
import { recirculationData } from './Recirculation.mock';

export default {
  component: Recirculation,
  title: 'Catalog recirculation',
};

export function Recirculation() {
  return (
    <RecirculationComponent
      title={text('Title', recirculationData.title)}
      items={recirculationData.items}
      more={recirculationData.more}
    />
  );
}
