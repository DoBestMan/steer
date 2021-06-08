import { useEffect } from 'react';
import { SwiperInstance } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/Carousel';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteCatalogProductItem } from '~/data/models//SiteCatalogProductItem';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { CSSStylesProp } from '~/lib/constants';

import { NUMBER_OF_TIRES } from '../Compare.constants';
import AddTire from '../ProductToCompare/AddTire';
import ProductToCompare from '../ProductToCompare/ProductToCompare';
import {
  CAROUSEL_CLASS_NAMES,
  CAROUSEL_PARAM_BREAKPOINT,
} from './ListToCompare.data';
import styles from './ListToCompare.styles';

export interface ListToCompareProps {
  activeCarouselIndex?: number;
  customItemStyles?: CSSStylesProp;
  hasAddTire?: boolean;
  hasBackground?: boolean;
  hasCTAs?: boolean;
  href?: string;
  isBig?: boolean;
  onAddTire: () => void;
  onChangeActiveIndex?: (value: number) => void;
  onClick?: (params: Record<string, string>) => void;
  onRemove?: (productId: string) => void;
  productList: SiteCatalogProductItem[];
  setRemovingProductIndex: (index: number) => void;
  setSwiper?: (swiper: SwiperInstance) => void;
  siteCatalogSummary?: SiteCatalogSummary;
}

function ListToCompare({
  productList,
  customItemStyles,
  onRemove,
  onAddTire,
  isBig,
  hasBackground,
  setSwiper,
  hasCTAs,
  setRemovingProductIndex,
  hasAddTire = false,
  activeCarouselIndex = 0,
  onChangeActiveIndex,
}: ListToCompareProps) {
  const carouselParams = {
    breakpoints: {
      [CAROUSEL_PARAM_BREAKPOINT.XL]: {
        grabCursor: false,
      },
    },
    mousewheel: { forceToAxis: true },
    navigation: {
      nextEl: `.${CAROUSEL_CLASS_NAMES.NEXT_BUTTON}`,
      prevEl: `.${CAROUSEL_CLASS_NAMES.PREV_BUTTON}`,
    },
    renderNextButton:
      !hasBackground &&
      function NextButton() {
        return (
          <div
            className={`${CAROUSEL_CLASS_NAMES.NEXT_BUTTON}`}
            onClick={() => {
              onChangeActiveIndex &&
                onChangeActiveIndex(activeCarouselIndex + 2);
            }}
          >
            <Icon name={ICONS.CHEVRON_RIGHT} />
          </div>
        );
      },
    renderPrevButton:
      !hasBackground &&
      function PrevButton() {
        return (
          <div
            className={`${CAROUSEL_CLASS_NAMES.PREV_BUTTON}`}
            onClick={() => {
              onChangeActiveIndex &&
                onChangeActiveIndex(activeCarouselIndex - 2);
            }}
          >
            <Icon name={ICONS.CHEVRON_LEFT} />
          </div>
        );
      },
    updateOnWindowResize: true,
  };

  /**
   * The react-id-swiper is not updating itself so need to dispatch resize after mounted or changes of productList.
   */
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [productList]);

  const onClose = (productId: string) => {
    onRemove && onRemove(productId);
  };

  function elementsToRender(productList: SiteCatalogProductItem[]) {
    const elements = productList.map((product, i) => {
      return (
        <div
          css={[styles.item, customItemStyles, isBig && styles.bigItem]}
          key={`compare-list-${product.productId}-${product.size}-${i}`}
        >
          <ProductToCompare
            index={i}
            product={product}
            onClose={onClose}
            hasCTAs={hasCTAs}
            hasBackground={hasBackground}
            isBig={isBig}
            setRemovingProductIndex={setRemovingProductIndex}
          />
        </div>
      );
    });

    if (productList.length < NUMBER_OF_TIRES.MAX && hasAddTire) {
      elements.push(
        <div
          key={`compare-list-${NUMBER_OF_TIRES.MAX - 1}`}
          css={[styles.item, customItemStyles, isBig && styles.bigItem]}
        >
          <AddTire
            onAddTire={onAddTire}
            isBig={isBig}
            hasBackground={hasBackground}
          />
        </div>,
      );
    }

    return elements;
  }

  return (
    <div css={[styles.wrapper, hasBackground && styles.background]}>
      <Carousel
        wrapperClass="list-to-compare-carousel"
        params={carouselParams}
        freeScroll
        getSwiper={setSwiper}
      >
        {elementsToRender(productList)}
      </Carousel>
    </div>
  );
}

export default ListToCompare;
