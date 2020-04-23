import { text, select } from '@storybook/addon-knobs';
import { css } from '@emotion/core';

import Card from './Card';

import ListCard from './ListCard';

import { SPACING, Image as ImageType } from '~/lib/constants';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Grid from '~/components/global/Grid/Grid';

import { backgroundColors } from '~/styles/colors.styles';
import { IconOrImageProps } from '~/components/global/IconOrImage/IconOrImage';

export default {
  component: Card,
  title: 'Card',
};

const styles = {
  container: css({
    height: '100%',
  }),
  root: [
    backgroundColors.GLOBAL.BLACK,
    css({
      minHeight: '100vh',
      padding: `${SPACING.SIZE_40}px 0`,
    }),
  ],
};

function CardContainer({ children }: { children: React.ReactChild }) {
  return (
    <div css={styles.root}>
      <Grid css={styles.container}>{children}</Grid>
    </div>
  );
}

export function CardWithKnobs() {
  const title = text('Title', 'Card Title');
  const decorator = text('Decorator', '#');
  const eyebrowIcon = select('Eyebrow Icon', Object.values(ICONS), 'close');
  const highlight = text('Eyebrow Text', 'Eyebrow Text');
  const description = text('Description', 'Description Text');
  const cta = text('CTA Text', 'CTA Text');
  return (
    <CardContainer>
      <Card
        cta={cta}
        ctaLink="/"
        eyebrow={highlight}
        eyebrowIcon={eyebrowIcon}
        decorator={decorator}
        {...{ description, title }}
      />
    </CardContainer>
  );
}

export function CardWithNumber() {
  return (
    <CardContainer>
      <Card
        cta="Find tires with long durability"
        ctaLink="/"
        eyebrow="Trending"
        eyebrowIcon={ICONS.ARROW_BOTTOM}
        decorator="8 in 10"
        description="Most drivers select tires that last between more than 50,000 miles."
        title="Drivers prioritize tires with long durability."
      />
    </CardContainer>
  );
}

export function CardWithIcon() {
  return (
    <CardContainer>
      <Card
        cta="Find tires with long durability"
        ctaLink="/"
        decorator={ICONS.ICON_WHEEL}
        description="Most drivers select tires that last between more than 50,000 miles."
        title="Drivers prioritize tires with long durability."
      />
    </CardContainer>
  );
}

const mockImagePlaceholder = {
  altText: '25x25 image',
  srcSet: 'https://via.placeholder.com/25',
  type: ImageType.BITMAP,
} as IconOrImageProps;

const mockSvg = {
  svgId: ICONS.RV,
  type: ImageType.SVG,
} as IconOrImageProps;

export function CardWithList() {
  const mockListItems = [
    {
      href: '/',
      image: mockImagePlaceholder,
      label: text('List Item 1 Text', 'Passenger'),
    },
    {
      href: '/',
      image: mockImagePlaceholder,
      label: text('List Item 2 Text', 'Light trucks'),
    },
    {
      href: '/',
      image: mockImagePlaceholder,
      label: text('List Item 3 Text', 'Farm & Agriculture'),
    },
    {
      href: '/',
      image: mockImagePlaceholder,
      label: text('List Item 4 Text', 'Specialty'),
    },
    {
      href: '/',
      image: mockSvg,
      label: text('List Item 5 Text', 'RV'),
    },
  ];

  return (
    <CardContainer>
      <ListCard
        title={text('Title', 'Find any tire.')}
        listItems={mockListItems}
        cta={text('CTA Text', 'See more')}
        ctaLink="/"
      />
    </CardContainer>
  );
}
