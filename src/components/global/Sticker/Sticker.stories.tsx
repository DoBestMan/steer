import { text } from '@storybook/addon-knobs';

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
  return <Sticker label={label} />;
}
