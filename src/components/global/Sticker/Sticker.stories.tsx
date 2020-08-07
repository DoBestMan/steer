import { select, text } from '@storybook/addon-knobs';

import Sticker from './Sticker';
import { STICKER_SIZES } from './Sticker.styles';

export default {
  component: Sticker,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  title: 'Global/Sticker',
};

export function StickerWithKnobs() {
  const label = text('Label', '20% off');
  const size = select(
    'Size',
    Object.keys(STICKER_SIZES),
    Object.keys(STICKER_SIZES)[0],
  );

  return <Sticker label={label} size={size as STICKER_SIZES} />;
}
