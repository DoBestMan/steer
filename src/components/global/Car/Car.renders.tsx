import dynamic from 'next/dynamic';

import { Cars } from './Car.types';

// Dynamically import the illustrations
// so we exclude the illustrations from the main page bundle
// and only inject the correct illustration
// To make it work, we have to list all the dynamic imports, one by one...
export const Sedan = dynamic(
  () => import('~/components/global/Car/all/Sedan'),
  {
    ssr: false, //not server side rendered
  },
);

export function renderCar(id: Cars | string): JSX.Element | null {
  // giant switch? Probably a better way
  switch (id) {
    case Cars['car--sedan']:
      return <Sedan />;

    // default: returns a fallback
    default:
      return <Sedan />;
  }
}
