import { SiteCompareTable } from '~/data/models/SiteCompareTable';

import CompareTable from '../CompareTable/CompareTable';
import styles from './CompareModal.styles';

interface Props {
  hasScrollbar: boolean;
  removingProductIndex: number;
  tablesData: SiteCompareTable[];
}

function CompareTableList({
  tablesData,
  removingProductIndex,
  hasScrollbar,
}: Props) {
  return (
    <div css={styles.compareTable} id="compare-tables">
      {tablesData.map(({ caption, columns, data }, index) => (
        <CompareTable
          key={index}
          columns={columns}
          data={data}
          caption={caption}
          removingProductIndex={removingProductIndex}
          hasScrollbar={hasScrollbar}
        />
      ))}
    </div>
  );
}

export default CompareTableList;
