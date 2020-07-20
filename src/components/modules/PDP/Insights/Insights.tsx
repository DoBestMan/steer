import { ReactNode } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ContentModalProps } from '~/components/global/Modal/Modal.types';
import { SiteProductInsightItem } from '~/data/models/SiteProductInsightItem';
import { SiteProductInsightsRebate } from '~/data/models/SiteProductInsightsRebate';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { ui } from '~/lib/utils/ui-dictionary';

import AnchorButton from './AnchorButton';
import FitButton from './FitButton';
import styles from './Insights.styles';
import { SIZE_CHECK_STATES } from './Insights.types';
import InsightsItem from './InsightsItem';

export interface InsightsProps {
  delivery?: string | null;
  handleChangeLocation: () => void;
  insightItems: SiteProductInsightItem[];
  make?: string | null;
  onFindTiresThatFit: () => void;
  onSearchVehicle: () => void;
  onSelectAvailableOption: () => void;
  onUnselectVehicle: () => void;
  rebate: SiteProductInsightsRebate | null;
  showFitBar?: boolean;
  sizeCheckState: SIZE_CHECK_STATES;
  techSpecsAnchor: string;
  vehicle?: string | null;
}

interface Props extends InsightsProps {
  openDynamicModal: (modalData: ContentModalProps) => void;
}

function RenderItem({ children }: { children: ReactNode }) {
  return <li css={styles.item}>{children}</li>;
}

function Insights({
  make,
  delivery,
  handleChangeLocation,
  onFindTiresThatFit,
  onSearchVehicle,
  onSelectAvailableOption,
  onUnselectVehicle,
  insightItems = [],
  openDynamicModal,
  rebate,
  sizeCheckState,
  showFitBar,
  techSpecsAnchor,
  vehicle,
  ...rest
}: Props) {
  function handleOpenRebate() {
    if (rebate?.siteDynamicModal) {
      openDynamicModal(rebate.siteDynamicModal);
    }
  }
  return (
    <ul css={styles.container} {...rest}>
      {rebate && (
        <RenderItem>
          <button onClick={handleOpenRebate} aria-label={rebate.label}>
            <InsightsItem
              highlight
              icon={{
                svgId: ICONS.REBATE,
                type: ICON_IMAGE_TYPE.ICON,
              }}
              label={rebate.label}
              hasAction
            />
          </button>
        </RenderItem>
      )}
      {showFitBar && (
        <RenderItem>
          <FitButton
            make={make}
            vehicle={vehicle}
            sizeCheckState={sizeCheckState}
            onFindTiresThatFit={onFindTiresThatFit}
            onSearchVehicle={onSearchVehicle}
            onSelectAvailableOption={onSelectAvailableOption}
            onUnselectVehicle={onUnselectVehicle}
          />
        </RenderItem>
      )}
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
