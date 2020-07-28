import { useTheme } from 'emotion-theming';
import React, { ReactNode, useState } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Toggle from '~/components/global/Toggle/Toggle';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { LINK_ICON_POSITION, LINK_TYPES } from '~/lib/constants';
import { scrollTo } from '~/lib/helpers/scroll';
import { ui } from '~/lib/utils/ui-dictionary';

import LocationModal from '../../Location/LocationModal/LocationModal';
import styles from '../Header.styles';

interface Props {
  hasTopPicks: boolean;
  isInternal?: boolean;
  location: string;
  sizeList?: string[];
  title: string | ReactNode;
}

export default function HeaderInfo({
  hasTopPicks,
  isInternal = false,
  location,
  sizeList = [],
  title,
}: Props) {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  function toggleLocation() {
    setIsLocationModalOpen(!isLocationModalOpen);
  }
  const { header } = useTheme();
  const {
    handleUpdateResults,
    setIsAdvancedView,
    isAdvancedView,
  } = useCatalogPageContext();

  const backToTopPicks = () => {
    scrollTo(0, 1);
  };

  const infoStyles = [styles.info, header.text];
  const backEl = isInternal ? (
    <Link
      css={styles.action}
      href="/"
      icon={ICONS.CHEVRON_LEFT}
      iconPosition={LINK_ICON_POSITION.LEFT}
    >
      {ui('catalog.header.back')}
    </Link>
  ) : (
    <Link
      css={[styles.action, styles.back]}
      as="button"
      aria-label={ui('catalog.header.returnToTopPicks')}
      onClick={backToTopPicks}
      icon={ICONS.ARROW_UP}
    />
  );

  const locationEl = (
    <div css={[infoStyles, sizeList[1] && styles.wrappedLocation]}>
      {ui('catalog.header.dealsFor')}{' '}
      {/* TODO: location redirect or modal open */}
      <Link
        onClick={toggleLocation}
        as={LINK_TYPES.BUTTON}
        css={[styles.link, infoStyles]}
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

  const onToggleView = async () => {
    setIsAdvancedView(!isAdvancedView);
    if (!isAdvancedView) {
      await handleUpdateResults({ skipGroups: 'true' });
    } else {
      await handleUpdateResults({});
    }
  };

  return (
    <>
      <div css={styles.header}>
        {hasTopPicks && backEl}
        <h1 css={styles.title}>{title}</h1>
        {!isInternal && (
          <>
            <div css={infoStyles}>
              {sizeList[0] && <span css={styles.decorator}>{sizeList[0]}</span>}
              {secondItem}
            </div>
            {thirdItem}
          </>
        )}
      </div>
      <div css={styles.toggle}>
        <span css={[styles.label, header.advancedLabel]}>
          {ui('catalog.header.advancedViewLabel')}
        </span>
        <Toggle
          name={ui('catalog.header.advancedViewLabel')}
          onToggle={onToggleView}
          defaultChecked={isAdvancedView}
        />
      </div>
      <LocationModal isOpen={isLocationModalOpen} onClose={toggleLocation} />
    </>
  );
}
