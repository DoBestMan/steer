import Car from '~/components/global/Car/Car';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { SiteSearchResultActionQuery } from '~/data/models/SiteSearchResultActionQuery';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { isBrowser } from '~/lib/utils/browser';
import { ui } from '~/lib/utils/ui-dictionary';

import { CTA_ICONS, CTA_TYPES } from './SearchByBoard.enums';
import styles from './SearchByBoard.styles';
import { CTAIconTypes } from './SearchByBoard.types';

export interface SearchByBoardProps {
  hasBrand?: boolean;
  hasTireSize?: boolean;
  hasVehicle?: boolean;
  isHomepage?: boolean;
  promotionId?: string;
  title?: string;
}

interface CTA {
  action: SiteSearchResultActionQuery;
  isShow: boolean;
  label: string;
  onClick: (action: SiteSearchResultActionQuery) => () => void;
  type: CTAIconTypes;
}

function SearchByBoard({
  promotionId,
  title,
  hasBrand = true,
  hasTireSize = true,
  hasVehicle = true,
  isHomepage,
}: SearchByBoardProps) {
  const {
    lockSearchStateToBrand,
    lockSearchStateToTireSize,
    lockSearchStateToVehicle,
    setRouteQueryParamOptions,
  } = useSearchContext();
  const { setIsSearchOpen, setCurrentInputQuery } = useSearchModalContext();
  const addPromotionParam = (promoId: string | undefined) => {
    if (!isBrowser() || !promoId) {
      return;
    }

    const params = { promotion: promoId };

    setRouteQueryParamOptions({
      routes: [
        ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
        ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
      ],
      params,
    });
  };
  const CTAList: CTA[] = [
    {
      action: {
        queryText: '',
        queryType: 'vehicle',
        type: 'SiteSearchResultActionQuery',
      },
      isShow: hasVehicle,
      label: ui('searchByBoard.vehicle'),
      onClick: (action: SiteSearchResultActionQuery) => () => {
        lockSearchStateToVehicle();
        addPromotionParam(promotionId);
        setIsSearchOpen(true);
        setCurrentInputQuery({
          queryText: action.queryText,
          queryType: action.queryType,
        });
      },
      type: CTA_TYPES.VEHICLE,
    },
    {
      action: {
        queryText: '',
        queryType: 'tireSize',
        type: 'SiteSearchResultActionQuery',
      },
      isShow: hasTireSize,
      label: ui('searchByBoard.tireSize'),
      onClick: (action: SiteSearchResultActionQuery) => () => {
        lockSearchStateToTireSize();
        addPromotionParam(promotionId);
        setIsSearchOpen(true);
        setCurrentInputQuery({
          queryText: action.queryText,
          queryType: action.queryType,
        });
      },
      type: CTA_TYPES.TIRE_SIZE,
    },
    {
      action: {
        queryText: '',
        queryType: 'brand',
        type: 'SiteSearchResultActionQuery',
      },
      isShow: hasBrand,
      label: ui('searchByBoard.brand'),
      onClick: (action: SiteSearchResultActionQuery) => () => {
        lockSearchStateToBrand();
        addPromotionParam(promotionId);
        setIsSearchOpen(true);
        setCurrentInputQuery({
          queryText: action.queryText,
          queryType: action.queryType,
        });
      },
      type: CTA_TYPES.BRAND,
    },
  ];
  const iconMap = {
    [CTA_TYPES.BRAND]: <Icon name={CTA_ICONS.ICON_BRANDS_CIRCULAR} />,
    [CTA_TYPES.TIRE_SIZE]: <Icon name={CTA_ICONS.ICON_TIRE_SIZE} />,
    [CTA_TYPES.VEHICLE]: <Car carId={CTA_ICONS.ICON_VEHICLE} />,
  };

  const renderCTAList = (
    <>
      {title && <p css={styles.title}>{title}</p>}
      <ul css={styles.ctaMenu}>
        {CTAList.filter((cta) => cta.isShow).map((cta) => (
          <li
            key={cta.type}
            css={styles.ctaMenuItem}
            onClick={cta.onClick(cta.action)}
            role="button"
            tabIndex={0}
          >
            <div css={styles.ctaMenuIcon} data-icon-type={cta.type}>
              {iconMap[cta.type]}
            </div>
            <p css={styles.ctaMenuLabel}>{cta.label}</p>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div css={[styles.container, isHomepage && styles.homepageContainer]}>
      {isHomepage ? (
        renderCTAList
      ) : (
        <Grid>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            {renderCTAList}
          </GridItem>
        </Grid>
      )}
    </div>
  );
}

export default SearchByBoard;
