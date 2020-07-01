import { select, text } from '@storybook/addon-knobs';

import { COLORS, HEADER_SIZE, THEME } from '~/lib/constants';

import HeaderDetailPage from './HeaderDetailPage';

export default {
  component: HeaderDetailPageWithKnobs,
  title: 'Global/HeaderDetailPage',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

const defaultProps = {
  description:
    "The ContiProContact is Continental's Grand Touring All-Season tire originally developed for European sport coupes and sedans sold in North America, and is now available for a wide range of imported and domestic cars.\n\nToday's driver often wants a tire that perform year-round. Consider the ProContact TX from Continental, which features a multidirectional tread design for outstanding grip. Offering drivers precise steering, the ProContact TX's rubber compound is designed to reduce rolling resistance to enhance fuel efficiency.\n\nFeatures a state-of-the-art silica compound that lowers rolling resistance to improve fuel efficiency.",
  header: 'Browse tire brands',
  hideFullDescriptionLinkLabel: 'Read less',
  showFullDescriptionLinkLabel: 'Read more',
  subHeader:
    'Search the largest selection of tires anywhere and find the right tires for your vehicle.',
};
export function HeaderDetailPageWithKnobs() {
  const header = text('Heading', defaultProps.header);

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

  const size = select(
    'Size',
    [HEADER_SIZE.JUMBO, HEADER_SIZE.PRIMARY],
    HEADER_SIZE.JUMBO,
  );
  const subHeader = text('Sub Header', defaultProps.subHeader);
  const description = text('Description', defaultProps.description);

  return (
    <div css={{ backgroundColor, height: '100vh' }}>
      <HeaderDetailPage
        {...{
          description,
          header,
          size,
          subHeader,
          theme,
        }}
      />
    </div>
  );
}

export function HeaderDetailPageNoSubHeader() {
  const header = defaultProps.header;
  const description = text('Description', defaultProps.description);
  return (
    <HeaderDetailPage
      {...{
        header,
        description,
      }}
    />
  );
}
export function HeaderDetailPageNoDescription() {
  const header = defaultProps.header;
  const subHeader = defaultProps.subHeader;
  return (
    <HeaderDetailPage
      {...{
        header,
        subHeader,
      }}
    />
  );
}
