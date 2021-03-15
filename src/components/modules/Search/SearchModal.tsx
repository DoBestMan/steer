import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import Modal from '~/components/global/Modal/Modal';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import CatalogLoading from '~/components/pages/CatalogPage/CatalogLoading/CatalogLoading';
import { useModalContext } from '~/context/Modal.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { MODAL_THEME, TIME } from '~/lib/constants';
import { getScroll } from '~/lib/helpers/scroll';

import styles from './SearchModal.styles';

const Search = dynamic(() => import('./Search'));

function SearchModal() {
  const [showLoading, setShowLoading] = useState(false);
  const scrollY = useRef(getScroll().y);
  const {
    isSearchOpen,
    setPrimaryQuery,
    toggleIsSearchOpen,
  } = useSearchModalContext();
  const {
    addPastSearch,
    clearSearchResults,
    deletePastSearches,
    getPastSearches,
    hasLockedSearchState,
    hasSearchResultsError,
    isLoadingResults,
    pastSearches,
    searchQuery,
    searchState,
    searchResults,
    setHasLockedSearchState,
    setQueryParamLabel,
    setSearchState,
    setRouteQueryParamOptions,
    setShouldPreventLinkNavigation,
    shouldPreventLinkNavigation,
  } = useSearchContext();
  const { customerServiceNumber } = useSiteGlobalsContext();
  const { isModalOpen } = useModalContext();

  useEffect(() => {
    if (isSearchOpen) {
      getPastSearches();
      setShowLoading(false);
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

  const handleCloseSearch = useCallback(() => {
    if (!isSearchOpen) {
      return;
    }
    // Move window back to original position (see handleAfterOpenModal function)
    window.scrollTo(0, scrollY.current);
    // Clear search results and state when the modal closes
    clearSearchResults();
    setPrimaryQuery({
      queryText: '',
      queryType: '',
    });
    setSearchState('');
    setHasLockedSearchState(false);
    setShouldPreventLinkNavigation(false);
    setRouteQueryParamOptions();
    setQueryParamLabel();
    toggleIsSearchOpen();
  }, [
    isSearchOpen,
    clearSearchResults,
    setPrimaryQuery,
    setSearchState,
    setHasLockedSearchState,
    setQueryParamLabel,
    setShouldPreventLinkNavigation,
    setRouteQueryParamOptions,
    toggleIsSearchOpen,
  ]);

  const router = useRouter();

  // Close the search modal on route change complete
  // Allows for seamless transition into Category Loading Interstitial
  useEffect(() => {
    router.events.on('routeChangeStart', () => setShowLoading(true));
    router.events.on('routeChangeComplete', handleCloseSearch);

    return () => {
      router.events.off('routeChangeStart', () => setShowLoading(false));
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

  const handleAfterOpenModal = () => {
    // Scroll to top in order to fix Android input bug (WCS-1542)
    setTimeout(() => {
      scrollY.current = getScroll().y;
      window.scrollTo(0, 0);
    }, TIME.MS500);
  };

  return (
    <Modal
      contentLabel="Modal"
      hasCloseButton={false}
      hasDefaultPadding={false}
      isFullscreen
      isOpen={isSearchOpen}
      onAfterOpen={handleAfterOpenModal}
      onClose={handleCloseSearch}
      theme={showLoading ? MODAL_THEME.LIGHT : MODAL_THEME.ORANGE}
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

      {showLoading && (
        <div css={styles.loaderWrapper}>
          <div css={styles.loader}>
            <CatalogLoading />
          </div>
        </div>
      )}
    </Modal>
  );
}

export default SearchModal;
