import {
  DataTableColumnProps,
  DataTableProps,
  DataTableRows,
} from '~/components/global/DataTables/DataTableVertical';
import { SiteVehicleMakeModelList } from '~/data/models/SiteVehicleMakeModelList';

export function mapModelListData(
  list: Array<SiteVehicleMakeModelList>,
): DataTableProps {
  const columns: DataTableColumnProps = {
    columnS: [
      { label: 'Model Year', width: 100 },
      { label: 'Trim & tire size', width: 205 },
    ],
    columnM: [
      { label: 'Model Year', width: 150 },
      { label: 'Trim & tire size', width: 250 },
    ],
    columnL: [
      { label: 'Model Year', width: 200 },
      { label: 'Trim & tire size', width: 300 },
    ],
  };
  const dataItem: Array<DataTableRows> = list.map(
    (item: SiteVehicleMakeModelList) => ({
      dataRow: [
        { label: item.year },
        {
          label: `<p>${item.trim}<br /><b><a href="${item.link.href}">${item.tireSize}</a></b></p>`,
        },
      ],
    }),
  );
  const modelListTableData: DataTableProps = {
    caption: 'Vehicle Model List Table',
    columns,
    data: dataItem,
  };
  return modelListTableData;
}
