import { ReactNode } from 'react';

import { ModalContentProps } from '~/components/global/ContentModal/ContentModal';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import { SiteProductInsightItem } from '~/data/models/SiteProductInsightItem';
import { SiteProductInsightsRebate } from '~/data/models/SiteProductInsightsRebate';
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
  doesItFit?: boolean | null;
  handleChangeLocation: () => void;
  handleChangeVehicle: () => void;
  insightItems: SiteProductInsightItem[];
  rebate: SiteProductInsightsRebate | null;
  showFitBar?: boolean;
  techSpecsAnchor: string;
  vehicle?: string | null;
}

interface Props extends InsightsProps {
  openDynamicModal: (modalData: ModalContentProps) => void;
}

function RenderItem({ children }: { children: ReactNode }) {
  return <li css={styles.item}>{children}</li>;
}

function Insights({
  delivery,
  doesItFit,
  handleChangeLocation,
  handleChangeVehicle,
  insightItems = [],
  openDynamicModal,
  rebate,
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
            vehicle={vehicle}
            doesItFit={doesItFit}
            onClickButton={handleChangeVehicle}
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
