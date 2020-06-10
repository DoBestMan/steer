import { useRef, useState } from 'react';

import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { scrollIntoViewIfNeeded } from '~/lib/utils/accessibility';

const DEFAULT_CLEARANCE = {
  bottom: 0,
  top: 145, // height of search input bar
};

/**
 * This hook takes care of the selection logic for selecting search
 * results via keyboard.
 */
export function useAutocompleteSelectedItem(results: SiteSearchResultGroup[]) {
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

export function useFocusScrollIntoView({
  clearance = DEFAULT_CLEARANCE,
}: {
  clearance?: { bottom: number; top: number };
}) {
  const itemRefs = useRef<HTMLLIElement[] & HTMLDivElement[]>([]);
  const pushRefToArray = (ref: HTMLLIElement & HTMLDivElement) => {
    itemRefs.current.push(ref);
  };

  const onFocus = (index: number) => () => {
    scrollIntoViewIfNeeded(itemRefs.current[index], clearance);
  };

  return {
    onFocus,
    pushRefToArray,
  };
}
