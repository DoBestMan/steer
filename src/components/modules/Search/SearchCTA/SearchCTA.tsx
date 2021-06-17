import React, { useMemo } from 'react';

import Car from '~/components/global/Car/Car';
import Icon from '~/components/global/Icon/Icon';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { SearchSectionProps } from '~/components/modules/Search/SearchSection/SearchSection';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { searchCTACarExclusion } from '~/lib/utils/regex';

import { SearchTypeEnum } from '../Search.types';
import { CTA_ICONS, CTA_TYPES } from './SearchCTA.data';
import styles from './SearchCTA.style';

function SearchCTA({
  type,
  label,
  onClick,
  siteSearchResultList,
}: SearchSectionProps) {
  const { filterPills } = useSearchContext();

  const shouldNotVehicleOptionPresent = useMemo(() => {
    return filterPills.some(
      (filterPill) =>
        filterPill.type === 'tireType' &&
        searchCTACarExclusion.test(filterPill.label),
    );
  }, [filterPills]);

  const handleClick = (searchResult: SiteSearchResultTextItem) => () => {
    if (onClick) {
      onClick(searchResult);
    }
  };

  const iconMap = {
    [CTA_TYPES.BRAND]: <Icon name={CTA_ICONS.ICON_BRANDS_CIRCULAR} />,
    [CTA_TYPES.TIRE_SIZE]: <Icon name={CTA_ICONS.ICON_TIRE_SIZE} />,
    [CTA_TYPES.VEHICLE]: <Car carId={CTA_ICONS.ICON_VEHICLE} />,
    [CTA_TYPES.TYPE]: <Icon name={CTA_ICONS.ICON_TYPE} />,
  };

  const renderCTAs = (siteSearchResultList: SiteSearchResultTextItem[]) =>
    siteSearchResultList.map((cta) => (
      <li
        key={cta.type}
        css={[
          styles.ctaMenuItem,
          filterPills.length > 0 &&
            type === SearchTypeEnum.FILTER &&
            styles.ctaMenuItemDisabled,
          cta.label.toLowerCase() === 'vehicle' &&
            shouldNotVehicleOptionPresent &&
            styles.ctaMenuItemHidden,
        ]}
        onClick={handleClick(cta)}
        role="button"
        tabIndex={0}
      >
        <div css={styles.ctaMenuIcon} data-icon-type={cta.type}>
          {iconMap[cta.label]}
        </div>
        <p css={styles.ctaMenuLabel}>{cta.label}</p>
      </li>
    ));

  return (
    <div css={styles.container}>
      {label && <p css={styles.title}>{label}</p>}
      <ul css={styles.ctaMenu}>{renderCTAs(siteSearchResultList)}</ul>
    </div>
  );
}

export default SearchCTA;
