import React, { RefObject, useEffect, useState } from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Loading from '~/components/global/Loading/Loading';
import Modal from '~/components/global/Modal/Modal';
import { PRODUCT_WIDTH } from '~/components/modules/Compare/Compare.constants';
import { useCompareContext } from '~/components/modules/Compare/Compare.context';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { MODAL_THEME, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import CompareTable from '../CompareTable/CompareTable';
import {
  SCROLLBAR_DIRRECTION,
  useHasScrollBar,
} from '../CompareTable/CompareTable.hooks';
import styles, { contentCss } from './CompareModal.styles';
import CTAList from './CTAList/CTAList';
import TireWithInfoList from './TireWithInfoList/TireWithInfoList';

const contentLabel = ui('catalog.compare.modal.contentLabel');

function CompareModal() {
  const {
    isCompareModalOpen,
    productListToCompare,
    removeFromList,
    tablesData,
    addToCart,
    isLoadingModalData,
    handleCloseModal,
    setRemovingProductIndex,
    removingProductIndex,
    addTire,
  } = useCompareContext();
  const { lessThan } = useBreakpoints();
  const [, setIsRemoving] = useState(false);
  const { ref: compareTableWrapper, hasScrollbar } = useHasScrollBar({
    direction: SCROLLBAR_DIRRECTION.HORIZONTAL,
  });

  const tireSize = productListToCompare?.[0]?.size ?? '';
  const contentWidth =
    2 * 60 +
    PRODUCT_WIDTH.BIG * productListToCompare.length +
    30 * (productListToCompare.length - 1);

  const modalWidth = lessThan.L
    ? { width: '100%' }
    : {
        width: 'auto',
      };
  const loadingContentWidth =
    isLoadingModalData && lessThan.L ? '100%' : contentWidth;

  useEffect(() => {
    if (productListToCompare.length === 2) {
      setIsRemoving(false);
      return;
    }

    if (removingProductIndex === -1) {
      setIsRemoving(false);
      return;
    }

    setIsRemoving(true);
  }, [removingProductIndex, productListToCompare.length]);

  //check if the scrollbar is or not after table loaded
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [tablesData, isLoadingModalData, hasScrollbar]);

  return (
    <Modal
      id={contentLabel}
      contentLabel={contentLabel}
      hasCloseButton={false}
      isOpen={isCompareModalOpen}
      onClose={handleCloseModal}
      theme={MODAL_THEME.LIGHT}
      contentCss={contentCss}
      hasDefaultPadding={false}
      customStyle={modalWidth}
    >
      <div
        css={[
          styles.root,
          isLoadingModalData && { width: loadingContentWidth },
        ]}
      >
        <Link
          as="button"
          icon={ICONS.CLOSE}
          aria-label={ui('common.modal.close', { contentLabel })}
          onClick={handleCloseModal}
          theme={THEME.LIGHT}
          css={styles.close}
        />
        {isLoadingModalData ? (
          <div css={styles.loadingDots}>
            <Loading />
          </div>
        ) : (
          <ScrollSync vertical={false}>
            <div>
              <div css={styles.header}>
                <h3 css={styles.title}>{ui('catalog.compare.modal.title')}</h3>
                <p css={styles.description}>
                  {ui('catalog.compare.modal.description') +
                    ui('catalog.compare.modal.tireSize', {
                      tireSize,
                    })}
                </p>
              </div>
              <ScrollSyncPane>
                <div css={styles.tireWithInfoList}>
                  <TireWithInfoList
                    productList={productListToCompare}
                    onRemove={removeFromList}
                    setRemovingProductIndex={setRemovingProductIndex}
                    onAddTire={addTire}
                  />
                </div>
              </ScrollSyncPane>
              <ScrollSyncPane>
                <div css={styles.ctaListWrapper}>
                  <CTAList
                    productList={productListToCompare}
                    addToCart={addToCart}
                    removingProductIndex={removingProductIndex}
                  />
                </div>
              </ScrollSyncPane>
              {tablesData &&
                tablesData.map(({ caption, columns, data }, index) => (
                  <>
                    {caption && <h3 css={styles.caption}>{caption}</h3>}
                    <ScrollSyncPane key={index}>
                      <div
                        css={styles.tableListWrapper}
                        ref={compareTableWrapper as RefObject<HTMLDivElement>}
                      >
                        <CompareTable
                          columns={columns}
                          data={data}
                          caption={caption}
                          removingProductIndex={removingProductIndex}
                          hasScrollbar={hasScrollbar}
                        />
                      </div>
                    </ScrollSyncPane>
                  </>
                ))}
            </div>
          </ScrollSync>
        )}
      </div>
    </Modal>
  );
}

export default CompareModal;
