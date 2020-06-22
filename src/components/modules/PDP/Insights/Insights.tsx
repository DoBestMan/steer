import { ReactNode } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import { ui } from '~/lib/utils/ui-dictionary';

import AnchorButton from './AnchorButton';
import FitButton from './FitButton';
import styles from './Insights.styles';
import InsightsItem from './InsightsItem';

export enum LinkType {
  ANCHOR = 'anchor',
  LINK = 'link',
  MODAL = 'modal',
}

export interface Item {
  icon?: IconType;
  label: string;
  linkType?: LinkType;
  target?: string;
}

export interface Props {
  allSeason?: boolean;
  bestSellerFor?: string;
  doesItFit?: boolean;
  economySavings?: string;
  factoryLogo?: string;
  freeShippingLocation?: string;
  handleChangeLocation: () => void;
  handleChangeVehicle: () => void;
  handleOpenRebate: () => void;
  isFactoryTire?: boolean;
  isSimilarToOriginal?: boolean;
  rebateLabel?: string;
  recommendedByFactory?: string;
  reviewsAnchor: string;
  runFlat?: boolean;
  techSpecsAnchor: string;
  topRatedBy?: string;
  vehicle?: string;
  warranty?: string;
}

function RenderItem({ children }: { children: ReactNode }) {
  return <li css={styles.item}>{children}</li>;
}

function Insights({
  allSeason,
  bestSellerFor,
  doesItFit,
  economySavings,
  factoryLogo,
  freeShippingLocation,
  handleChangeLocation,
  handleChangeVehicle,
  handleOpenRebate,
  isFactoryTire,
  isSimilarToOriginal,
  rebateLabel,
  recommendedByFactory,
  reviewsAnchor,
  runFlat,
  techSpecsAnchor,
  topRatedBy,
  vehicle,
  warranty,
}: Props) {
  return (
    <ul css={styles.container}>
      {rebateLabel && (
        <RenderItem>
          <button onClick={handleOpenRebate} aria-label={rebateLabel}>
            <InsightsItem
              highlight
              icon={ICONS.REBATE}
              label={rebateLabel}
              hasAction
            />
          </button>
        </RenderItem>
      )}
      <RenderItem>
        <FitButton
          vehicle={vehicle}
          doesItFit={doesItFit}
          onClickButton={handleChangeVehicle}
        />
      </RenderItem>
      {freeShippingLocation && (
        <RenderItem>
          <button
            onClick={handleChangeLocation}
            aria-label={`${ui('pdp.insights.freeShipping', {
              location: freeShippingLocation,
            })}: ${ui('pdp.insights.freeShippingChangeLabel')}`}
          >
            <InsightsItem
              icon={ICONS.SHIPPING_TRUCK_OUTLINE}
              label={ui('pdp.insights.freeShipping', {
                location: freeShippingLocation,
              })}
              hasAction
            />
          </button>
        </RenderItem>
      )}
      {bestSellerFor && (
        <RenderItem>
          <InsightsItem
            icon={ICONS.STAR_OUTLINE}
            label={ui('pdp.insights.bestSellerFor', {
              label: bestSellerFor,
            })}
          />
        </RenderItem>
      )}
      {topRatedBy && (
        <RenderItem>
          <AnchorButton
            icon={ICONS.LOCATION}
            label={ui('pdp.insights.topRatedBy', {
              location: topRatedBy,
            })}
            target={reviewsAnchor}
          />
        </RenderItem>
      )}
      {recommendedByFactory && (
        <RenderItem>
          <InsightsItem
            imageIcon={factoryLogo}
            imageIconAlt={recommendedByFactory}
            label={`${ui('pdp.insights.recommendedByFactory', {
              factory: recommendedByFactory,
            })}\n${isFactoryTire && ui('pdp.insights.factoryTire')}`}
          />
        </RenderItem>
      )}
      {isSimilarToOriginal && (
        <RenderItem>
          <InsightsItem
            icon={ICONS.THUMBS_UP}
            label={ui('pdp.insights.similarToOriginal')}
          />
        </RenderItem>
      )}
      {warranty && (
        <RenderItem>
          <AnchorButton
            icon={ICONS.SHIELD}
            label={ui('pdp.insights.warranty', { warranty })}
            target={techSpecsAnchor}
          />
        </RenderItem>
      )}
      {economySavings && (
        <RenderItem>
          <InsightsItem
            icon={ICONS.ECONOMY}
            label={ui('pdp.insights.economy', { value: economySavings })}
          />
        </RenderItem>
      )}
      {runFlat && (
        <RenderItem>
          <InsightsItem
            icon={ICONS.RUN_FLAT}
            label={ui('pdp.insights.runFlat')}
          />
        </RenderItem>
      )}
      {allSeason && (
        <RenderItem>
          <InsightsItem
            icon={ICONS.ALL_SEASON}
            label={ui('pdp.insights.allSeason')}
          />
        </RenderItem>
      )}
      <RenderItem>
        <AnchorButton
          label={ui('pdp.insights.technicalSpecs')}
          target={techSpecsAnchor}
        />
      </RenderItem>
    </ul>
  );
}

export default Insights;
