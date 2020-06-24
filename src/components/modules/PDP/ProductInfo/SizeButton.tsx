import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { ProductInfoProps } from './ProductInfo';
import styles from './SizeButton.styles';

type Props = Pick<
  ProductInfoProps,
  'size' | 'loadIndex' | 'availableSizes' | 'handleChangeSize'
>;

function SizeButton({
  availableSizes,
  size,
  loadIndex,
  handleChangeSize,
}: Props) {
  if (!availableSizes) {
    return null;
  }

  if (availableSizes === 1 && size) {
    return (
      <div css={styles.root}>
        <span>
          {size} <span css={styles.loadIndex}>{loadIndex}</span>
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
      <button
        css={[styles.root, styles.rootNoSizeSelected]}
        onClick={handleChangeSize}
        aria-label={`${label}, ${ui('pdp.productInfo.selectSizeLabel')}`}
      >
        {label}
        <Icon name={ICONS.CHEVRON_DOWN} css={styles.icon} />
      </button>
    );
  }

  return (
    <button
      css={styles.root}
      onClick={handleChangeSize}
      aria-label={`${size} ${loadIndex}, ${ui(
        'pdp.productInfo.changeSizeLabel',
      )}`}
    >
      <span>
        {size} <span css={styles.loadIndex}>{loadIndex}</span>
      </span>
      <Icon name={ICONS.CHEVRON_DOWN} css={styles.icon} />
    </button>
  );
}

export default SizeButton;
