import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteCompareTable } from '~/data/models/SiteCompareTable';
import { SiteCompareTableColumn } from '~/data/models/SiteCompareTableColumn';
import { SiteProductLineSizeDetailRoadHazard } from '~/data/models/SiteProductLineSizeDetailRoadHazard';

/**
 *
 * @param products a list of product to be compared
 * @return data in the form of table
 */

const compactArray = <T extends unknown>(array: Array<T>) => {
  const filtered = array.filter(function (el) {
    return !!el;
  });

  return filtered;
};

const generableTableColumns = ['Price', 'Warranty', 'Category'];

export const tableContentFactory = (
  products: Array<SiteCatalogProductItem>,
): Array<SiteCompareTable> => {
  const generalTable: SiteCompareTable = {
    caption: '',
    columns: [{ description: '', label: 'Price', type: 'priceWithPromotion' }],
    data: [[], [], []],
  };

  const ratingTable: SiteCompareTable = {
    caption: 'Customer Ratings (out of 5)',
    columns: [],
    data: [],
  };

  const specTable: SiteCompareTable = {
    caption: 'Techincal specs',
    columns: [],
    data: [],
  };

  products.forEach((product, i) => {
    //for generaleTable
    const promotion = product.siteCatalogPromotionInfo?.list[0];

    generalTable.data[0].push({
      value: product.priceList,
      promotion,
    });

    // for ratingTable
    if (i === 0 && product.rating) {
      ratingTable.columns.push({
        description: '',
        label: 'Overall customer rating',
        type: 'rating',
      });
    }

    if (product.rating) {
      if (!ratingTable.data[0]) {
        ratingTable.data.push([]);
      }
      ratingTable.data[0].push({
        value: product.rating?.value as number,
        quantity: product.rating?.quantity,
      });
    }

    product.performanceRatingList.forEach((rating, j) => {
      if (i === 0) {
        ratingTable.columns.push({
          description: '',
          label: rating.label,
          type: 'bar',
        });
      }

      if (!ratingTable.data[j + 1]) {
        ratingTable.data[j + 1] = [];
      }
      ratingTable.data[j + 1].push({
        value: rating.value,
      });
    });

    // for tech specs table
    for (let j = 0; j < product.specList.length; j += 1) {
      const index = generableTableColumns.indexOf(product.specList[j].label);
      if (i === 0) {
        const column = {
          description: product.specList[j].description,
          label: product.specList[j].label,
          type: 'text',
        } as SiteCompareTableColumn;

        if (index > -1) {
          generalTable.columns.push(column);
        } else {
          specTable.columns.push(column);
        }
      }

      if (index > -1) {
        generalTable.data[index].push({
          value: product.specList[j].value,
        });
        continue;
      }

      if (!specTable.data[j]) {
        specTable.data[j] = [];
      }
      specTable.data[j].push({
        value: product.specList[j].value,
      });
    }
  });

  specTable.data = compactArray(specTable.data);

  return [generalTable, ratingTable, specTable];
};

export const removeColumnFromTable = (
  tableData: SiteCompareTable,
  index: number,
): SiteCompareTable => {
  const { data, columns, caption } = JSON.parse(
    JSON.stringify(tableData),
  ) as SiteCompareTable;

  data.forEach((row) => {
    row.splice(index, 1);
  });

  return { caption, columns, data } as SiteCompareTable;
};

export const mapDataToRoadHazard = ({
  roadHazard,
  quantity,
}: {
  quantity: { front: number; rear?: number };
  roadHazard: SiteProductLineSizeDetailRoadHazard | null | undefined;
}) => {
  if (!roadHazard) {
    return null;
  }

  return {
    durationLabel: roadHazard.durationLabel,
    price: (
      quantity.front * parseInt(roadHazard.pricePerTireInCents)
    ).toString(),
  };
};
