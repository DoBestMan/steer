import { useTheme } from '@emotion/react';
import React, { ReactNode, useState } from 'react';

import Link from '~/components/global/Link/Link';
import { useFiltersContext } from '~/components/modules/Catalog/Filters/Filters.context';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { LINK_ICON_POSITION, LINK_TYPES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import LocationModal from '../../Location/LocationModal/LocationModal';
import styles from '../Header.styles';

interface Props {
  isInternal?: boolean;
  location: string;
  sizeList?: string[];
  title: string | ReactNode;
}

export default function HeaderInfo({
  isInternal = false,
  location,
  sizeList = [],
  title,
}: Props) {
  const {
    handleUpdateResults,
    pastFilters,
    setPastFilters,
  } = useCatalogProductsContext();
  const { setFiltersToApply } = useFiltersContext();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  function toggleLocation() {
    setIsLocationModalOpen(!isLocationModalOpen);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { header }: any = useTheme();

  const infoStyles = [styles.info];

  const handleBack = () => {
    const newPastFilters = pastFilters.slice();
    const currentFilter: Record<
      string,
      string
    > = newPastFilters.pop() as Record<string, string>;
    const newFilter: Record<string, string> =
      newPastFilters[newPastFilters.length - 1];

    Object.keys(currentFilter).forEach((key: string) => {
      if (!newFilter[key]) {
        newFilter[key] = '';
      }
    });
    setFiltersToApply(newFilter);
    handleUpdateResults(newFilter, false, true).then(() => {
      setPastFilters(newPastFilters);
    });
  };

  const locationEl = (
    <div css={infoStyles}>
      <Link
        onClick={toggleLocation}
        as={LINK_TYPES.BUTTON}
        css={[styles.link, styles.info, header.text]}
        data-testid="catalog-header-location"
      >
        {location}
      </Link>
    </div>
  );

  let secondItem, thirdItem;
  if (sizeList[1]) {
    secondItem = sizeList[1];
    thirdItem = locationEl;
  } else {
    secondItem = locationEl;
    thirdItem = null;
  }

  return (
    <>
      <div css={styles.header}>
        {pastFilters.length > 1 && (
          <Link
            theme={THEME.DARK}
            iconPosition={LINK_ICON_POSITION.LEFT}
            icon="chevron-left"
            onClick={handleBack}
            css={[styles.borderless, styles.darkHighlighted]}
          >
            {ui('catalog.header.back')}
          </Link>
        )}
        <h1 css={styles.title} data-testid="catalog-title">
          {title}
        </h1>
        {!isInternal && (
          <div css={styles.sizeWrapper}>
            <div css={infoStyles}>
              {sizeList[0] && <span css={styles.decorator}>{sizeList[0]}</span>}
              {secondItem}
            </div>
            {thirdItem}
          </div>
        )}
      </div>
      <LocationModal isOpen={isLocationModalOpen} onClose={toggleLocation} />
    </>
  );
}
