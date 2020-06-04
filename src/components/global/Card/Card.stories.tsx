import { css } from '@emotion/core';
import { select, text } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { INSIGHT_TYPE } from '~/lib/backend/insights.types';
import { COLORS, SPACING } from '~/lib/constants';

import Card from './Card';
import ListCard from './ListCard';

export default {
  component: Card,
  title: 'Global/Card',
};

const styles = {
  container: css({
    height: '100%',
  }),
  root: css({
    backgroundColor: COLORS.GLOBAL.BLACK,
    minHeight: '100vh',
    padding: `${SPACING.SIZE_40}px 0`,
  }),
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
  const body = text('Description', 'Description Text');
  const cta = text('CTA Text', 'CTA Text');
  return (
    <CardContainer>
      <Card
        id="1"
        type={INSIGHT_TYPE.DEFAULT}
        linkLabel={cta}
        link={{ href: '/', isExternal: false }}
        eyebrow={highlight}
        eyebrowIcon={{ svgId: eyebrowIcon, type: ICON_IMAGE_TYPE.ICON }}
        figures={[{ type: 'string', value: decorator }]}
        {...{ body, title }}
      />
    </CardContainer>
  );
}

export function CardWithNumber() {
  return (
    <CardContainer>
      <Card
        id="2"
        type={INSIGHT_TYPE.DEFAULT}
        linkLabel="Find tires with long durability"
        link={{ href: '/', isExternal: false }}
        eyebrow="Trending"
        eyebrowIcon={{ svgId: ICONS.ARROW_UP, type: ICON_IMAGE_TYPE.ICON }}
        figures={[{ type: 'string', value: '8 in 10' }]}
        body="Most drivers select tires that last between more than 50,000 miles."
        title="Drivers prioritize tires with long durability."
      />
    </CardContainer>
  );
}

export function CardWithIcon() {
  return (
    <CardContainer>
      <Card
        id="3"
        eyebrow={null}
        eyebrowIcon={null}
        type={INSIGHT_TYPE.DEFAULT}
        linkLabel="Find tires with long durability"
        link={{ href: '/', isExternal: false }}
        figures={[{ svgId: ICONS.WHEEL, type: ICON_IMAGE_TYPE.ICON }]}
        body="Most drivers select tires that last between more than 50,000 miles."
        title="Drivers prioritize tires with long durability."
      />
    </CardContainer>
  );
}

const mockImagePlaceholder = {
  altText: '25x25 image',
  srcSet: 'https://via.placeholder.com/25',
  type: ICON_IMAGE_TYPE.IMAGE,
} as SiteImage;

const mockSvg = {
  svgId: ICONS.VEHICLE_RV,
  type: ICON_IMAGE_TYPE.ICON,
} as SiteIcon;

export function CardWithList() {
  const mockListItems = [
    {
      icon: mockImagePlaceholder,
      label: text('List Item 1 Text', 'Passenger'),
      link: { href: '/', isExternal: false },
    },
    {
      icon: mockImagePlaceholder,
      label: text('List Item 2 Text', 'Light trucks'),
      link: { href: '/', isExternal: false },
    },
    {
      icon: mockImagePlaceholder,
      label: text('List Item 3 Text', 'Farm & Agriculture'),
      link: { href: '/', isExternal: false },
    },
    {
      icon: mockImagePlaceholder,
      label: text('List Item 4 Text', 'Specialty'),
      link: { href: '/', isExternal: false },
    },
    {
      icon: mockSvg,
      label: text('List Item 5 Text', 'RV'),
      link: { href: '/', isExternal: false },
    },
  ];

  return (
    <CardContainer>
      <ListCard
        id="5"
        title={text('Title', 'Find any tire.')}
        items={mockListItems}
        more={{
          label: text('CTA Text', 'See more'),
          link: { href: '/', isExternal: false },
        }}
        type={INSIGHT_TYPE.LIST}
      />
    </CardContainer>
  );
}
