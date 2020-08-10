import { useCallback } from 'react';

import Link from '~/components/global/Link/Link';
import TitleRadio from '~/components/global/Radio/TitleRadio';
import { useModalContext } from '~/context/Modal.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteProductLineAvailableSizeItem } from '~/data/models/SiteProductLineAvailableSizeItem';
import { THEME } from '~/lib/constants';
import { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './SizeFinder.styles';

export interface SizeFinderProps {
  onChange: (size: string) => void;
  sizes: SiteProductLineAvailableSizeItem[];
  value?: string;
}

export default function SizeFinder({
  sizes,
  value,
  onChange,
}: SizeFinderProps) {
  const { vehicle } = useUserPersonalizationContext();
  const { openStaticModal } = useModalContext();

  const handleChange = useCallback(
    (size: string) => {
      onChange(size);
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
        {sizes?.map((item: SiteProductLineAvailableSizeItem, idx) => (
          <div css={styles.container} key={idx}>
            <TitleRadio
              name="size-finder"
              key={idx}
              label={`${item.size} ${item.loadSpeedRating}`}
              flair={
                (item.isFitForCurrentVehicle &&
                  vehicle &&
                  ui('pdp.sizeFinder.fits', { make: vehicle?.vehicleMake })) ||
                undefined
              }
              onChange={handleChange}
              value={item.siteQueryParams?.tireSize}
              activeValue={value}
            />
          </div>
        ))}
      </div>
    </>
  );
}
