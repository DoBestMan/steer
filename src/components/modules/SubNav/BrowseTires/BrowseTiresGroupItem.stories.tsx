import { browseTiresGroupItems } from '~/components/modules/SubNav/SubNav.mocks';

import BrowseTiresGroupItem from './BrowseTiresGroupItem';

export default {
  component: BrowseTiresGroupItem,
  title: 'Nav/Browse Tires GroupItem',
};

export function ImagesAndFlair() {
  return <BrowseTiresGroupItem {...browseTiresGroupItems.deals} />;
}

export function TitleAndVehicleIcons() {
  return <BrowseTiresGroupItem {...browseTiresGroupItems.vehicleType} />;
}

export function TitleAndRegularIcons() {
  return <BrowseTiresGroupItem {...browseTiresGroupItems.tireCategory} />;
}

export function TitleAndIcon() {
  return <BrowseTiresGroupItem {...browseTiresGroupItems.wheelSizes} />;
}
