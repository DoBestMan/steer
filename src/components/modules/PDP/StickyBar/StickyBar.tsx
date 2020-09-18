import dynamic from 'next/dynamic';
import { RefObject, useEffect, useState } from 'react';

import StickyBar from '~/components/modules/StickyBar/StickyBar';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteImage } from '~/data/models/SiteImage';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { STICKY_BAR_HEIGHT } from '../../StickyBar/StickyBar.styles';
import styles from './StickyBar.styles';

const DynamicActionBar = dynamic(() =>
  import('~/components/modules/PDP/ActionBar/ActionBar'),
);

export interface PDPStickyBarProps {
  avoidSection?: RefObject<HTMLDivElement>;
  brandLogo: SiteImage | null;
  darkSection?: RefObject<HTMLDivElement>;
  productLine: string;
  rearPrice?: string | null;
  rearSize?: string | null;
  roadHazard: {
    durationLabel: string;
    price: string;
  } | null;
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
    const key =
      sizesAvailable === 1
        ? 'pdp.stickyBar.label.productLine'
        : 'pdp.stickyBar.label.productLinePlural';
    return ui(key, {
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
  productLine,
  rearPrice,
  rearSize,
  roadHazard,
  sizesAvailable,
  startingPrice,
  tirePrice,
  tireSize,
}: PDPStickyBarProps) {
  const [isActive, setIsActive] = useState(!avoidSection);
  const [theme, setTheme] = useState(THEME.ORANGE);
  const { vehicle } = useUserPersonalizationContext();
  const { isLoading, lessThan } = useBreakpoints();
  const isTireLine = !tireSize && !rearSize;

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
        rootMargin: `100% 0% -${STICKY_BAR_HEIGHT.L}px 0%`,
      },
    );

    darkSectionObserver.observe(darkSection.current);

    return () => {
      darkSectionObserver.disconnect();
    };
  }, [darkSection]);

  if ((!startingPrice && !tirePrice) || (startingPrice === '0' && !tirePrice)) {
    return null;
  }

  // There's no action to tireline's stickybar when vehicle is known
  if (isTireLine && vehicle) {
    return null;
  }

  const isHidden = !isActive && (!lessThan.L || isLoading);

  return (
    <div aria-hidden={isHidden} css={styles.root}>
      <StickyBar
        customContainerStyles={styles.stickyBar}
        theme={theme}
        logo={brandLogo}
        secondaryLabel={secondaryLabel}
      >
        <DynamicActionBar
          rearPrice={rearPrice}
          rearSize={rearSize}
          roadHazard={roadHazard}
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
