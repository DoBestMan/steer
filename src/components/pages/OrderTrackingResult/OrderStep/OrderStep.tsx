import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { OrderShippingStageList } from '~/data/models/OrderShippingStageList';
import { LINK_THEME } from '~/lib/constants';
import { formatOrNull } from '~/lib/utils/date';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderStep.styles';

interface Props {
  numberOfSteps: number;
  stepIndex: number;
}
type OrderStepProps = OrderShippingStageList & Props;

function OrderStep({
  displayName,
  updatedAt,
  note,
  isCompleted,
  orderTrackingNumberList,
  numberOfSteps,
  stepIndex,
}: OrderStepProps) {
  const isLastStep = stepIndex === numberOfSteps - 1;
  const isOnlyStep = numberOfSteps === 1;
  const isCurrentStep = stepIndex === 0;

  const trackIcon = isCompleted ? (
    <div css={styles.completeTrackStop}>
      <Icon css={styles.completeTrackIcon} name={ICONS.CHECKMARK} />
    </div>
  ) : (
    <div css={styles.incompleteTrackStop}>
      <Icon css={styles.incompleteTrackIcon} name={ICONS.CHECKMARK} />
    </div>
  );
  const trackLine = !isLastStep && !isOnlyStep && (
    <div css={styles.trackLine} />
  );

  return (
    <div css={styles.wrapper}>
      <div
        css={[
          styles.track,
          isLastStep && styles.trackLastStep,
          isOnlyStep && styles.trackOnlyStep,
        ]}
      >
        {trackIcon}
        {trackLine}
      </div>
      <div css={styles.content}>
        <div css={[styles.label, isCurrentStep && styles.currentLabel]}>
          {displayName}
        </div>
        {updatedAt && (
          <div css={styles.updatedDate}>
            {formatOrNull(updatedAt.replace(/-/g, '/'))}
          </div>
        )}
        {note && <div css={styles.descriptionComponent}>{note}</div>}
        {orderTrackingNumberList && orderTrackingNumberList.length > 0 && (
          <span>
            <div css={styles.descriptionComponent}>
              {ui('tracking.trackingNumber')}
            </div>
            {orderTrackingNumberList.map((item, i) => (
              <li css={styles.trackingListWrapper} key={i}>
                <Link
                  href={item.trackingLink?.href || '/'}
                  isExternal={item.trackingLink?.isExternal}
                  theme={LINK_THEME.LIGHT_HIGHLIGHTED}
                >
                  {item.trackingNumber}
                  {'  '}
                </Link>
                {item.status ? (
                  <h2 css={styles.trackingShippingStatus}>({item.status})</h2>
                ) : null}
              </li>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

export default OrderStep;
