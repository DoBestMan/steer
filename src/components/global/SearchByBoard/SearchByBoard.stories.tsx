import { SearchContextProvider } from '~/components/modules/Search/Search.context';
import { SearchModalContextProvider } from '~/components/modules/Search/SearchModal.context';

import SearchByBoard from './SearchByBoard';

export default {
  component: SearchByBoard,
  title: 'Global/SearchByBoard',
};

export function DefaultSearchByBoard() {
  const mockProps = {
    title: 'shop tires by',
  };

  return (
    <SearchContextProvider>
      <SearchModalContextProvider>
        <SearchByBoard {...mockProps} />
      </SearchModalContextProvider>
    </SearchContextProvider>
  );
}
