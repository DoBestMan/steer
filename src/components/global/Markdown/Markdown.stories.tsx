import { text } from '@storybook/addon-knobs';

import EditorialModules from '~/components/modules/EditorialModules/EditorialModules';
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

const markdownText = `This is an example of a markdown line break\n\n**and text wrapped in a strong tag.**

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nibh neque, pretium eget ex ut, ornare eleifend justo. Sed a ornare massa.

* one bullet
* two bullet
* three bullet
* four bullet

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nibh neque, pretium eget ex ut, ornare eleifend justo. Sed a ornare massa.

1. one list item
2. two list item
3. three list item
4. four list item
  `;
const headlineText = 'Replace tires<br />with up to<br />**60% off.**';
const headingLevel2 = '<h2>Heading Level 2</h2>';
const headingLevel3 = '<h3>Heading Level 3</h3>';
const headingLevel4 = '<h4>Heading Level 4</h4>';
const bodyCopyText =
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nibh neque, pretium eget ex ut, ornare eleifend justo. Sed a ornare massa.</p>';
const bulletedList = `
  <ul>
    <li>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </li>
    <li>
      Sed sit amet arcu non metus consectetur pretium non eu ligula
      <ul>
        <li>Nunc ligula felis, sodales vitae nibh at, eleifend ornare lacus</li>
        <li>Praesent eu ante lacinia lectus tempor sodales et id elit</li>
      </ul>
    </li>
  </ul>
`;
const numberedList = `
  <ol>
    <li>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </li>
    <li>
      Sed sit amet arcu non metus consectetur pretium non eu ligula
      <ol>
        <li>Nunc ligula felis, sodales vitae nibh at, eleifend ornare lacus</li>
        <li>Praesent eu ante lacinia lectus tempor sodales et id elit</li>
      </ol>
    </li>
  </ol>
`;
const link = '<p><a href="/">Link</a></p>';
const hr = '<p>Copy above hr</p><hr />';

const descriptionText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nAenean fermentum a elit non volutpat. Morbi ipsum metus, lobortis sit amet convallis sed, cursus id metus.\n\nDuis nisl lacus, aliquet eget sapien ut, vestibulum gravida magna. Aenean accumsan ex quis nibh congue mollis. Nulla elementum,\n\ndui eget suscipit maximus, sapien ligula semper ipsum, ut congue lorem tortor vel enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean vitae nibh et neque tincidunt laoreet. Aliquam lobortis dui quis sem tincidunt, nec ultrices orci egestas.';

export function GlobalMarkdownStyles() {
  return <Markdown>{text('Markdown Text', markdownText)}</Markdown>;
}

export function Heading() {
  return (
    <p css={[typography.jumboHeadline, styles.headline]}>
      <Markdown>{text('Headline Text', headlineText)}</Markdown>
    </p>
  );
}

export function SiteModuleMarkdownHeadingLevel2() {
  return (
    <EditorialModules
      moduleType="SiteModuleMarkdown"
      moduleData={{
        type: 'SiteModuleMarkdown',
        body: text('Headline Level 2', headingLevel2),
      }}
    />
  );
}

export function SiteModuleMarkdownHeadingLevel3() {
  return (
    <EditorialModules
      moduleType="SiteModuleMarkdown"
      moduleData={{
        type: 'SiteModuleMarkdown',
        body: text('Headline Level 3', headingLevel3),
      }}
    />
  );
}

export function SiteModuleMarkdownHeadingLevel4() {
  return (
    <EditorialModules
      moduleType="SiteModuleMarkdown"
      moduleData={{
        type: 'SiteModuleMarkdown',
        body: text('Headline Level 4', headingLevel4),
      }}
    />
  );
}

export function SiteModuleMarkdownBodyCopyText() {
  return (
    <EditorialModules
      moduleType="SiteModuleMarkdown"
      moduleData={{
        type: 'SiteModuleMarkdown',
        body: text('Body Copy Text', bodyCopyText),
      }}
    />
  );
}

export function SiteModuleMarkdownBulletedList() {
  return (
    <EditorialModules
      moduleType="SiteModuleMarkdown"
      moduleData={{
        type: 'SiteModuleMarkdown',
        body: text('Bulleted List', bulletedList),
      }}
    />
  );
}

export function SiteModuleMarkdownNumberedList() {
  return (
    <EditorialModules
      moduleType="SiteModuleMarkdown"
      moduleData={{
        type: 'SiteModuleMarkdown',
        body: text('Numbered List', numberedList),
      }}
    />
  );
}

export function SiteModuleMarkdownLink() {
  return (
    <EditorialModules
      moduleType="SiteModuleMarkdown"
      moduleData={{
        type: 'SiteModuleMarkdown',
        body: text('Link', link),
      }}
    />
  );
}

export function SiteModuleMarkdownHr() {
  return (
    <EditorialModules
      moduleType="SiteModuleMarkdown"
      moduleData={{
        type: 'SiteModuleMarkdown',
        body: text('Hr', hr),
      }}
    />
  );
}

export function Description() {
  return (
    <p css={typography.bodyCopy}>
      <Markdown>{text('Description Text', descriptionText)}</Markdown>
    </p>
  );
}
