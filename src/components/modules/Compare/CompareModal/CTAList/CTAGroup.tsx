import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import {
  getDefaultQuantity,
  getQueryParams,
} from '~/components/pages/ProductDetail/ProductDetail.context';
import { useRouterContext } from '~/context/Router.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { getParsedHash } from '~/lib/utils/routes';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import { ANIMATION } from '../../Compare.constants';
import { mapDataToRoadHazard } from '../../Compare.utils';
import styles from './CTAGroup.styles';

const DynamicRoadHazardModal = dynamic(() =>
  import('~/components/modules/PDP/RoadHazardModal/RoadHazardModal.container'),
);
const DynamicQuantitySelector = dynamic(() =>
  import(
    '~/components/modules/PDP/QuantitySelector/QuantitySelector.container'
  ),
);

export interface Quantity {
  front: number;
  rear?: number;
}

interface Hazard {
  durationLabel: string;
  price: string;
}

interface Props {
  addToCart: ({
    product,
    quantity,
    shouldAddCoverage,
  }: {
    product?: SiteCatalogProductItem;
    quantity?: Quantity;
    shouldAddCoverage: boolean;
  }) => void;
  index: number;
  product: SiteCatalogProductItem;
  removingProductIndex?: number;
}

function CTAGroup({ addToCart, product, removingProductIndex, index }: Props) {
  const { vehicle } = useUserPersonalizationContext();
  const href = product.link.href;
  const hashParams = getParsedHash(href);
  const queryParams = getQueryParams({
    vehicle,
    hashParams,
    queryParams: {},
  });

  const {
    link,
    siteProductLineSizeDetailRoadHazard: initialRoadHazard,
  } = product;

  const [isRoadHazardOpen, setIsRoadHazardOpen] = useState(false);
  const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<Quantity>(
    getDefaultQuantity({ queryParams }),
  );
  const [roadHazard, setRoadHazard] = useState<Hazard | null>();
  const { setIsRouteLoading, setInitTransitionState } = useRouterContext();

  const handleAddToCart = () => {
    setIsQuantitySelectorOpen(true);
  };

  const toggleRoadHazard = () => {
    if (isRoadHazardOpen) {
      setIsRouteLoading(true);
      setInitTransitionState(true);
      addToCart && addToCart({ product, quantity, shouldAddCoverage: false });
      setIsAddingToCart(true);
    }

    setIsRoadHazardOpen((isOpen) => !isOpen);
    setIsAddingToCart(false);
  };

  const toggleQuantitySelector = () => {
    setIsQuantitySelectorOpen((isOpen) => !isOpen);
    if (roadHazard) {
      setIsRoadHazardOpen(true);
      return;
    }

    setIsRouteLoading(true);
    setInitTransitionState(true);
    addToCart && addToCart({ product, quantity, shouldAddCoverage: false });
    setIsAddingToCart(true);
  };

  const handleChangeQuantity = ({ front }: { front: number }) => {
    setQuantity({ front });
  };

  const handleCloseQuantitySelector = () => {
    setIsQuantitySelectorOpen(false);
  };

  useEffect(() => {
    setRoadHazard(
      mapDataToRoadHazard({ roadHazard: initialRoadHazard, quantity }),
    );
  }, [initialRoadHazard, quantity]);

  const price = product?.priceList?.[0]?.price?.salePriceInCents ?? '';

  return (
    <div
      css={[styles.root, index === removingProductIndex && ANIMATION.removing]}
    >
      <Button
        data-testid={'add-to-cart' + product.productId}
        onClick={handleAddToCart}
        theme={THEME.ORANGE}
        style={BUTTON_STYLE.SOLID}
        css={[styles.subHead, styles.buttonAddToCart]}
      >
        {uiJSX('pdp.stickyBar.addToCart', { value: '' })}
      </Button>
      {link.href && (
        <Button
          as="a"
          href={link.href}
          theme={THEME.ORANGE}
          style={BUTTON_STYLE.OUTLINED}
          css={[styles.subHead, styles.buttonLearnMore]}
        >
          Learn More
        </Button>
      )}
      <DynamicQuantitySelector
        isOpen={isQuantitySelectorOpen}
        onChangeQuantity={handleChangeQuantity}
        toggleModal={toggleQuantitySelector}
        tirePrice={price as string}
        initialQuantity={quantity}
        onClose={handleCloseQuantitySelector}
      />
      {!!roadHazard && addToCart && (
        <DynamicRoadHazardModal
          isOpen={isRoadHazardOpen}
          onClose={toggleRoadHazard}
          durationLabel={roadHazard?.durationLabel}
          price={roadHazard?.price}
          addToCart={addToCart}
          isAddingToCart={isAddingToCart}
          product={product}
          quantity={quantity}
        />
      )}
    </div>
  );
}

export default CTAGroup;
