import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { useCallback, useEffect, useRef, useState } from 'react';

import Modal from '~/components/global/Modal/Modal';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { MODAL_THEME } from '~/lib/constants';

import Search from './Search';
import { pastSearchResults } from './Search.mocks';

function SearchModal() {
  const [pastSearches, setPastSearches] = useState(pastSearchResults);
  const {
    isSearchOpen,
    searchQuery,
    searchResults,
    toggleIsSearchOpen,
  } = useSearchContext();
  const { customerServiceEnabled } = useSiteGlobalsContext();
  const handleClearSearchesClick = function () {
    setPastSearches([]);
  };
  const handleSetSearchCategory = () => {};

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
      isFullscreen
      contentLabel="Modal"
      hasCloseButton={false}
      theme={MODAL_THEME.ORANGE}
      onClose={toggleIsSearchOpen}
      isOpen={isSearchOpen}
    >
      <Search
        isCustomerServiceEnabled={customerServiceEnabled}
        forwardedRef={contentRef}
        onClearSearchesClick={handleClearSearchesClick}
        onCloseSearchClick={toggleIsSearchOpen}
        onSearchQuery={searchQuery}
        onSetSearchCategory={handleSetSearchCategory}
        pastSearches={pastSearches}
        results={searchResults}
      />
    </Modal>
  );
}

export default SearchModal;
