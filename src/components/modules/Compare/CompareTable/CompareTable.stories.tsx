import { tableContentFactory } from '../Compare.utils';
import CompareTable from './CompareTable';
import { mockServerData } from './CompareTable.data';

export default {
  component: CompareTable,
  title: 'Compare/CompareTable',
};

export function CompareTableDefault() {
  const mappedTableData = tableContentFactory(
    mockServerData.siteCatalogCompareList,
  );

  return (
    <div>
      {mappedTableData.map(({ caption, columns, data }, index) => (
        <CompareTable
          key={index}
          columns={columns}
          data={data}
          caption={caption}
        />
      ))}
    </div>
  );
}
