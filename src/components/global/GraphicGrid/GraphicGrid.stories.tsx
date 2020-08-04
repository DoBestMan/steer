import { boolean } from '@storybook/addon-knobs';

import GraphicGrid from '~/components/global/GraphicGrid/GraphicGrid';
import { graphicGridItems } from '~/components/global/GraphicGrid/GraphicGrid.mocks';

export default {
  component: GraphicGrid,
  title: 'Global/Graphic grid',
};

export function GraphicGridWithKnobs() {
  const optionsGroupId = 'options';
  const showCondensedGrid = boolean(
    'Show grid with two items',
    false,
    optionsGroupId,
  );
  const gridItems = showCondensedGrid
    ? graphicGridItems.slice(0, 2)
    : graphicGridItems;
  return <GraphicGrid graphicGridItems={gridItems} />;
}
