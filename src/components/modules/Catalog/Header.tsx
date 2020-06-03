import { ReactNode } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Toggle from '~/components/global/Toggle/Toggle';
import { LINK_ICON_POSITION } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import Filters from './Filters/Filters';
import styles from './Header.styles';

interface Props {
  activeFilters?: string[];
  isAdvancedView?: boolean;
  isInternal?: boolean;
  location: string;
  onToggle: () => void;
  rearTireSize?: string;
  tireSize: string;
  title: string | ReactNode;
  toggleFilter: (filter: string) => void;
}

export default function Header({
  activeFilters = [],
  isAdvancedView = false,
  isInternal = false,
  location,
  toggleFilter,
  onToggle,
  rearTireSize,
  tireSize,
  title,
}: Props) {
  const infoStyles = [
    styles.text,
    styles.info,
    isAdvancedView && styles.textAdvanced,
  ];
  const backEl = isInternal ? (
    <Link
      css={styles.action}
      href="/"
      icon={ICONS.CHEVRON_LEFT}
      iconPosition={LINK_ICON_POSITION.LEFT}
    >
      {ui('catalog.header.allTiresLink')}
    </Link>
  ) : (
    <Link
      css={[styles.action, styles.back]}
      as="button"
      icon={ICONS.ARROW_UP}
    />
  );

  const locationEl = (
    <div css={[infoStyles, rearTireSize && styles.wrappedLocation]}>
      {ui('catalog.header.dealsFor')}
      {/* TODO: location redirect or modal open */}
      <Link css={[styles.link, infoStyles]} href="/">
        {' '}
        {location}
      </Link>
    </div>
  );

  let secondItem, thirdItem;
  if (rearTireSize) {
    secondItem = ui('catalog.header.rear', { rearTireSize });
    thirdItem = locationEl;
  } else {
    secondItem = locationEl;
    thirdItem = null;
  }

  return (
    <div css={[styles.root, isAdvancedView && styles.rootAdvanced]}>
      <div css={styles.header}>
        {backEl}
        <h1 css={styles.title}>{title}</h1>
        {!isInternal && (
          <>
            <div css={infoStyles}>
              <p css={styles.decorator}>
                {ui('catalog.header.size', { tireSize })}
              </p>
              {secondItem}
            </div>
            {thirdItem}
          </>
        )}
      </div>
      <div css={styles.toggle}>
        <span css={styles.label}>{ui('catalog.header.advancedViewLabel')}</span>
        <Toggle
          name={ui('catalog.header.advancedViewLabel')}
          onToggle={onToggle}
          defaultChecked={isAdvancedView}
        />
      </div>
      <Filters
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        isAdvancedView={isAdvancedView}
      />
    </div>
  );
}
