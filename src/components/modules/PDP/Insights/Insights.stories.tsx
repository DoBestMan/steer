import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteProductInsightItem } from '~/data/models/SiteProductInsightItem';

import Insights from './Insights';
import SizeCheckModal from './SizeCheckModal';

export default {
  component: Insights,
  title: 'PDP/Insights',
};

enum SIZE_CHECK_STATES {
  CHANGE_SIZE = 'changeSize',
  SELECT_TIRE = 'selectTire',
  SIZE_FITS = 'sizeFits',
}

export function InsightsWithKnobs() {
  const configGroupId = 'Options';
  const rebate = boolean('Rebate?', true, configGroupId);
  const freeShipping = boolean('Free shipping?', true, configGroupId);
  const bestSeller = boolean('Best seller?', true, configGroupId);
  const isSimilarToOriginal = boolean(
    'Similar to original tire?',
    true,
    configGroupId,
  );
  const economySavings = boolean('Fuel efficient?', true, configGroupId);
  const recommendedByFactory = boolean(
    'Recommended by factory?',
    true,
    configGroupId,
  );
  const warranty = boolean('Warranty?', true, configGroupId);
  const runFlat = boolean('Run-flat feature?', true, configGroupId);
  const allSeason = boolean('All seasons thread?', true, configGroupId);
  const topRatedBy = boolean('Top rated by drivers?', true, configGroupId);

  const fitVehicleGroupId = 'Fits vehicle';
  const vehicle = text(
    'Vehicle name',
    'Honda Civic 2018 EX‑L',
    fitVehicleGroupId,
  );

  const delivery = freeShipping
    ? 'Free 2-day shipping to Brooklyn, NY'
    : undefined;

  const rebateLabel = rebate
    ? 'Save $80 instantly: Use coupon AS23RJ'
    : undefined;

  const insightItems = [
    bestSeller && {
      label: 'Best seller for Honda Civic',
      icon: {
        type: 'SiteIcon',
        svgId: ICONS.STAR_OUTLINE,
      },
      sectionAnchor: null,
    },
    topRatedBy && {
      label: 'Top rated by New York drivers',
      icon: {
        type: 'SiteIcon',
        svgId: ICONS.LOCATION,
      },
      sectionAnchor: 'SiteProductReviews',
    },
    recommendedByFactory && {
      label: 'Recommended by Honda\nSame tire that came from the factory',
      icon: {
        altText: '',
        height: 45,
        src: 'https://via.placeholder.com/45',
        type: 'SiteImage',
        width: 45,
      },
      sectionAnchor: null,
    },
    isSimilarToOriginal && {
      label: 'Same tire that came from the factory',
      icon: {
        type: 'SiteIcon',
        svgId: ICONS.THUMBS_UP,
      },
      sectionAnchor: null,
    },
    warranty && {
      label: 'Great warranty: 65,000 miles',
      icon: {
        type: 'SiteIcon',
        svgId: ICONS.WARRANTY,
      },
      sectionAnchor: 'SiteProductSpecs',
    },
    economySavings && {
      label: 'Fuel efficient: Save up to 10%',
      icon: {
        type: 'SiteIcon',
        svgId: ICONS.FUEL_ECONOMY,
      },
      sectionAnchor: null,
    },
    runFlat && {
      label: 'Run-Flat feature: Never stops',
      icon: {
        type: 'SiteIcon',
        svgId: ICONS.FUEL_ECONOMY,
      },
      sectionAnchor: null,
    },
    allSeason && {
      label: 'Use all year: All Season thread',
      icon: {
        type: 'SiteIcon',
        svgId: ICONS.ALL_SEASON,
      },
      sectionAnchor: null,
    },
  ].filter(Boolean) as SiteProductInsightItem[];

  const handleOpenRebate = action('click-rebate-button');
  const handleChangeLocation = action('click-free-shipping-button');
  const vehicleModel = text('Vehicle model', 'Civic', fitVehicleGroupId);
  const handleOpenSearch = action('click-fits-button');
  const modalAction = action('click-modal-action-button');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalClose = function () {
    setIsModalOpen(false);
  };

  const sizeCheckState = select(
    'Modal state',
    SIZE_CHECK_STATES,
    SIZE_CHECK_STATES['SIZE_FITS'],
    fitVehicleGroupId,
  );

  const sizeCheckUpdateItems = {
    [SIZE_CHECK_STATES.CHANGE_SIZE]: [
      {
        label: 'View tires that fit',
        action: modalAction,
      },
      {
        label: 'Select another vehicle',
        action: modalAction,
      },
      {
        label: 'Unselect vehicle',
        action: modalAction,
      },
    ],
    [SIZE_CHECK_STATES.SELECT_TIRE]: [
      {
        label: 'Change to the size recommended by Honda',
        action: modalAction,
      },
      {
        label: 'Select another vehicle',
        action: modalAction,
      },
      {
        label: 'Unselect vehicle',
        action: modalAction,
      },
    ],
    [SIZE_CHECK_STATES.SIZE_FITS]: [
      {
        label: 'Select another vehicle',
        action: modalAction,
      },
      {
        label: 'Unselect vehicle',
        action: modalAction,
      },
    ],
  };

  function handleChangeVehicle() {
    if (!vehicle) {
      handleOpenSearch();
    } else {
      setIsModalOpen(true);
    }
  }

  return (
    <>
      <Insights
        insightItems={insightItems}
        rebateLabel={rebateLabel}
        vehicle={vehicle}
        doesItFit={sizeCheckState === SIZE_CHECK_STATES['SIZE_FITS']}
        delivery={delivery}
        techSpecsAnchor="SiteProductSpecs"
        handleOpenRebate={handleOpenRebate}
        handleChangeVehicle={handleChangeVehicle}
        handleChangeLocation={handleChangeLocation}
      />
      <section
        id="SiteProductSpecs"
        style={{ minHeight: '100vh', marginTop: '100vh' }}
      >
        <h2 style={{ marginBottom: 10 }}>Technical Specs section</h2>
        <a href="#">
          <Icon name={ICONS.ARROW_UP} />
        </a>
      </section>
      <section id="reviews" style={{ minHeight: '100vh' }}>
        <h2 style={{ marginBottom: 10 }}>Reviews section</h2>
        <a href="#">
          <Icon name={ICONS.ARROW_UP} />
        </a>
      </section>

      <SizeCheckModal
        actions={sizeCheckUpdateItems[sizeCheckState]}
        hasInfoModule={sizeCheckState !== SIZE_CHECK_STATES['SIZE_FITS']}
        isOpen={isModalOpen}
        onClose={onModalClose}
        vehicle={vehicle}
        vehicleModel={vehicleModel}
      />
    </>
  );
}
