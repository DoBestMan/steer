import { text } from '@storybook/addon-knobs';

import { COLORS, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Markdown from './Markdown';

const styles: StylesMap = {
  headline: {
    strong: {
      color: COLORS.GLOBAL.ORANGE,
      fontWeight: 'inherit',
    },
  },
};

export default {
  component: Markdown,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  title: 'Global/Markdown',
};

const markdownText =
  'This is an example of a markdown line break\n\n**and text wrapped in a strong tag.**';
const headlineText = 'Replace tires<br />with up to<br />**60% off.**';

const descriptionText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nAenean fermentum a elit non volutpat. Morbi ipsum metus, lobortis sit amet convallis sed, cursus id metus.\n\nDuis nisl lacus, aliquet eget sapien ut, vestibulum gravida magna. Aenean accumsan ex quis nibh congue mollis. Nulla elementum,\n\ndui eget suscipit maximus, sapien ligula semper ipsum, ut congue lorem tortor vel enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean vitae nibh et neque tincidunt laoreet. Aliquam lobortis dui quis sem tincidunt, nec ultrices orci egestas.';

export function TextWithKnobs() {
  return <Markdown>{text('Markdown Text', markdownText)}</Markdown>;
}

export function Heading() {
  return (
    <p css={[typography.jumboHeadline, styles.headline]}>
      <Markdown>{text('Headline Text', headlineText)}</Markdown>
    </p>
  );
}

export function Description() {
  return (
    <p css={typography.bodyCopy}>
      <Markdown>{text('Description Text', descriptionText)}</Markdown>
    </p>
  );
}
