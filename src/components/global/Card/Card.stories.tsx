import { text, select } from '@storybook/addon-knobs';
import { css } from '@emotion/core';

import Card from './Card';

import { SPACING } from '~/lib/constants';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Layout from '~/components/global/Layout/Layout';

import { backgroundColors } from '~/styles/global/colors.styles';

export default {
  component: Card,
  title: 'Card',
};

const styles = {
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
      <Layout>{children}</Layout>
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
