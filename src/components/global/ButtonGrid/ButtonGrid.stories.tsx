import ButtonGrid from '~/components/global/ButtonGrid/ButtonGrid';
import { buttonGridMock } from '~/components/global/ButtonGrid/ButtonGrid.mock';

export default {
  component: ButtonGrid,
  title: 'Global/Button Grid',
};

export function ButtonNavigationWithGrid() {
  return <ButtonGrid buttonGridList={buttonGridMock} />;
}
