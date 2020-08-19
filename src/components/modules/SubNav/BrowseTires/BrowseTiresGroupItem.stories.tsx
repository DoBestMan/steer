import { browseTiresGroupItemsMock } from '~/components/modules/SubNav/SubNav.mock';

import BrowseTiresGroupItem from './BrowseTiresGroupItem';

export default {
  component: BrowseTiresGroupItem,
  title: 'Nav/Browse Tires GroupItem',
};

export function ImagesAndFlair() {
  return <BrowseTiresGroupItem {...browseTiresGroupItemsMock.deals} />;
}

export function TitleAndVehicleIcons() {
  return <BrowseTiresGroupItem {...browseTiresGroupItemsMock.vehicleType} />;
}

export function TitleAndRegularIcons() {
  return <BrowseTiresGroupItem {...browseTiresGroupItemsMock.tireCategory} />;
}

export function TitleAndIcon() {
  return <BrowseTiresGroupItem {...browseTiresGroupItemsMock.wheelSizes} />;
}
