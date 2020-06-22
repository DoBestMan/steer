import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { Props as InputProps } from './Insights';
import InsightsItem from './InsightsItem';

interface Props extends Pick<InputProps, 'doesItFit' | 'vehicle'> {
  onClickButton: () => void;
}

function FitButton({ doesItFit, vehicle, onClickButton }: Props) {
  const label = vehicle
    ? ui(`pdp.insights.fitting.${doesItFit ? 'true' : 'false'}`, {
        vehicle,
      })
    : ui('pdp.insights.fitting.unknown');
  const buttonLabel = `${label}: ${
    vehicle ? ui('pdp.insights.fittingChangeVehicle') : ''
  }`;

  return (
    <button onClick={onClickButton} aria-label={buttonLabel}>
      {vehicle ? (
        <InsightsItem
          icon={doesItFit ? ICONS.THUMBS_UP : ICONS.FORBIDDEN}
          label={label}
          hasAction
          highlight={!doesItFit}
        />
      ) : (
        <InsightsItem icon={ICONS.UNKNOWN} label={label} hasAction highlight />
      )}
    </button>
  );
}

export default FitButton;
