import { useCallback } from 'react';

import Car from '~/components/global/Car/Car';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useNavContext } from '~/context/Nav.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
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

export const DATA_ATTRIBUTES = {
  COMPONENT_HEADER_SECTION: 'searchByBoard-header-section',
  COMPONENT_ICON_SECTION: 'searchByBoard-icon-section',
  COMPONENT_MENU: 'searchByBoard-menu',
  COMPONENT_MENU_ITEM: 'searchByBoard-menu-item',
  COMPONENT_NAME: 'searchByBoard',
  COMPONENT_TITLE: 'searchByBoard-title',
};

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
  const { userPersonalizationData } = useUserPersonalizationContext();
  const { createSelectLinkHandler, toggleSubNav } = useNavContext();
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
      <ul
        css={styles.ctaMenu}
        data-component-class={DATA_ATTRIBUTES.COMPONENT_MENU}
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
      </ul>
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
