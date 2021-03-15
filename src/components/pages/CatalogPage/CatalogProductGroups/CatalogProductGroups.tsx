import ProductGroupList from '~/components/global/ProductGroupList/ProductGroupList';
import ProductGroupListPlaceholder from '~/components/global/ProductGroupList/ProductGroupListPlaceholder';
import { addHashForScroll } from '~/components/pages/CatalogPage/CatalogPage.helpers';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import {
  SiteCatalogProductGroupItemEnum,
  SiteCatalogProductGroupList,
} from '~/data/models/SiteCatalogProductGroupList';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './CatalogProductGroups.styles';

interface Props {
  hasTopPicks: boolean;
  isLoading?: boolean;
  productGroupList: SiteCatalogProductGroupList;
}

function CatalogProductGroups({
  productGroupList,
  isLoading,
  hasTopPicks,
}: Props) {
  const {
    handleUpdateResults,
    siteCatalogProducts,
  } = useCatalogProductsContext();
  const { siteCatalogSummary } = useCatalogSummaryContext();
  const filteredTopPicks = (
    siteCatalogSummary.siteCatalogSummaryTopPicksList || []
  ).filter((topPick) => !!topPick.product);

  const handleClick = (groupId: string) => () => {
    addHashForScroll(groupId);
  };

  return (
    <div css={styles.root}>
      {isLoading ? (
        Array(3)
          .fill({})
          .map((_, i) => (
            <div css={styles.group} key={i}>
              <ProductGroupListPlaceholder />
            </div>
          ))
      ) : (
        <>
          {hasTopPicks && siteCatalogProducts && (
            <div
              data-scroll-id="top"
              css={styles.group}
              onClick={handleClick('top')}
            >
              <ProductGroupList
                id="top"
                name={ui('catalog.topPicks.title', {
                  count: filteredTopPicks.length,
                  name: (
                    siteCatalogProducts.siteCatalogProductsMeta.title || ''
                  )
                    .split(' ')
                    .slice(3)
                    .join(' '),
                })}
                description={ui('catalog.topPicks.description')}
                type={
                  SiteCatalogProductGroupItemEnum.SiteCatalogProductGroupItem
                }
                icon={null}
                productList={filteredTopPicks.map(
                  (topPick) =>
                    ({
                      ...topPick.product,
                      ctaLabel: topPick.ctaLabel,
                    } as SiteCatalogProductItem),
                )}
                siteCatalogSummary={siteCatalogSummary}
                siteQueryParams={null}
                isTopPicksGroup
              />
            </div>
          )}
          {productGroupList.map((group) => (
            <div
              data-scroll-id={`${group.id}`}
              key={group.id}
              css={styles.group}
              onClick={handleClick(group.id)}
            >
              <ProductGroupList
                onClick={handleUpdateResults}
                isTopPicksGroup={false}
                {...group}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CatalogProductGroups;
