import { text } from '@storybook/addon-knobs';

import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import HeaderWithLogo from './HeaderWithLogo';

export default {
  component: HeaderWithLogoImageWithKnobs,
  title: 'Global/HeaderWithLogo',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

const defaultProps = {
  body:
    'Optional overview, which can be used in place of a subheader. Recommended to be truncated after the first sentence, or 4 lines, for long paragraphs. Only show read more button if text is truncated.\n\nFeatures a state-of-the-art silica compound that lowers rolling resistance to improve fuel efficiency.',
  collapseBodyCTALabel: 'Read less',
  expandBodyCTALabel: 'Read more',
  subTitle:
    'Optional subheader wrapping as many lines as needed on medium screen.',
  title: 'Landing page header',
};
const imageSrc = text(
  'Image Source',
  'https://images.simpletire.com/image/upload/v1596765107/manf-logos/61b.svg',
);
const imageAltText = text('Image Alt Text', 'Header image for Seo pages');
const image: SiteImage = {
  altText: imageAltText,
  src: imageSrc,
  type: ICON_IMAGE_TYPE.IMAGE,
};

export function HeaderWithLogoImageWithKnobs() {
  const title = text('Title', defaultProps.title);
  const subTitle = text('Sub Title', defaultProps.subTitle);
  const body = text('Body', defaultProps.body);
  return (
    <div css={{ padding: '20px' }}>
      <HeaderWithLogo
        {...{
          title,
          subTitle,
          body,
          image,
        }}
      />
    </div>
  );
}

export function HeaderWithLogoNoTitleNoSubHeader() {
  const title = '';
  const body = text('Body', defaultProps.body);
  return (
    <div css={{ padding: '20px' }}>
      <HeaderWithLogo
        {...{
          body,
          image,
          title,
        }}
      />
    </div>
  );
}

export function HeaderWithLogoNoSubHeader() {
  const title = defaultProps.title;
  const body = text('Body', defaultProps.body);
  return (
    <div css={{ padding: '20px' }}>
      <HeaderWithLogo
        {...{
          body,
          image,
          title,
        }}
      />
    </div>
  );
}

export function HeaderWithLogoNoBody() {
  const title = defaultProps.title;
  const subTitle = defaultProps.subTitle;
  return (
    <div css={{ padding: '20px' }}>
      <HeaderWithLogo
        {...{
          image,
          title,
          subTitle,
        }}
      />
    </div>
  );
}
