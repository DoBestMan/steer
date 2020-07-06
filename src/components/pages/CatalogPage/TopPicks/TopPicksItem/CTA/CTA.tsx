import Button from '~/components/global/Button/Button';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { styles } from '../TopPicksItem.styles';

interface Props {
  ctaLabelStr?: string | null;
  customerServiceNumber: { display: string; value: string };
  hasAddVehicleInfo?: boolean;
  hasPriceList?: boolean;
  onAddInfoVehicleClick: () => void;
  url?: string | null;
}

export default function CTA({
  customerServiceNumber,
  hasAddVehicleInfo,
  hasPriceList,
  ctaLabelStr,
  onAddInfoVehicleClick,
  url,
}: Props) {
  if (hasPriceList && ctaLabelStr && url) {
    return (
      <Button as="a" href={url} theme={THEME.ORANGE} css={styles.ctaItem}>
        {ctaLabelStr}
      </Button>
    );
  }

  if (hasAddVehicleInfo) {
    return (
      <Button
        theme={THEME.ORANGE}
        onClick={onAddInfoVehicleClick}
        css={styles.ctaItem}
      >
        {ui('catalog.topPicks.addVehicleCtaLabel')}
      </Button>
    );
  }

  return (
    <Button
      as="a"
      href={`tel:${customerServiceNumber.value}`}
      theme={THEME.ORANGE}
      css={styles.ctaItem}
    >
      {ctaLabelStr}
    </Button>
  );
}
