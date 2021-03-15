import { useCallback } from 'react';

import Car from '~/components/global/Car/Car';
import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useTireSnapModalContext } from '~/components/modules/TireSnap/TireSnapModal.context';
import { useNavContext } from '~/context/Nav.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteSearchResultActionQuery } from '~/data/models/SiteSearchResultActionQuery';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { FS_EVENT_NAMES } from '~/lib/constants/fullstory';
import { setFSCustomEvent } from '~/lib/helpers/fullstory';
import { isBrowser } from '~/lib/utils/browser';
import { ui } from '~/lib/utils/ui-dictionary';

import { CTA_ICONS, CTA_TYPES } from './SearchByBoard.enums';
import styles from './SearchByBoard.styles';
import { CTAIconTypes } from './SearchByBoard.types';

export interface SearchByBoardProps {
  hasBrand?: boolean;
  hasTireSize?: boolean;
  hasTireType?: boolean;
  hasVehicle?: boolean;
  isHomepage?: boolean;
  params?: Record<string, string>;
  promotionId?: string;
  queryParamLabel?: string;
  title?: string;
  vehicleName?: string;
}

interface CTA {
  action: SiteSearchResultActionQuery;
  isShow?: boolean;
  label: string;
  onClick: (action: SiteSearchResultActionQuery) => () => void;
  type: CTAIconTypes;
}

export const DATA_ATTRIBUTES = {
  COMPONENT_HEADER_SECTION: 'searchByBoard-header-section',
  COMPONENT_ICON_SECTION: 'searchByBoard-icon-section',
  COMPONENT_MENU: 'searchByBoard-menu',
  COMPONENT_MENU_ITEM: 'searchByBoard-menu-item',
  COMPONENT_NAME: 'searchByBoard',
  COMPONENT_TITLE: 'searchByBoard-title',
};

