import { useState } from 'react';

import Dropdown from '~/components/global/Dropdown/Dropdown';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import SizeFinder from '~/components/modules/PDP/SizeFinder/SizeFinder';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { ui } from '~/lib/utils/ui-dictionary';

import { ProductInfoProps } from './ProductInfo';
import styles from './SizeButton.styles';

type Props = Pick<
  ProductInfoProps,
  'size' | 'loadSpeedRating' | 'availableSizes' | 'sizeFinder'
>;

type RenderSizeFinderProps = Pick<Props, 'sizeFinder'> & {
  isOpen: boolean;
  onClose: () => void;
};

function RenderSizeFinder({
  sizeFinder,
  isOpen,
  onClose,
}: RenderSizeFinderProps) {
  const { changeSize } = useProductDetailContext();

  function handleChangeSize(value: string) {
    changeSize(value);
    onClose();
  }

  if (!sizeFinder) {
    return null;
  }

  return (
    <Dropdown
      shouldActivateListeners={isOpen}
      contentLabel={ui('pdp.productInfo.selectSizeLabel')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <SizeFinder onChange={handleChangeSize} {...sizeFinder} />
    </Dropdown>
  );
}

function SizeButton({
  availableSizes,
  size,
  loadSpeedRating,
  sizeFinder,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClickButton() {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleClose() {
    setIsOpen(false);
  }

  if (!availableSizes) {
    return null;
  }

  if (availableSizes === 1 && size) {
    return (
      <div css={styles.root}>
        <span>
          {size} <span css={styles.loadSpeedRating}>{loadSpeedRating}</span>
        </span>
      </div>
    );
  }

  if (!size) {
    const label =
      availableSizes > 1
        ? ui('pdp.productInfo.selectSizeButton', { availableSizes })
        : ui('pdp.productInfo.selectSingleSizeButton');
    return (
      <>
        <button
          aria-expanded={isOpen}
          disabled={isOpen}
          className="dropdown-button"
          type="button"
          css={styles.root}
          onClick={handleClickButton}
          aria-label={`${label}, ${ui('pdp.productInfo.selectSizeLabel')}`}
        >
          <span css={styles.selectSize}>{label}</span>
          <Icon name={ICONS.CHEVRON_DOWN} css={styles.icon} />
        </button>
        <RenderSizeFinder
          isOpen={isOpen}
          onClose={handleClose}
          sizeFinder={sizeFinder}
        />
      </>
    );
  }

  return (
    <div>
      <button
        aria-expanded={isOpen}
        disabled={isOpen}
        className="dropdown-button"
        type="button"
        css={styles.root}
        onClick={handleClickButton}
        aria-label={`${size}-${loadSpeedRating}, ${ui(
          'pdp.productInfo.changeSizeLabel',
        )}`}
      >
        <span css={styles.size}>
          {size} <span css={styles.loadSpeedRating}>{loadSpeedRating}</span>
        </span>
        <Icon name={ICONS.CHEVRON_DOWN} css={styles.icon} />
      </button>
      <RenderSizeFinder
        isOpen={isOpen}
        onClose={handleClose}
        sizeFinder={sizeFinder}
      />
    </div>
  );
}

export default SizeButton;
