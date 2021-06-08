import SVGInline from 'react-svg-inline';

import Button from '~/components/global/Button/Button';
import useSVGString from '~/hooks/useSVGString';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './ProductToCompare.styles';

const TIRE_IMAGE_SRC =
  'https://images.simpletire.com/image/upload/v1617286846/steer/common/s-tire-skeleton.svg';
interface Props {
  hasBackground?: boolean;
  isBig?: boolean;
  isDisabled?: boolean;
  onAddTire: () => void;
}

function AddTire({
  onAddTire,
  isDisabled = false,
  isBig = false,
  hasBackground = false,
}: Props) {
  const SVGString = useSVGString(TIRE_IMAGE_SRC);

  return (
    <div css={styles.root}>
      <div
        css={[
          styles.image,
          styles.tireSkeleton,
          isBig && styles.bigImage,
          styles.tireSkeletonBg,
        ]}
      >
        {SVGString && <SVGInline svg={SVGString} />}
      </div>
      <div css={styles.info}>
        <Button
          isDisabled={isDisabled}
          onClick={onAddTire}
          style={BUTTON_STYLE.OUTLINED}
          css={styles.addButton}
          theme={hasBackground ? THEME.ORANGE : THEME.LIGHT}
        >
          {ui('catalog.compare.addTire')}
        </Button>
      </div>
    </div>
  );
}

export default AddTire;
