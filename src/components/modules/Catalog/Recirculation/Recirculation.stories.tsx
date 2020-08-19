import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import { default as RecirculationComponent } from './Recirculation';
import { recirculationMock } from './Recirculation.mock';

export default {
  component: Recirculation,
  title: 'Catalog/Grid/Recirculation',
};

export function Recirculation() {
  return (
    <RecirculationComponent
      title={text('Title', recirculationMock.title)}
      items={recirculationMock.items}
      more={recirculationMock.more}
      handleUpdateResults={action('Clicked item')}
    />
  );
}
