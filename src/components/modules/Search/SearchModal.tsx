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
    clearSearchResults,
    deletePastSearches,
    getPastSearches,
    isSearchOpen,
    pastSearches,
    searchQuery,
    searchResults,
    toggleIsSearchOpen,
  } = useSearchContext();
  const { customerServiceEnabled } = useSiteGlobalsContext();

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
      contentLabel="Modal"
      hasCloseButton={false}
      hasDefaultPadding={false}
      isFullscreen
      isOpen={isSearchOpen}
      onClose={toggleIsSearchOpen}
      theme={MODAL_THEME.ORANGE}
    >
      <Search
        addPastSearch={addPastSearch}
        clearSearchResults={clearSearchResults}
        isCustomerServiceEnabled={customerServiceEnabled}
        forwardedRef={contentRef}
        deletePastSearches={deletePastSearches}
        onCloseSearchClick={toggleIsSearchOpen}
        onSearchQuery={searchQuery}
        pastSearches={pastSearches}
        results={searchResults}
      />
    </Modal>
  );
}

export default SearchModal;
