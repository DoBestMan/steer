import { useCallback, useState } from 'react';

import SizeFinderComponent from './SizeFinder';
import { sizeListMock } from './SizeFinder.mock';

export default {
  component: SizeFinderComponent,
  title: 'PDP/Size Finder',
};

export function SizeFinder() {
  const [value, setValue] = useState('100-40r15');
  const select = useCallback(
    (item) => {
      setValue(item);
    },
    [setValue],
  );

  return (
    <SizeFinderComponent
      onChange={select}
      sizes={sizeListMock}
      vehicle="Honda Civic"
      value={value}
    />
  );
}
