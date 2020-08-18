import { select, text } from '@storybook/addon-knobs';

import { Cars } from '~/components/global/Car/Car.enums';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import CircularIllustrationItem, {
  TitlePlacement,
} from './CircularIllustrationItem';
import { styles } from './CircularIllustrationItem.styles';

export default {
  component: CircularIllustrationItem,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  title: 'Global/CircularIllustration/CircularIllustrationItem',
};

const defaultProps = {
  byline: '1,234 tires',
  highlight: 'Top rated',
  image: {
    altText: 'Accelera',
    height: 20,
    src:
      'https://images.simpletire.com/image/upload/v1592606314/Accelera_Tires_black_j207to.svg',
    type: ICON_IMAGE_TYPE.IMAGE,
    width: 120,
  } as SiteImage,
  link: {
    href: '/passenger-tires',
    isExternal: false,
  },
  title: 'Accelera',
  titlePlacement: TitlePlacement.top,
};

export function CircularIllustrationItemForBrandWithKnobs() {
  const image = defaultProps.image;
  image.src = text('Image Src', defaultProps.image.src);
  const title = text('Title', defaultProps.title);
  const byline = text('Sub Title', defaultProps.byline);
  const href = text('Sub Title', defaultProps.link.href);
  const titlePlacement = select(
    'Title Position',
    TitlePlacement,
    TitlePlacement.top,
  );
  const link = {
    href,
    isExternal: false,
  };
  const highlight = text('Tag Label', defaultProps.highlight);

  return (
    <CircularIllustrationItem
      image={image}
      title={title}
      byline={byline}
      titlePlacement={titlePlacement}
      highlight={highlight}
      link={link}
    />
  );
}

export function CircularIllustrationItemForCarWithKnobs() {
  const car = select('Car', Object.keys(Cars), Object.keys(Cars)[10]) as Cars;

  const title = text('Title', 'Crossover');
  const byline = text('Sub Title', defaultProps.byline);
  const titlePlacement = select(
    'Title Placement',
    TitlePlacement,
    TitlePlacement['top'],
  );
  const href = text('Sub Title', defaultProps.link.href);
  const link = {
    href,
    isExternal: false,
  };
  return (
    <CircularIllustrationItem
      image={{
        type: ICON_IMAGE_TYPE.CAR,
        vehicleType: car,
      }}
      title={title}
      byline={byline}
      titlePlacement={titlePlacement}
      link={link}
    />
  );
}

export function CircularIllustrationItemForIconWithKnobs() {
  const icons = select('Icons', Object.values(ICONS), Object.values(ICONS)[1]);

  const title = text('Title', 'All Season Tires');
  const byline = text('Sub Title', '1,234 tires');
  const titlePlacement = select(
    'Title Placement',
    TitlePlacement,
    TitlePlacement['top'],
  );
  const href = text('Sub Title', defaultProps.link.href);
  const link = {
    href,
    isExternal: false,
  };
  return (
    <CircularIllustrationItem
      image={{
        svgId: icons,
        type: ICON_IMAGE_TYPE.ICON,
      }}
      title={title}
      byline={byline}
      titlePlacement={titlePlacement}
      link={link}
    />
  );
}

export function CircularIllustrationItemInGrid() {
  return (
    <Grid>
      <GridItem
        css={styles.TitlePlacementTop}
        gridColumn={'2/4'}
        gridColumnM={'2/4'}
        gridColumnL={'2/5'}
        gridColumnXL={'4/6'}
      >
        <CircularIllustrationItem
          image={defaultProps.image}
          title={defaultProps.title}
          byline={defaultProps.byline}
          titlePlacement={defaultProps.titlePlacement}
          highlight={defaultProps.highlight}
          link={defaultProps.link}
        />
      </GridItem>
      <GridItem
        css={styles.TitlePlacementTop}
        gridColumn={'4/6'}
        gridColumnM={'4/6'}
        gridColumnL={'5/8'}
        gridColumnXL={'6/8'}
      >
        <CircularIllustrationItem
          image={defaultProps.image}
          title={defaultProps.title}
          byline={defaultProps.byline}
          titlePlacement={defaultProps.titlePlacement}
          link={defaultProps.link}
        />
      </GridItem>
      <GridItem
        css={styles.TitlePlacementTop}
        gridColumn={'2/4'}
        gridColumnM={'6/8'}
        gridColumnL={'8/11'}
        gridColumnXL={'8/10'}
      >
        <CircularIllustrationItem
          image={defaultProps.image}
          title={defaultProps.title}
          byline={defaultProps.byline}
          titlePlacement={defaultProps.titlePlacement}
          link={defaultProps.link}
        />
      </GridItem>
      <GridItem
        css={styles.TitlePlacementTop}
        gridColumn={'4/6'}
        gridColumnM={'2/4'}
        gridColumnL={'11/14'}
        gridColumnXL={'10/12'}
      >
        <CircularIllustrationItem
          image={defaultProps.image}
          title={defaultProps.title}
          byline={defaultProps.byline}
          titlePlacement={defaultProps.titlePlacement}
          highlight={defaultProps.highlight}
          link={defaultProps.link}
        />
      </GridItem>
    </Grid>
  );
}