function SearchByBoard({
  hasBrand = true,
  hasTireSize = true,
  hasVehicle = true,
  hasTireType = true,
  isHomepage,
  params,
  queryParamLabel,
  promotionId,
  title = ui('searchByBoard.title'),
  vehicleName,
}: SearchByBoardProps) {
  const {
    lockSearchStateToBrand,
    lockSearchStateToTireSize,
    lockSearchStateToVehicle,
    lockSearchStateToTireType,
    setQueryParamLabel,
    setRouteQueryParamOptions,
  } = useSearchContext();
  const { setIsSearchOpen, setCurrentInputQuery } = useSearchModalContext();
  const { setIsTireSnapOpen } = useTireSnapModalContext();
  const { userPersonalizationData } = useUserPersonalizationContext();
  const { createSelectLinkHandler, toggleSubNav } = useNavContext();
  const { isMobile } = useBreakpoints();
  const showSimpleSnap = isMobile ? true : false;

  const handleLocationClick = useCallback(() => {
    const linkHandler = createSelectLinkHandler({
      target: NAV_TARGETS.LOCATION,
    });

    if (!linkHandler) {
      return;
    }

    linkHandler();
    toggleSubNav();
  }, [createSelectLinkHandler, toggleSubNav]);
  const sendFSCustomEvent = (searchItem: string) => {
    setFSCustomEvent(FS_EVENT_NAMES.SEARCH_BY_BOARD, {
      searchItem,
    });
  };
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
    setQueryParamLabel(queryParamLabel);
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
        if (params) {
          setRouteQueryParamOptions({
            routes: [
              ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
              ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
            ],
            params,
          });
          setQueryParamLabel(queryParamLabel);
          sendFSCustomEvent(CTA_TYPES.VEHICLE);
        }
        setCurrentInputQuery({
          queryText: vehicleName ? vehicleName : action.queryText,
          queryType: action.queryType,
        });
        lockSearchStateToVehicle(vehicleName);
        addPromotionParam(promotionId);
        setIsSearchOpen(true);
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
        if (params) {
          setRouteQueryParamOptions({
            routes: [
              ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
              ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
            ],
            params,
          });
          setQueryParamLabel(queryParamLabel);
        }
        lockSearchStateToTireSize();
        addPromotionParam(promotionId);
        setIsSearchOpen(true);
        setCurrentInputQuery({
          queryText: action.queryText,
          queryType: action.queryType,
        });
        sendFSCustomEvent(CTA_TYPES.TIRE_SIZE);
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
        params &&
          setRouteQueryParamOptions({
            routes: [
              ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
              ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
            ],
            params,
          });
        lockSearchStateToBrand();
        addPromotionParam(promotionId);
        setIsSearchOpen(true);
        setCurrentInputQuery({
          queryText: action.queryText,
          queryType: action.queryType,
        });
        sendFSCustomEvent(CTA_TYPES.BRAND);
      },
      type: CTA_TYPES.BRAND,
    },
    {
      action: {
        queryText: '',
        queryType: 'tireType',
        type: 'SiteSearchResultActionQuery',
      },
      isShow: hasTireType,
      label: ui('searchByBoard.tireType'),
      onClick: (action: SiteSearchResultActionQuery) => () => {
        lockSearchStateToTireType();
        addPromotionParam(promotionId);
        setIsSearchOpen(true);
        sendFSCustomEvent(CTA_TYPES.TYPE);
        setCurrentInputQuery({
          queryText: action.queryText,
          queryType: action.queryType,
        });
      },
      type: CTA_TYPES.TYPE,
    },
    {
      action: {
        queryText: '',
        queryType: 'simplesnap',
        type: 'SiteSearchResultActionQuery',
      },
      isShow: showSimpleSnap,
      label: ui('searchByBoard.tireSnap'),
      onClick: () => () => {
        setIsTireSnapOpen(true);
        sendFSCustomEvent(CTA_TYPES.SIMPLE_SNAP);
      },
      type: CTA_TYPES.SIMPLE_SNAP,
    },
  ];
  const iconMap = {
    [CTA_TYPES.SIMPLE_SNAP]: <Icon name={CTA_ICONS.ICON_SIMPLE_SNAP} />,
    [CTA_TYPES.BRAND]: <Icon name={CTA_ICONS.ICON_BRANDS_CIRCULAR} />,
    [CTA_TYPES.TIRE_SIZE]: <Icon name={CTA_ICONS.ICON_TIRE_SIZE} />,
    [CTA_TYPES.VEHICLE]: <Car carId={CTA_ICONS.ICON_VEHICLE} />,
    [CTA_TYPES.TYPE]: <Icon name={CTA_ICONS.ICON_TYPE} />,
  };

  const renderCTAList = (
    <>
      <div
        css={styles.headerSection}
        data-component-class={DATA_ATTRIBUTES.COMPONENT_HEADER_SECTION}
      >
        {title && (
          <p
            css={styles.title}
            data-component-class={DATA_ATTRIBUTES.COMPONENT_TITLE}
          >
            {title}
          </p>
        )}
        <div
          css={styles.zipSection}
          onClick={handleLocationClick}
          role="button"
          tabIndex={0}
        >
          <Icon css={styles.locationIcon} name={ICONS.LOCATION} />
          {userPersonalizationData?.userLocation?.zip && (
            <p>
              {ui('searchByBoard.zipSectionLabel')}{' '}
              <span css={styles.zipLabel}>
                {' '}
                {userPersonalizationData?.userLocation?.zip}
              </span>
            </p>
          )}
        </div>
      </div>
      <Carousel
        css={styles.ctaMenu}
        WrapperEl={'ul' as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        freeScroll
        data-component-class={DATA_ATTRIBUTES.COMPONENT_MENU}
        rebuildOnUpdate
      >
        {CTAList.filter((cta) => cta.isShow).map((cta) => (
          <li
            key={cta.type}
            css={styles.ctaMenuItem}
            data-component-class={DATA_ATTRIBUTES.COMPONENT_MENU_ITEM}
            onClick={cta.onClick(cta.action)}
            role="button"
            tabIndex={0}
          >
            <div
              css={styles.ctaMenuIcon}
              data-icon-type={cta.type}
              data-component-class={DATA_ATTRIBUTES.COMPONENT_ICON_SECTION}
            >
              {iconMap[cta.type]}
            </div>
            <p css={styles.ctaMenuLabel}>{cta.label}</p>
          </li>
        ))}
      </Carousel>
    </>
  );

  return (
    <div
      css={[styles.container, isHomepage && styles.homepageContainer]}
      data-component={DATA_ATTRIBUTES.COMPONENT_NAME}
    >
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
