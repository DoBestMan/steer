import { useCallback } from 'react';

import Link from '~/components/global/Link/Link';
import TitleRadio from '~/components/global/Radio/TitleRadio';
import { useModalContext } from '~/context/Modal.context';
/**
 * Note: temporaily removing this for ST MVP launch.
 * Refer to WCS-1590 for details
 */
// import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteProductLineAvailableSizeItem } from '~/data/models/SiteProductLineAvailableSizeItem';
import { THEME } from '~/lib/constants';
import { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './SizeFinder.styles';

export interface SizeFinderProps {
  currentIndex: number;
  onChange: (index: number) => void;
  sizes: SiteProductLineAvailableSizeItem[];
}

export default function SizeFinder({
  currentIndex,
  sizes,
  onChange,
}: SizeFinderProps) {
  /**
   * Note: temporaily removing this for ST MVP launch.
   * Refer to WCS-1590 for details
   */
  // const { vehicle } = useUserPersonalizationContext();
  const { openStaticModal } = useModalContext();

  const handleChange = useCallback(
    (value: string) => {
      onChange(parseInt(value, 10));
    },
    [onChange],
  );

  function openTireSizeModal() {
    openStaticModal(STATIC_MODAL_IDS.HOW_TO_FIND_YOUR_SIZE);
  }

  return (
    <>
      <div css={styles.root}>
        <div css={[styles.header, styles.labelContainer]}>
          <h2 css={styles.title}>{ui('pdp.productInfo.selectSizeLabel')}</h2>
          <Link
            data-testid="find-my-tire-size"
            theme={THEME.LIGHT}
            as="button"
            onClick={openTireSizeModal}
            css={styles.findMyTireSizeLabel}
          >
            {ui('pdp.productInfo.findMyTireSizeLabel')}
          </Link>
        </div>
        {sizes?.map((item, idx) => {
          const isSelected = currentIndex === idx;

          return (
            <div css={styles.container} key={idx}>
              <TitleRadio
                name="size-finder"
                key={idx}
                label={`${item.size} ${item.loadSpeedRating}`}
                flair={
                  /**
                   * Note: temporaily removing this for ST MVP launch.
                   * Refer to WCS-1590 for details
                   */
                  /* (item.isFitForCurrentVehicle &&
                    vehicle &&
                    ui('pdp.sizeFinder.fits', {
                      make: vehicle?.vehicleMake,
                    })) || */
                  undefined
                }
                onChange={handleChange}
                value={idx.toString()}
                active={isSelected}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
