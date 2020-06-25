import { select, text } from '@storybook/addon-knobs';

import { Cars } from '~/components/global/Car/Car.enums';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import CircularIllustrationItem, {
  TitlePosition,
} from './CircularIllustrationItem';
import { styles } from './CircularIllustrationItem.styles';

export default {
  component: CircularIllustrationItem,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  title: 'Global/CircularIllustrationItem',
};

const defaultProps = {
  brand: {
    image: {
      altText: 'Accelera',
      height: 20,
      src:
        'https://images.simpletire.com/image/upload/v1592606314/Accelera_Tires_black_j207to.svg',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 120,
    } as SiteImage,
    label: 'Accelera',
  },
  subTitle: '1,234 tires',
  tagLabel: 'Top rated',
  title: 'Accelera',
  titlePosition: TitlePosition['top'],
};

export function CircularIllustrationItemForBrandWithKnobs() {
  const brandId = defaultProps.brand;
  brandId.image.src = text('Image Src', defaultProps.brand.image.src);
  const title = text('Title', defaultProps.title);
  const subTitle = text('Sub Title', defaultProps.subTitle);
  const titlePosition = select(
    'Title Position',
    TitlePosition,
    TitlePosition['top'],
  );
  const tagLabel = text('Tag Label', defaultProps.tagLabel);

  return (
    <CircularIllustrationItem
      brand={brandId}
      title={title}
      subTitle={subTitle}
      titlePosition={titlePosition}
      tagLabel={tagLabel}
    />
  );
}

export function CircularIllustrationItemForCarWithKnobs() {
  const car = select('Car', Object.keys(Cars), Object.keys(Cars)[10]) as Cars;
  const title = text('Title', 'Crossover');
  const subTitle = text('Sub Title', defaultProps.subTitle);
  const titlePosition = select(
    'Title Position',
    TitlePosition,
    TitlePosition['top'],
  );

  return (
    <CircularIllustrationItem
      carId={car}
      title={title}
      subTitle={subTitle}
      titlePosition={titlePosition}
    />
  );
}

export function CircularIllustrationItemInGrid() {
  return (
    <Grid>
      <GridItem
        css={styles.titlePositionTop}
        gridColumn={'2/4'}
        gridColumnM={'2/4'}
        gridColumnL={'2/5'}
      >
        <CircularIllustrationItem
          brand={defaultProps.brand}
          title={defaultProps.title}
          subTitle={defaultProps.subTitle}
          titlePosition={defaultProps.titlePosition}
          tagLabel={defaultProps.tagLabel}
        />
      </GridItem>
      <GridItem
        css={styles.titlePositionTop}
        gridColumn={'4/6'}
        gridColumnM={'4/6'}
        gridColumnL={'5/8'}
      >
        <CircularIllustrationItem
          brand={defaultProps.brand}
          title={defaultProps.title}
          subTitle={defaultProps.subTitle}
          titlePosition={defaultProps.titlePosition}
        />
      </GridItem>
      <GridItem
        css={styles.titlePositionTop}
        gridColumn={'2/4'}
        gridColumnM={'6/8'}
        gridColumnL={'8/11'}
      >
        <CircularIllustrationItem
          brand={defaultProps.brand}
          title={defaultProps.title}
          subTitle={defaultProps.subTitle}
          titlePosition={defaultProps.titlePosition}
        />
      </GridItem>
      <GridItem
        css={styles.titlePositionTop}
        gridColumn={'4/6'}
        gridColumnM={'2/4'}
        gridColumnL={'11/14'}
      >
        <CircularIllustrationItem
          brand={defaultProps.brand}
          title={defaultProps.title}
          subTitle={defaultProps.subTitle}
          titlePosition={defaultProps.titlePosition}
          tagLabel={defaultProps.tagLabel}
        />
      </GridItem>
    </Grid>
  );
}
