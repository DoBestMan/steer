import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import Insights from './Insights';

export default {
  component: Insights,
  title: 'PDP/Insights',
};

const mockFactoryLogo = 'https://via.placeholder.com/22x22';

export function InsightsWithKnobs() {
  const rebateLabel = text(
    'Rebate label',
    'Save $80 instantly: Use coupon AS23RJ',
  );
  const vehicle = text('Vehicle name', 'Honda Civic 2018 EX-L');
  const doesItFit = boolean('Does it fit to this vehicle?', true);
  const bestSellerFor = text('Best seller for', 'this size');
  const isSimilarToOriginal = boolean('Similar to original tire?', true);
  const economySavings = text('Fuel efficient:', 'Save up to 10%');
  const freeShippingLocation = text('Free shipping location', 'Brooklyn, NY');
  const recommendedByFactory = text('Recommended by factory', 'Honda');
  const isFactoryTire = boolean('Same tire that came from the factory?', true);
  const warranty = text('Warranty:', '65,000 miles');
  const runFlat = boolean('Run-flat feature?', true);
  const allSeason = boolean('All seasons thread?', true);
  const topRatedBy = text('Top rated by drivers from', 'New York');

  const handleOpenRebate = action('click-rebate-button');
  const handleChangeVehicle = action('click-fits-button');
  const handleChangeLocation = action('click-free-shipping-button');

  return (
    <>
      <Insights
        rebateLabel={rebateLabel}
        vehicle={vehicle}
        doesItFit={doesItFit}
        bestSellerFor={bestSellerFor}
        isSimilarToOriginal={isSimilarToOriginal}
        economySavings={economySavings}
        factoryLogo={mockFactoryLogo}
        freeShippingLocation={freeShippingLocation}
        recommendedByFactory={recommendedByFactory}
        isFactoryTire={isFactoryTire}
        runFlat={runFlat}
        allSeason={allSeason}
        topRatedBy={topRatedBy}
        warranty={warranty}
        reviewsAnchor="reviews"
        techSpecsAnchor="technical-specs"
        handleOpenRebate={handleOpenRebate}
        handleChangeVehicle={handleChangeVehicle}
        handleChangeLocation={handleChangeLocation}
      />
      <section
        id="technical-specs"
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
    </>
  );
}
