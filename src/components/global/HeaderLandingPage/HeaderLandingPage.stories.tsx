import { select, text } from '@storybook/addon-knobs';

import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { COLORS, HEADER_SIZE, THEME } from '~/lib/constants';

import HeaderLandingPage from './HeaderLandingPage';

export default {
  component: HeaderLandingPageImageWithKnobs,
  title: 'Global/HeaderLandingPage',
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

export function HeaderLandingPageImageWithKnobs() {
  const imageSrc = text(
    'Image Source',
    'https://images.simpletire.com/image/upload/v1593622050/steer/seo/brand_page_header_image.svg',
  );
  const imageAltText = text('Image Alt Text', 'Header image for Seo pages');
  const title = text('Title', defaultProps.title);
  const subTitle = text('Sub Title', defaultProps.subTitle);
  const body = text('Body', defaultProps.body);
  const image: SiteImage = {
    altText: imageAltText,
    src: imageSrc,
    type: ICON_IMAGE_TYPE.IMAGE,
  };
  return (
    <HeaderLandingPage
      {...{
        title,
        subTitle,
        body,
        image,
      }}
    />
  );
}

export function HeaderLandingPageNoImageWithKnobs() {
  const title = text('Title', defaultProps.title);

  const theme = select(
    'Theme',
    [THEME.LIGHT, THEME.DARK, THEME.ORANGE],
    THEME.LIGHT,
  );

  const themeMap = {
    [THEME.DARK]: COLORS.GLOBAL.BLACK,
    [THEME.LIGHT]: COLORS.GLOBAL.WHITE,
    [THEME.ORANGE]: COLORS.GLOBAL.ORANGE,
  };

  const backgroundColor = themeMap[theme];

  const titleSize = select(
    'Title Size',
    [HEADER_SIZE.JUMBO, HEADER_SIZE.PRIMARY],
    HEADER_SIZE.JUMBO,
  );
  const subTitle = text('Sub Title', defaultProps.subTitle);
  const body = text('Body', defaultProps.body);

  return (
    <div css={{ backgroundColor, height: '100vh' }}>
      <HeaderLandingPage
        {...{
          body,
          subTitle,
          theme,
          title,
          titleSize,
        }}
      />
    </div>
  );
}

export function HeaderLandingPageNoSubHeader() {
  const title = defaultProps.title;
  const body = text('Body', defaultProps.body);
  return (
    <HeaderLandingPage
      {...{
        title,
        body,
      }}
    />
  );
}

export function HeaderLandingPageNoBody() {
  const title = defaultProps.title;
  const subTitle = defaultProps.subTitle;
  return (
    <HeaderLandingPage
      {...{
        title,
        subTitle,
      }}
    />
  );
}
