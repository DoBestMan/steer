import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import Markdown from '../Markdown/MarkdownDynamic';
import styles from './BillBoard.styles';
import { BillboardProps } from './BillBoard.types';

interface CTA {
  label: string;
  type: 'vehicle' | 'tireSize' | 'brand';
}

const CTAList: Array<CTA> = [
  {
    label: ui('billboard.vehicle'),
    type: 'vehicle',
  },
  {
    label: ui('billboard.tireSize'),
    type: 'tireSize',
  },
  {
    label: ui('billboard.brand'),
    type: 'brand',
  },
];

function BillBoard({
  eyebrow,
  icon,
  title,
  onVehicleCTAClick,
  onTireSizeCTAClick,
  onBrandCTAClick,
}: BillboardProps) {
  const mapOnClickHandler: { [name: string]: () => void } = {
    brand: onBrandCTAClick,
    tireSize: onTireSizeCTAClick,
    vehicle: onVehicleCTAClick,
  };

  return (
    <div css={styles.container}>
      {icon && <Icon name={icon.svgId} css={styles.icon} />}
      <h3 css={styles.label}>
        <Markdown renderers={{ paragraph: 'span' }}>{title}</Markdown>
      </h3>
      {eyebrow && <p css={styles.eyebrow}>{eyebrow}</p>}

      <div css={styles.buttonContainer}>
        {CTAList.map((button) => {
          const onClickHandler = mapOnClickHandler[button.type] || null;

          return (
            <Button
              css={styles.button}
              style={BUTTON_STYLE.OUTLINED}
              theme={THEME.LIGHT}
              onClick={onClickHandler}
              key={button.label}
            >
              {button.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default BillBoard;
