import BillBoard from './BillBoard';
import billBoard from './BillBoard.mock';

export default {
  component: BillBoard,
  title: 'Global/BillBoard',
};

export function DefaultBillBoard() {
  return <BillBoard {...billBoard} />;
}
