import { RefObject, useEffect, useState } from 'react';

import { ConfirmFitInsightData } from '~/data/models/ConfirmFitInsightData';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import ConfirmFitInsight from '../ConfirmFitInsight/ConfirmFitInsight';
import styles from './ConfirmFitStickyBar.styles';

export interface PDPStickyBarProps {
  avoidSection?: RefObject<HTMLDivElement>;
  avoidTopSection?: RefObject<HTMLDivElement>;
  data: ConfirmFitInsightData;
}

function ConfirmFitStickyBar({
  avoidSection,
  avoidTopSection,
  data,
}: PDPStickyBarProps) {
  const [isBottomActive, setBottomActive] = useState(!avoidSection);
  const [isTopActive, setTopActive] = useState(!avoidTopSection);
  const [isActive, setIsActive] = useState(!avoidTopSection && !avoidSection);
  const { isLoading, lessThan, isMobile } = useBreakpoints();

  useEffect(() => {
    if (!avoidSection?.current) {
      return;
    }

    const avoidSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setBottomActive(entry.isIntersecting);
      });
    });

    avoidSectionObserver.observe(avoidSection.current);

    return () => {
      avoidSectionObserver.disconnect();
    };
  }, [avoidSection]);

  useEffect(() => {
    if (!avoidTopSection?.current) {
      return;
    }

    const avoidSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setTopActive(entry.isIntersecting);
      });
    });

    avoidSectionObserver.observe(avoidTopSection.current);

    return () => {
      avoidSectionObserver.disconnect();
    };
  }, [avoidTopSection]);

  useEffect(() => {
    if (isMobile && (isTopActive || isBottomActive)) {
      setIsActive(false);
    } else if (isBottomActive) {
      setIsActive(false);
    } else if (isTopActive && !isBottomActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [isTopActive, isBottomActive, isMobile]);

  const isHidden = !isActive && (!lessThan.L || isLoading);

  return (
    <div
      aria-hidden={isMobile ? isActive : !isHidden}
      css={isActive ? styles.root : styles.rootInactive}
    >
      {isActive && (
        <div css={styles.stickyBar}>
          <div css={styles.item}>
            <ConfirmFitInsight {...data} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmFitStickyBar;
