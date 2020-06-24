import { boolean, text } from '@storybook/addon-knobs';

import Sticker from './Sticker';

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
  const isLarge = boolean('Is large? (for Top Picks Stickers)', false);
  return <Sticker label={label} isLarge={isLarge} />;
}
