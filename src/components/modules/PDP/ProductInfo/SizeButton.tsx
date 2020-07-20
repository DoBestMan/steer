import Dropdown from '~/components/global/Dropdown/Dropdown';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import SizeFinder from '~/components/modules/PDP/SizeFinder/SizeFinder';
import { useModalContext } from '~/context/Modal.context';
import { ui } from '~/lib/utils/ui-dictionary';

import { ProductInfoProps } from './ProductInfo';
import styles from './SizeButton.styles';

type Props = Pick<
  ProductInfoProps,
  | 'size'
  | 'loadSpeedRating'
  | 'availableSizes'
  | 'onClickChangeSize'
  | 'onChangeSize'
  | 'isSizeSelectorOpen'
  | 'sizeFinder'
>;

type RenderSizeFinderProps = Pick<
  Props,
  'isSizeSelectorOpen' | 'onClickChangeSize' | 'onChangeSize' | 'sizeFinder'
>;

function RenderSizeFinder({
  isSizeSelectorOpen,
  onClickChangeSize,
  onChangeSize,
  sizeFinder,
}: RenderSizeFinderProps) {
  const { isModalOpen } = useModalContext();

  if (!sizeFinder) {
    return null;
  }

  return (
    <Dropdown
      shouldActivateListeners={!isModalOpen}
      contentLabel={ui('pdp.productInfo.selectSizeLabel')}
      isOpen={!!isSizeSelectorOpen}
      onClose={onClickChangeSize}
    >
      <SizeFinder onChange={onChangeSize} {...sizeFinder} />
    </Dropdown>
  );
}

function SizeButton({
  availableSizes,
  size,
  loadSpeedRating,
  onChangeSize,
  onClickChangeSize,
  isSizeSelectorOpen,
  sizeFinder,
}: Props) {
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
          aria-expanded={isSizeSelectorOpen}
          className="dropdown-button"
          type="button"
          css={[styles.root, styles.rootNoSizeSelected]}
          onClick={onClickChangeSize}
          aria-label={`${label}, ${ui('pdp.productInfo.selectSizeLabel')}`}
        >
          {label}
          <Icon name={ICONS.CHEVRON_DOWN} css={styles.icon} />
        </button>
        <RenderSizeFinder
          isSizeSelectorOpen={isSizeSelectorOpen}
          onClickChangeSize={onClickChangeSize}
          onChangeSize={onChangeSize}
          sizeFinder={sizeFinder}
        />
      </>
    );
  }

  return (
    <>
      <button
        aria-expanded={isSizeSelectorOpen}
        className="dropdown-button"
        type="button"
        css={styles.root}
        onClick={onClickChangeSize}
        aria-label={`${size} ${loadSpeedRating}, ${ui(
          'pdp.productInfo.changeSizeLabel',
        )}`}
      >
        <span>
          {size} <span css={styles.loadSpeedRating}>{loadSpeedRating}</span>
        </span>
        <Icon name={ICONS.CHEVRON_DOWN} css={styles.icon} />
      </button>
      <RenderSizeFinder
        isSizeSelectorOpen={isSizeSelectorOpen}
        onClickChangeSize={onClickChangeSize}
        onChangeSize={onChangeSize}
        sizeFinder={sizeFinder}
      />
    </>
  );
}

export default SizeButton;
