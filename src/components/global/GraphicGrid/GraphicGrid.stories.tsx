import { boolean } from '@storybook/addon-knobs';

import GraphicGrid from '~/components/global/GraphicGrid/GraphicGrid';
import { graphicGridItemsMock } from '~/components/global/GraphicGrid/GraphicGrid.mock';

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
    ? graphicGridItemsMock.slice(0, 2)
    : graphicGridItemsMock;
  return <GraphicGrid graphicGridItems={gridItems} />;
}
