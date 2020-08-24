/**
 * Note: temporaily removing this for ST MVP launch.
 * Refer to WCS-1590 for details.
 */
// import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { Transition } from 'react-transition-group';
import { ENTERED, TransitionStatus } from 'react-transition-group/Transition';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ContentModalProps } from '~/components/global/Modal/Modal.types';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { SiteProductInsightItem } from '~/data/models/SiteProductInsightItem';
import { SiteProductInsightsRebate } from '~/data/models/SiteProductInsightsRebate';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { ui } from '~/lib/utils/ui-dictionary';

import AnchorButton from './AnchorButton';
import styles from './Insights.styles';
import { SIZE_CHECK_STATES } from './Insights.types';
import InsightsItem from './InsightsItem';

/**
 * Note: temporaily removing this for ST MVP launch.
 * Refer to WCS-1590 for details.
 */
// const DynamicFitButton = dynamic(() => import('./FitButton'));

export interface InsightsProps {
  delivery?: string | null;
  handleChangeLocation: () => void;
  insightItems: SiteProductInsightItem[];
  make?: string | null;
  onFindTiresThatFit: () => void;
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
  /**
   * Note: temporaily removing this for ST MVP launch.
   * Refer to WCS-1590 for details
   */
  // make,
  // onFindTiresThatFit,
  // onSelectAvailableOption,
  // onUnselectVehicle,
  // showFitBar,
  // sizeCheckState,
  // vehicle,
  delivery,
  handleChangeLocation,
  insightItems = [],
  openDynamicModal,
  rebate,
  techSpecsAnchor,
  ...rest
}: Props) {
  const { isLoading } = useProductDetailContext();

  function handleOpenRebate() {
    if (rebate?.siteDynamicModal) {
      openDynamicModal(rebate.siteDynamicModal);
    }
  }

  return (
    <Transition appear in={!isLoading} timeout={0}>
      {(containerTransitionState: TransitionStatus) => (
        <div css={styles.root}>
          <ul
            css={styles.container}
            aria-hidden={containerTransitionState !== ENTERED}
            {...rest}
          >
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
            {/**
             * Note: temporaily removing this for ST MVP launch.
             * Refer to WCS-1590 for details.
             */}
            {/* {showFitBar && (
              <RenderItem>
                <DynamicFitButton
                  make={make}
                  vehicle={vehicle}
                  sizeCheckState={sizeCheckState}
                  onFindTiresThatFit={onFindTiresThatFit}
                  onSelectAvailableOption={onSelectAvailableOption}
                  onUnselectVehicle={onUnselectVehicle}
                />
              </RenderItem>
            )} */}
            {delivery && (
              <RenderItem>
                <button
                  type="button"
                  onClick={handleChangeLocation}
                  aria-label={`${delivery}: ${ui(
                    'pdp.insights.changeLocation',
                  )}`}
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
          <div
            css={styles.loading}
            aria-hidden={containerTransitionState === ENTERED}
          />
        </div>
      )}
    </Transition>
  );
}

export default Insights;
