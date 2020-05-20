import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { useCallback, useEffect, useRef, useState } from 'react';

import Modal from '~/components/global/Modal/Modal';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { MODAL_THEME } from '~/lib/constants';

import Search from './Search';
import { pastSearchResults, simpleSearchResults } from './Search.mocks';

function SearchModal() {
  const [pastSearches, setPastSearches] = useState(pastSearchResults);
  const { isSearchOpen, toggleIsSearchOpen } = useSearchContext();
  const handleClearSearchesClick = function () {
    setPastSearches([]);
  };

  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDisableScroll = useCallback(() => {
    if (isSearchOpen && contentRef.current) {
      disableBodyScroll(contentRef.current);
    } else {
      clearAllBodyScrollLocks();
    }
  }, [contentRef, isSearchOpen]);

  useEffect(() => {
    requestAnimationFrame(toggleDisableScroll);
  }, [toggleDisableScroll]);

  return (
    <Modal
      contentLabel="Modal"
      hasCloseButton={false}
      theme={MODAL_THEME.ORANGE}
      onClose={toggleIsSearchOpen}
      isOpen={isSearchOpen}
    >
      <Search
        forwardedRef={contentRef}
        onClearSearchesClick={handleClearSearchesClick}
        onCloseSearchClick={toggleIsSearchOpen}
        pastSearches={pastSearches}
        results={simpleSearchResults}
      />
    </Modal>
  );
}

export default SearchModal;
