import { ReactNode } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import { SiteProductInsightItem } from '~/data/models/SiteProductInsightItem';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
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

export interface InsightsProps {
  delivery?: string | null;
  doesItFit?: boolean;
  handleChangeLocation: () => void;
  handleChangeVehicle: () => void;
  handleOpenRebate: () => void;
  insightItems: SiteProductInsightItem[];
  rebateLabel?: string;
  techSpecsAnchor: string;
  vehicle?: string;
}

function RenderItem({ children }: { children: ReactNode }) {
  return <li css={styles.item}>{children}</li>;
}

function Insights({
  delivery,
  doesItFit,
  handleChangeLocation,
  handleChangeVehicle,
  handleOpenRebate,
  insightItems = [],
  rebateLabel,
  techSpecsAnchor,
  vehicle,
  ...rest
}: InsightsProps) {
  return (
    <ul css={styles.container} {...rest}>
      {rebateLabel && (
        <RenderItem>
          <button onClick={handleOpenRebate} aria-label={rebateLabel}>
            <InsightsItem
              highlight
              icon={{
                svgId: ICONS.REBATE,
                type: ICON_IMAGE_TYPE.ICON,
              }}
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
      {delivery && (
        <RenderItem>
          <button
            type="button"
            onClick={handleChangeLocation}
            aria-label={`${delivery}: ${ui('pdp.insights.changeLocation')}`}
          >
            <InsightsItem
              icon={{
                svgId: ICONS.SHIPPING_TRUCK_OUTLINE,
                type: ICON_IMAGE_TYPE.ICON,
              }}
              label={delivery}
              hasAction
            />
          </button>
        </RenderItem>
      )}
      {insightItems.map((item, index) => (
        <RenderItem key={`${item.label}_${index}`}>
          {item.sectionAnchor ? (
            <AnchorButton
              label={item.label}
              icon={item.icon}
              target={item.sectionAnchor}
            />
          ) : (
            <InsightsItem label={item.label} icon={item.icon} />
          )}
        </RenderItem>
      ))}
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
