import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { ui } from '~/lib/utils/ui-dictionary';

import { InsightsProps } from './Insights';
import InsightsItem from './InsightsItem';

interface Props extends Pick<InsightsProps, 'doesItFit' | 'vehicle'> {
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
          icon={{
            svgId: doesItFit ? ICONS.THUMBS_UP : ICONS.FORBIDDEN,
            type: ICON_IMAGE_TYPE.ICON,
          }}
          label={label}
          hasAction
          highlight={!doesItFit}
        />
      ) : (
        <InsightsItem
          icon={{
            svgId: ICONS.UNKNOWN,
            type: ICON_IMAGE_TYPE.ICON,
          }}
          label={label}
          hasAction
          highlight
        />
      )}
    </button>
  );
}

export default FitButton;
