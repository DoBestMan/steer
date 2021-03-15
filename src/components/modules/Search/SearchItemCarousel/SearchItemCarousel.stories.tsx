import SearchItemCarousel from './SearchItemCarousel';
import { categoryData, vehicleData } from './SearchItemCarousel.data';

export default {
  component: SearchItemCarousel,
  title: 'Search/SearchItemCarousel',
};

export function DefaultSearchItemCarousel() {
  return (
    <div>
      <div>
        <SearchItemCarousel title="Tire Category" items={categoryData} />
      </div>
      <div>
        <SearchItemCarousel title="Vehicle Type" items={vehicleData} />
      </div>
    </div>
  );
}
