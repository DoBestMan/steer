import FeaturedGridWithSteps, {
  FeaturedGridItemProps,
} from './FeaturedGridWithSteps';
const mockDataItem: FeaturedGridItemProps[] = [
  {
    icon: 'tire',
    title: 'Find your tires',
    description: 'Search our huge online catalog.',
  } as FeaturedGridItemProps,
  {
    icon: 'local-business',
    title: 'Select a local shop',
    description:
      "We'll ship your tires for free directly to the shop — or straight to your door",
  } as FeaturedGridItemProps,
  {
    icon: 'calendar',
    title: 'Choose a time',
    description: 'Schedule at your convience.',
  } as FeaturedGridItemProps,
];
export default {
  component: FeaturedGridWithSteps,
  title: 'Global/FeaturedGridWithSteps',
};

export function FeaturedGridWithStepsKnob() {
  return (
    <FeaturedGridWithSteps
      dataItems={mockDataItem}
      header={'How Simpletire works'}
    />
  );
}
