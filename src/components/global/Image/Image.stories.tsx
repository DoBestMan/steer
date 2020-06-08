import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';

import Image from './Image';
import { getSrcset } from './Image.utils';

export default {
  component: Image,
  title: 'Global/Image',
};

export function ImageWithHeightAndWidthInGrid() {
  const srcset = getSrcset(
    'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    {
      '600w': { width: 600 },
      '1000w': { width: 1000 },
      '1400w': { width: 1400 },
    },
  );

  return (
    <Grid>
      <GridItem gridColumn={'2/6'} gridColumnM={'2/5'} gridColumnL={'2/8'}>
        <Image
          altText="test"
          srcSet={srcset}
          height="400" // original height (from data)
          width="600" // original width (from data)
          responsive
        />
      </GridItem>
    </Grid>
  );
}

export function ImageWithFixedHeightAndWidth() {
  const srcset = getSrcset(
    'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    {
      '600w': { width: 600 },
    },
  );

  return <Image altText="test" srcSet={srcset} height="400" width="600" />;
}

export function ImageResponsive() {
  return (
    <div css={{ width: '50%' }}>
      <Image
        altText="test"
        srcSet="https://dummyimage.com/800x400/000/f00.jpg 800w, https://dummyimage.com/1600x400/000/f00.jpg 1600w, https://dummyimage.com/3000x400/000/f00.jpg 3000w"
      />
    </div>
  );
}
