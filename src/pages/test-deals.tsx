import { useSearchContext } from '~/components/modules/Search/Search.context';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';

function FakePromoComponent({
  catalogParams,
  handlePromotionClick,
}: {
  catalogParams: Record<string, string>;
  handlePromotionClick: (parmas: Record<string, string>) => void;
}) {
  function onPromotionClick() {
    handlePromotionClick(catalogParams);
  }
  return (
    <button onClick={onPromotionClick}>Apply Continental Brand Filter</button>
  );
}

function TestDeals() {
  const { setIsSearchOpen, setRouteQueryParamOptions } = useSearchContext();
  function handlePromotionClick(params: Record<string, string>) {
    setRouteQueryParamOptions({
      routes: [
        ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
        ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
      ],
      params,
    });
    setIsSearchOpen(true);
  }
  return (
    <div
      style={{
        height: 800,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FakePromoComponent
        handlePromotionClick={handlePromotionClick}
        catalogParams={{ brand: 'continental' }}
      />
    </div>
  );
}

export default TestDeals;
