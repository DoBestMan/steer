import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import styles from './OrderStep.styles';

interface Props {
  descriptionComponent: string | JSX.Element | null;
  isCurrentStep?: boolean;
  isLastStep?: boolean;
  isOnlyStep?: boolean;
  label: string;
}

function OrderStep({
  descriptionComponent,
  isCurrentStep,
  isLastStep,
  isOnlyStep,
  label,
}: Props) {
  const beginning = !isCurrentStep && !isOnlyStep && (
    <div css={styles.trackLineBeginning} />
  );
  const middle = isCurrentStep ? (
    <div css={styles.currentStepTrackStop}>
      <Icon css={styles.currentStepTrackStopIcon} name={ICONS.CHECKMARK} />
    </div>
  ) : (
    <div css={styles.trackStop} />
  );
  const end = !isLastStep && !isOnlyStep && <div css={styles.trackLine} />;

  return (
    <div css={styles.wrapper}>
      <div
        css={[
          styles.track,
          isLastStep && styles.trackLastStep,
          isOnlyStep && styles.trackOnlyStep,
        ]}
      >
        {beginning}
        {middle}
        {end}
      </div>
      <div css={styles.content}>
        <div css={[styles.label, isCurrentStep && styles.currentLabel]}>
          {label}
        </div>
        {descriptionComponent && (
          <div css={styles.descriptionComponent}>{descriptionComponent}</div>
        )}
      </div>
    </div>
  );
}

export default OrderStep;
