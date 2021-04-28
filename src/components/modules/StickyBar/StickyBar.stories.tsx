import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
import React from 'react';

import Button from '~/components/global/Button/Button';
import FilterButton from '~/components/global/Button/FilterButton';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { BUTTON_STYLE, LINK_TYPES, THEME } from '~/lib/constants';

import StickyBar from './StickyBar';
import { primaryColumnStyles } from './StickyBar.styles';

export default {
  component: StickyBar,
  title: 'Global/Sticky Bar',
};

const logos: SiteImage[] = [
  {
    altText: 'Michelin',
    src: '/images/brands/michelin_logo.svg',
    type: ICON_IMAGE_TYPE.IMAGE,
  },
  {
    altText: 'Continental',
    src: '/images/brands/continental_logo.svg',
    type: ICON_IMAGE_TYPE.IMAGE,
  },
  {
    altText: 'Bridgestone',
    src: '/images/brands/bridgestone_logo.svg',
    type: ICON_IMAGE_TYPE.IMAGE,
  },
  {
    altText: 'Pirelli',
    src: '/images/brands/pirelli_logo.svg',
    type: ICON_IMAGE_TYPE.IMAGE,
  },
];

const logoKeys = logos.map((logo) => logo.altText);

export function TwoButtonsWithKnobs() {
  const theme = select('Theme', [THEME.ORANGE, THEME.DARK], THEME.DARK);
  const secondaryLabel = text('Secondary Label', 'ProContact 215/55R16 89H');
  const primaryButtonLabel = text('Secondary Label', 'Add to cart - $531.84');
  const handleFilterButtonClick = action('filter-button-click');
  const handlePrimaryButtonClick = action('primary-button-click');
  const logoKey = select('Logo', logoKeys, logoKeys[0]);
  const logo = logos.find((logo) => logo.altText === logoKey);

  return (
    <StickyBar theme={theme} logo={logo} secondaryLabel={secondaryLabel}>
      <>
        <FilterButton
          label="4 tires"
          isActive={false}
          isDropdownOpen={false}
          onClick={handleFilterButtonClick}
          theme={theme}
          css={primaryColumnStyles.secondaryButton}
        />
        <Button
          onClick={handlePrimaryButtonClick}
          style={BUTTON_STYLE.SOLID}
          theme={theme}
          css={primaryColumnStyles.primaryButton}
        >
          {primaryButtonLabel}
        </Button>
      </>
    </StickyBar>
  );
}

export function ButtonAndLabelWithKnobs() {
  const theme = select('Theme', [THEME.ORANGE, THEME.DARK], THEME.DARK);

  const primaryLabel = text('Primary Label', 'Starting at $79.90');
  const secondaryLabel = text('Secondary Label', '38 sizes available');
  const primaryButtonLabel = text('Primary Button', 'Find your size');
  const logoKey = select('Logo', logoKeys, logoKeys[0]);
  const logo = logos.find((logo) => logo.altText === logoKey);
  const handlePrimaryButtonClick = action('primary-button-click');

  return (
    <StickyBar theme={theme} logo={logo} secondaryLabel={secondaryLabel}>
      <>
        <p css={primaryColumnStyles.primaryLabel}>{primaryLabel}</p>
        <Button
          onClick={handlePrimaryButtonClick}
          style={BUTTON_STYLE.SOLID}
          theme={theme}
          css={primaryColumnStyles.primaryButton}
        >
          {primaryButtonLabel}
        </Button>
      </>
    </StickyBar>
  );
}

export function SingleButtonWithKnobs() {
  const theme = select('Theme', [THEME.ORANGE, THEME.DARK], THEME.DARK);

  const secondaryLabel = text('Secondary Label', 'ProContact 215/55R16 89H');
  const primaryButtonLabel = text('Secondary Label', 'Add to cart - $531.84');
  const logoKey = select('Logo', logoKeys, logoKeys[0]);
  const logo = logos.find((logo) => logo.altText === logoKey);
  const handlePrimaryButtonClick = action('primary-button-click');

  return (
    <StickyBar theme={theme} logo={logo} secondaryLabel={secondaryLabel}>
      <Button
        onClick={handlePrimaryButtonClick}
        style={BUTTON_STYLE.SOLID}
        theme={theme}
        css={primaryColumnStyles.primaryButton}
      >
        {primaryButtonLabel}
      </Button>
    </StickyBar>
  );
}

export function ConfirmWithKnobs() {
  const theme = select('Theme', [THEME.ORANGE, THEME.DARK], THEME.DARK);
  const secondaryLabel = text('Secondary Label', 'ProContact 215/55R16 89H');
  const confirmationLabel = text(
    'Confirmation Label',
    'Confirm if it fits your vehicle',
  );
  const logoKey = select('Logo', logoKeys, logoKeys[0]);
  const logo = logos.find((logo) => logo.altText === logoKey);
  const handleLinkClick = action('link-click');

  return (
    <StickyBar
      theme={theme}
      icon={ICONS.UNKNOWN}
      logo={logo}
      secondaryLabel={secondaryLabel}
    >
      <Link
        onClick={handleLinkClick}
        icon={ICONS.CHEVRON_RIGHT}
        theme={THEME.DARK}
        as={LINK_TYPES.BUTTON}
        css={primaryColumnStyles.primaryLink}
      >
        {confirmationLabel}
      </Link>
    </StickyBar>
  );
}
