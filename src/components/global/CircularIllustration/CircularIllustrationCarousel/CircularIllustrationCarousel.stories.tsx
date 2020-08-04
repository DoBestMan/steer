import { boolean, text } from '@storybook/addon-knobs';

import { Cars } from '~/components/global/Car/Car.enums';

import CarCarousel, { CarProps } from './CircularIllustrationCarousel';

const cars: Array<CarProps> = [
  {
    id: Cars[Object.keys(Cars)[10] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
  {
    id: Cars[Object.keys(Cars)[11] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
  {
    id: Cars[Object.keys(Cars)[12] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
  {
    id: Cars[Object.keys(Cars)[13] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
  {
    id: Cars[Object.keys(Cars)[14] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
  {
    id: Cars[Object.keys(Cars)[15] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
  {
    id: Cars[Object.keys(Cars)[16] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
  {
    id: Cars[Object.keys(Cars)[17] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
  {
    id: Cars[Object.keys(Cars)[18] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
  {
    id: Cars[Object.keys(Cars)[19] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
  {
    id: Cars[Object.keys(Cars)[20] as Cars],
    subTitle: 'Best Tires for',
    title: 'Catgory',
  },
];

export default {
  component: CarCarousel,
  title: 'Global/CircularIllustration/CircularIllustrationCarousel',
};

export function CarCarouselWithKnob() {
  const hasSubTitle = boolean('Has Subtitle?', true);
  const subTitle = text(
    'SubTitle',
    'We have identified some of the best tires for the most popular vehicles on the road today.',
  );
  const title = text('Title', 'Top vehicles');
  return (
    <CarCarousel
      cars={cars}
      title={title}
      subTitle={hasSubTitle ? subTitle : undefined}
    />
  );
}
