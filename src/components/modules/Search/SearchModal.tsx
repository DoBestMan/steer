import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { useCallback, useEffect, useRef } from 'react';

import Modal from '~/components/global/Modal/Modal';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { MODAL_THEME } from '~/lib/constants';

import Search from './Search';

function SearchModal() {
  const {
    addPastSearch,
    deletePastSearches,
    getPastSearches,
    isSearchOpen,
    pastSearches,
    searchQuery,
    searchResults,
    toggleIsSearchOpen,
  } = useSearchContext();
  const { customerServiceEnabled } = useSiteGlobalsContext();
  const handleClearSearchesClick = function () {
    deletePastSearches();
  };

  useEffect(() => {
    if (isSearchOpen) {
      getPastSearches();
    }
  }, [isSearchOpen, getPastSearches]);

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
        addPastSearch={addPastSearch}
        isCustomerServiceEnabled={customerServiceEnabled}
        forwardedRef={contentRef}
        onClearSearchesClick={handleClearSearchesClick}
        onCloseSearchClick={toggleIsSearchOpen}
        onSearchQuery={searchQuery}
        pastSearches={pastSearches}
        results={searchResults}
      />
    </Modal>
  );
}

export default SearchModal;
