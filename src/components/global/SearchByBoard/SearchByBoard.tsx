import Car from '~/components/global/Car/Car';
import Icon from '~/components/global/Icon/Icon';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { isBrowser } from '~/lib/utils/browser';
import { ui } from '~/lib/utils/ui-dictionary';

import { CTA_ICONS, CTA_TYPES } from './SearchByBoard.enums';
import styles from './SearchByBoard.styles';
import { CTAIconTypes } from './SearchByBoard.types';

export interface SearchByBoardProps {
  promotionId?: string;
  title?: string;
}

interface CTA {
  label: string;
  onClick: () => void;
  type: CTAIconTypes;
}

function SearchByBoard({ promotionId, title }: SearchByBoardProps) {
  const {
    lockSearchStateToBrand,
    lockSearchStateToTireSize,
    lockSearchStateToVehicle,
    setRouteQueryParamOptions,
  } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();
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
      label: ui('searchByBoard.vehicle'),
      onClick: () => {
        lockSearchStateToVehicle();
        addPromotionParam(promotionId);
        setIsSearchOpen(true);
      },
      type: CTA_TYPES.VEHICLE,
    },
    {
      label: ui('searchByBoard.tireSize'),
      onClick: () => {
        lockSearchStateToTireSize();
        addPromotionParam(promotionId);
        setIsSearchOpen(true);
      },
      type: CTA_TYPES.TIRE_SIZE,
    },
    {
      label: ui('searchByBoard.brand'),
      onClick: () => {
        lockSearchStateToBrand();
        addPromotionParam(promotionId);
        setIsSearchOpen(true);
      },
      type: CTA_TYPES.BRAND,
    },
  ];
  const iconMap = {
    [CTA_TYPES.BRAND]: <Icon name={CTA_ICONS.ICON_BRANDS_CIRCULAR} />,
    [CTA_TYPES.TIRE_SIZE]: <Icon name={CTA_ICONS.ICON_TIRE_SIZE} />,
    [CTA_TYPES.VEHICLE]: <Car carId={CTA_ICONS.ICON_VEHICLE} />,
  };

  return (
    <div css={styles.container}>
      {title && <p css={styles.title}>{title}</p>}
      <ul css={styles.ctaMenu}>
        {CTAList.map((cta) => (
          <li
            key={cta.type}
            css={styles.ctaMenuItem}
            onClick={cta.onClick}
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
    </div>
  );
}

export default SearchByBoard;
