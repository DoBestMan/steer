import BillBoard from '~/components/global/BillBoard/BillBoard.container';
import billBoard from '~/components/global/BillBoard/BillBoard.mock';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';

function ModuleTireSearchBillboard() {
  return (
    <div css={styles.spacingTopS60XL80} data-component="module-billboard">
      <BillBoard {...billBoard} />
    </div>
  );
}

export default ModuleTireSearchBillboard;
