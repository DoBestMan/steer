import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { useCallback, useEffect, useRef } from 'react';

import Modal from '~/components/global/Modal/Modal';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { useRouter } from '~/hooks/useRouter';
import { MODAL_THEME } from '~/lib/constants';

import Search from './Search';

function SearchModal() {
  const {
    addPastSearch,
    clearSearchResults,
    deletePastSearches,
    getPastSearches,
    hasLockedSearchState,
    isSearchOpen,
    pastSearches,
    searchQuery,
    searchState,
    searchResults,
    setSearchState,
    toggleIsSearchOpen,
  } = useSearchContext();
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();

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

  const handleCloseSearch = () => {
    // Clear search results and state when the modal closes
    clearSearchResults();
    setSearchState('');

    toggleIsSearchOpen();
  };

  // Close the search modal on route change
  useRouter({ onRouteChange: isSearchOpen ? handleCloseSearch : undefined });

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
        customerServiceNumber={customerServiceNumber}
        deletePastSearches={deletePastSearches}
        forwardedRef={contentRef}
        hasLockedSearchState={hasLockedSearchState}
        isCustomerServiceEnabled={customerServiceEnabled}
        onCloseSearchClick={handleCloseSearch}
        onSearchQuery={searchQuery}
        onSetSearchState={setSearchState}
        pastSearches={pastSearches}
        results={searchResults}
        searchState={searchState}
      />
    </Modal>
  );
}

export default SearchModal;
