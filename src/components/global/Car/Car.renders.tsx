import dynamic from 'next/dynamic';

import { CARS } from './Car.constants';
import { Cars } from './Car.types';

// Dynamically import the illustrations
// so we exclude the illustrations from the main page bundle
// and only inject the correct illustration
// To make it work, we have to list all the dynamic imports, one by one...
export const CommercialVan = dynamic(
  () => import('~/components/global/Car/all/CommercialVan'),
  {
    ssr: false, //not server side rendered
  },
);

export const Sedan = dynamic(
  () => import('~/components/global/Car/all/Sedan'),
  {
    ssr: false, //not server side rendered
  },
);

const mapIdToCar = {
  [CARS.COMMERCIAL_VAN]: CommercialVan,
  [CARS.SEDAN]: Sedan,
};

export function renderCar(id: Cars | string): JSX.Element | null {
  const Component = mapIdToCar[id];
  if (!Component) {
    console.error(
      `Car > renderCar: ${id} doesn't map with a valid component (see mapIdToCar)`,
    );
  }
  return Component ? <Component /> : null;
}
