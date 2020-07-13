import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { SiteImageNullableTypeEnum } from '~/data/models/SiteImageNullable';
import STATIC_MODALS, { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';

import { useModalContextSetup } from './Modal.context';

describe('useModalContextSetup', () => {
  test('initial state', () => {
    const { result } = renderHook(() => useModalContextSetup());

    expect(result.current).toEqual(
      expect.objectContaining({
        currentContentModalData: null,
        isModalOpen: false,
      }),
    );
  });

  test('dynamic modal flow', () => {
    /* eslint-disable sort-keys */
    const testModal = {
      title: 'Risk-Free Guarantee',
      subtitle: 'Only from SimpleTire',
      content: 'Our goal is your complete satisfaction!',
      image: {
        src: 'https://dummyimage.com/1600x900/000/f00.jpg',
        width: 1600,
        height: 900,
        altText: 'Risk-Free Guarantee',
        type: SiteImageNullableTypeEnum.SiteImage,
      },
      link: {
        label: 'Learn more',
        link: {
          href: '/about-us',
          isExternal: false,
        },
      },
      showSupportSection: true,
      type: 'SiteDynamicModal',
    };
    /* eslint-enable sort-keys */

    const { result } = renderHook(() => useModalContextSetup());

    act(() => {
      result.current.openDynamicModal(testModal);
    });

    // it opens modal with dynamic content
    expect(result.current).toEqual(
      expect.objectContaining({
        currentContentModalData: testModal,
        isModalOpen: true,
      }),
    );

    act(() => {
      result.current.closeModal();
    });

    // it closes modal but keeps content stored
    expect(result.current).toEqual(
      expect.objectContaining({
        currentContentModalData: testModal,
        isModalOpen: false,
      }),
    );

    act(() => {
      result.current.resetModal();
    });

    // it resets modal contnet
    expect(result.current).toEqual(
      expect.objectContaining({
        currentContentModalData: null,
        isModalOpen: false,
      }),
    );
  });

  it('opens static modal', () => {
    const { result } = renderHook(() => useModalContextSetup());

    act(() => {
      result.current.openStaticModal(
        STATIC_MODAL_IDS.GLOBAL_BEST_PRICE_GUARANTEE,
      );
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        currentContentModalData:
          STATIC_MODALS[STATIC_MODAL_IDS.GLOBAL_BEST_PRICE_GUARANTEE],
        isModalOpen: true,
      }),
    );
  });
});
