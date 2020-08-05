import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';

import Modal from '~/components/global/Modal/Modal';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useModalContext } from '~/context/Modal.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { MODAL_THEME } from '~/lib/constants';

const Search = dynamic(() => import('./Search'));

function SearchModal() {
  const {
    addPastSearch,
    clearSearchResults,
    deletePastSearches,
    getPastSearches,
    hasLockedSearchState,
    hasSearchResultsError,
    isLoadingResults,
    isSearchOpen,
    pastSearches,
    searchQuery,
    searchState,
    searchResults,
    setHasLockedSearchState,
    setSearchState,
    toggleIsSearchOpen,
    setRouteQueryParamOptions,
    setShouldPreventLinkNavigation,
    shouldPreventLinkNavigation,
  } = useSearchContext();
  const { customerServiceNumber } = useSiteGlobalsContext();
  const { isModalOpen } = useModalContext();

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
    if (!isSearchOpen) {
      return;
    }

    // Clear search results and state when the modal closes
    clearSearchResults();
    setSearchState('');
    setHasLockedSearchState(false);
    setShouldPreventLinkNavigation(false);
    setRouteQueryParamOptions();
    toggleIsSearchOpen();
  };

  const router = useRouter();

  // Close the search modal on route change complete
  // Allows for seamless transition into Category Loading Interstitial
  useEffect(() => {
    router.events.on('routeChangeComplete', handleCloseSearch);

    return () => {
      router.events.off('routeChangeComplete', handleCloseSearch);
    };
  });

  useEffect(() => {
    requestAnimationFrame(toggleDisableScroll);
  }, [toggleDisableScroll]);

  // Remove the scroll lock when another modal is opened when search is open.
  // Without this, the nested modal would not be able to scroll.
  useEffect(() => {
    if (isSearchOpen && isModalOpen) {
      clearAllBodyScrollLocks();
    } else if (isSearchOpen && contentRef.current) {
      disableBodyScroll(contentRef.current);
    }
  }, [isModalOpen, isSearchOpen]);

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
        hasSearchResultsError={hasSearchResultsError}
        isLoadingResults={isLoadingResults}
        onCloseSearchClick={handleCloseSearch}
        onSearchQuery={searchQuery}
        onSetSearchState={setSearchState}
        pastSearches={pastSearches}
        results={searchResults}
        searchState={searchState}
        shouldPreventLinkNavigation={shouldPreventLinkNavigation}
      />
    </Modal>
  );
}

export default SearchModal;
