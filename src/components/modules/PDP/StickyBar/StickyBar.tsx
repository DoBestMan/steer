import { RefObject, useEffect, useState } from 'react';

import ActionBar from '~/components/modules/PDP/ActionBar/ActionBar';
import StickyBar from '~/components/modules/StickyBar/StickyBar';
import { SiteImage } from '~/data/models/SiteImage';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { STICKY_BAR_HEIGHT } from '../../StickyBar/StickyBar.styles';
import styles from './StickyBar.styles';

export interface PDPStickyBarProps {
  avoidSection?: RefObject<HTMLDivElement>;
  brandLogo: SiteImage | null;
  darkSection?: RefObject<HTMLDivElement>;
  onClickAddToCart: () => void;
  onClickChangeQuantity: (position: 'front' | 'rear') => () => void;
  onClickFindYourSize: () => void;
  productLine: string;
  rearPrice?: string | null;
  rearSize?: string | null;
  sizesAvailable: number;
  startingPrice?: string | null;
  tirePrice?: string | null;
  tireSize?: string | null;
}

function parseLabel({
  productLine,
  tireSize,
  rearSize,
  sizesAvailable,
}: Pick<
  PDPStickyBarProps,
  'productLine' | 'tireSize' | 'rearSize' | 'sizesAvailable'
>) {
  if (!tireSize) {
    return ui('pdp.stickyBar.label.productLine', {
      productLine,
      sizesAvailable,
    });
  }

  if (!rearSize) {
    return ui('pdp.stickyBar.label.tireSize', { productLine, tireSize });
  }

  return ui('pdp.stickyBar.label.frontRearSize', {
    productLine,
    tireSize,
    rearSize,
  });
}

function PDPStickyBar({
  avoidSection,
  brandLogo,
  darkSection,
  onClickAddToCart,
  onClickChangeQuantity,
  onClickFindYourSize,
  productLine,
  rearPrice,
  rearSize,
  sizesAvailable,
  startingPrice,
  tirePrice,
  tireSize,
}: PDPStickyBarProps) {
  const [isActive, setIsActive] = useState(!avoidSection);
  const [theme, setTheme] = useState(THEME.ORANGE);
  const { lessThan } = useBreakpoints();

  const secondaryLabel = parseLabel({
    productLine,
    tireSize,
    rearSize,
    sizesAvailable,
  });

  useEffect(() => {
    if (!avoidSection?.current) {
      return;
    }

    const avoidSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsActive(!entry.isIntersecting);
      });
    });

    avoidSectionObserver.observe(avoidSection.current);

    return () => {
      avoidSectionObserver.disconnect();
    };
  }, [avoidSection]);

  useEffect(() => {
    if (!darkSection?.current) {
      return;
    }

    const darkSectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setTheme(entry.isIntersecting ? THEME.DARK : THEME.ORANGE);
        });
      },
      {
        threshold: [0, 1],
        rootMargin: `-100% 0% ${STICKY_BAR_HEIGHT.L}px 0%`,
      },
    );

    darkSectionObserver.observe(darkSection.current);

    return () => {
      darkSectionObserver.disconnect();
    };
  }, [darkSection]);

  return (
    <div aria-hidden={!isActive && !lessThan.L} css={styles.root}>
      <StickyBar theme={theme} logo={brandLogo} secondaryLabel={secondaryLabel}>
        <ActionBar
          onClickAddToCart={onClickAddToCart}
          onClickChangeQuantity={onClickChangeQuantity('front')}
          onClickFindYourSize={onClickFindYourSize}
          rearPrice={rearPrice}
          rearSize={rearSize}
          startingPrice={startingPrice}
          theme={theme}
          tirePrice={tirePrice}
          tireSize={tireSize}
        />
      </StickyBar>
    </div>
  );
}

export default PDPStickyBar;