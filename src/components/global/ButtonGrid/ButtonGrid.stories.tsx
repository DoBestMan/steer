import ButtonGrid from '~/components/global/ButtonGrid/ButtonGrid';
import { ButtonGridMockData } from '~/components/global/ButtonGrid/ButtonGrid.mocks';

export default {
  component: ButtonGrid,
  title: 'Global/Button Grid',
};

export function ButtonNavigationWithGrid() {
  return <ButtonGrid buttonGridList={ButtonGridMockData} />;
}
