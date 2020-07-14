import { useCallback, useState } from 'react';

import Link from '~/components/global/Link/Link';
import TitleRadio from '~/components/global/Radio/TitleRadio';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { SiteProductLineAvailableSizeItem } from '~/data/models/SiteProductLineAvailableSizeItem';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import AdditionalInfoModal from '../../Search/AdditionalInfoModal/AdditionalInfoModal';
import { TIRE_SEARCH_MODAL_DATA } from '../../Search/AdditionalInfoModal/AdditionalInfoModal.constants';
import styles from './SizeFinder.styles';

export interface SizeFinderProps {
  onChange: (size: string) => void;
  sizes: SiteProductLineAvailableSizeItem[];
  value?: string;
  vehicle?: string;
}

export default function SizeFinder({
  sizes,
  value,
  vehicle,
  onChange,
}: SizeFinderProps) {
  const [isTireSizeModalOpen, setIsTireSizeModalOpen] = useState(false);
  const {
    customerServiceNumber,
    customerServiceEnabled,
  } = useSiteGlobalsContext();

  const toggleTireSizeModal = useCallback(() => {
    setIsTireSizeModalOpen(!isTireSizeModalOpen);
  }, [isTireSizeModalOpen, setIsTireSizeModalOpen]);

  const handleChange = useCallback(
    (size: string) => {
      return onChange(size);
    },
    [onChange],
  );

  return (
    <>
      <div css={styles.root}>
        <div css={[styles.header, styles.labelContainer]}>
          <h2 css={styles.title}>{ui('pdp.productInfo.selectSizeLabel')}</h2>
          <Link
            theme={THEME.LIGHT}
            as="button"
            onClick={toggleTireSizeModal}
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
                  ui('pdp.sizeFinder.fits', { vehicle })) ||
                undefined
              }
              onChange={handleChange}
              value={item.siteQueryParams?.tireSize}
              activeValue={value}
            />
          </div>
        ))}
      </div>
      {isTireSizeModalOpen && (
        <AdditionalInfoModal
          customerServiceNumber={customerServiceNumber}
          isCustomerServiceEnabled={customerServiceEnabled}
          isOpen={isTireSizeModalOpen}
          onClose={toggleTireSizeModal}
          {...TIRE_SEARCH_MODAL_DATA}
        />
      )}
    </>
  );
}
