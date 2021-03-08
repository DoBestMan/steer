import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import Modal from '~/components/global/Modal/Modal';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useTireSnapModalContext } from '~/components/modules/TireSnap/TireSnapModal.context';
import { useModalContext } from '~/context/Modal.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { MODAL_THEME, SIMPLE_SNAP } from '~/lib/constants';
import { FS_EVENT_NAMES } from '~/lib/constants/fullstory';
import { setFSCustomEvent } from '~/lib/helpers/fullstory';
import { getScroll } from '~/lib/helpers/scroll';

import { getTireSize } from './getTireSize';
import TireSnap from './TireSnap';
import TireSnapFailure from './TireSnapFailure';
import TireSnapLoading from './TireSnapLoading';
import styles from './TireSnapModal.styles';
import TireSnapSuccess from './TireSnapSuccess';

function TireSnapModal() {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState('');
  const [failure, setFailure] = useState(false);
  const scrollY = useRef(getScroll().y);
  const { isTireSnapOpen, toggleIsTireSnapOpen } = useTireSnapModalContext();
  const { setIsSearchOpen } = useSearchModalContext();
  const { userPersonalizationData } = useUserPersonalizationContext();
  const [image, setImage] = useState<string | undefined>(undefined);
  const { isModalOpen } = useModalContext();

  const resetModal = () => {
    setLoading(false);
    setImage(undefined);
    setLoading(false);
    setSize('');
    setFailure(false);
  };

  useEffect(() => {
    if (isTireSnapOpen) {
      resetModal();
    }
  }, [isTireSnapOpen]);

  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDisableScroll = useCallback(() => {
    if (isTireSnapOpen && contentRef.current) {
      disableBodyScroll(contentRef.current);
    } else {
      clearAllBodyScrollLocks();
    }
  }, [contentRef, isTireSnapOpen]);

  const handleCloseTireSnap = useCallback(() => {
    resetModal();
    if (!isTireSnapOpen) {
      return;
    }
    // Move window back to original position (see handleAfterOpenModal function)
    window.scrollTo(0, scrollY.current);

    toggleIsTireSnapOpen();
  }, [isTireSnapOpen, toggleIsTireSnapOpen]);

  const router = useRouter();

  // Close the tiresnap modal on route change complete
  // Allows for seamless transition into Category Loading Interstitial
  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true));
    router.events.on('routeChangeComplete', handleCloseTireSnap);

    return () => {
      router.events.off('routeChangeStart', () => setLoading(false));
      router.events.off('routeChangeComplete', handleCloseTireSnap);
    };
  });

  useEffect(() => {
    requestAnimationFrame(toggleDisableScroll);
  }, [toggleDisableScroll]);

  // Remove the scroll lock when another modal is opened when tire snap is open.
  // Without this, the Help modal would not be able to scroll.
  useEffect(() => {
    if (isTireSnapOpen && isModalOpen) {
      clearAllBodyScrollLocks();
    } else if (isTireSnapOpen && contentRef.current) {
      disableBodyScroll(contentRef.current);
    }
  }, [isModalOpen, isTireSnapOpen]);

  const onUsePhoto = (image: string | undefined) => {
    setImage(image);
    if (!image) {
      return;
    }
    setLoading(true);
    // tireSize API and get result
    const zipCode = userPersonalizationData?.userLocation?.zip
      ? userPersonalizationData.userLocation.zip
      : '';
    getTireSize(image, zipCode)
      .then((res) => {
        // logged for fullstory
        console.info('Picquora API response:', res);
        if (
          res.size &&
          res.size_confidence >= SIMPLE_SNAP.CONFIDENCE_THRESHOLD
        ) {
          setLoading(false);
          setSize(res.size);
          setFSCustomEvent(FS_EVENT_NAMES.SIMPLESNAP, {
            tireResultsSuccess: true,
            apiResponse: res,
          });
        } else {
          setLoading(false);
          setFailure(true);
          setFSCustomEvent(FS_EVENT_NAMES.SIMPLESNAP, {
            tireResultsSuccess: false,
            apiResponse: res,
          });
        }
      })
      .catch((e) => {
        console.warn('e: ', e);
        setLoading(false);
        setFailure(true);
        setFSCustomEvent(FS_EVENT_NAMES.SIMPLESNAP, {
          tireResultsSuccess: false,
          apiResponse: e,
        });
      });
  };
  const onRetake = () => {
    setFSCustomEvent(FS_EVENT_NAMES.SIMPLESNAP, {
      retakePhoto: true,
    });
    setFailure(false);
    setImage('');
  };

  const onSearchAnotherWay = () => {
    setIsSearchOpen(true);
    resetModal();
    handleCloseTireSnap();
    setFSCustomEvent(FS_EVENT_NAMES.SIMPLESNAP, {
      searchAnotherWay: true,
    });
  };

  const closeTireSnapModal = () => {
    setFSCustomEvent(FS_EVENT_NAMES.SIMPLESNAP, {
      closeTireSnapModal: true,
    });
    handleCloseTireSnap();
  };
  return (
    <Modal
      contentLabel="Modal"
      hasDefaultPadding={false}
      isFullscreen
      isOpen={isTireSnapOpen}
      onClose={closeTireSnapModal}
      theme={MODAL_THEME.DARK}
      hasCloseButton={!image}
    >
      {isTireSnapOpen && (
        <div css={styles.wrapper}>
          <TireSnap onImageTaken={onUsePhoto} />
        </div>
      )}

      {loading && <TireSnapLoading />}
      {size && <TireSnapSuccess size={size} />}
      {failure && (
        <TireSnapFailure
          onRetake={onRetake}
          onSearchAnotherWay={onSearchAnotherWay}
        />
      )}
    </Modal>
  );
}

export default TireSnapModal;
