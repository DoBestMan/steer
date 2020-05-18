import { useState } from 'react';

import { SearchGroup } from './Search';

/**
 * This hook takes care of the selection logic for selecting search
 * results via keyboard.
 */
export function useAutocompleteSelectedItem(results: SearchGroup[]) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<[number, number]>([
    0,
    -1,
  ]);

  const selectNextItemIndex = () => {
    if (results.length === 0) {
      return;
    }

    let newSelectedItemIndex = selectedItemIndex;
    const [currentResultIndex, currentResultItemIndex] = selectedItemIndex;
    const isLastResult = currentResultIndex === results.length - 1;
    const isLastItem =
      currentResultItemIndex ===
      results[currentResultIndex].siteSearchResultList.length - 1;

    if (isLastItem && !isLastResult) {
      newSelectedItemIndex = [currentResultIndex + 1, 0];
    } else if (!isLastItem) {
      newSelectedItemIndex = [currentResultIndex, currentResultItemIndex + 1];
    }

    setSelectedItemIndex(newSelectedItemIndex);
  };

  const selectPrevItemIndex = () => {
    if (results.length === 0) {
      return;
    }

    let newSelectedItemIndex = selectedItemIndex;
    const [currentResultIndex, currentResultItemIndex] = selectedItemIndex;
    const isFirstResult = currentResultIndex === 0;
    const isFirstItem = currentResultItemIndex === 0;

    if (isFirstItem && !isFirstResult) {
      newSelectedItemIndex = [
        currentResultIndex - 1,
        results[currentResultIndex - 1].siteSearchResultList.length - 1,
      ];
    } else if (!isFirstItem) {
      newSelectedItemIndex = [currentResultIndex, currentResultItemIndex - 1];
    }

    setSelectedItemIndex(newSelectedItemIndex);
  };

  return {
    selectNextItemIndex,
    selectPrevItemIndex,
    selectedItemIndex,
    setSelectedItemIndex,
  };
}
