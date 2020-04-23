import { ReactChild } from 'react';

import styles from './DriverInsights.styles';

import GridItem from '~/components/global/Grid/GridItem';

import { typography } from '~/styles/typography.styles';
import Link from '~/components/global/Link/Link';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';
import { colors } from '~/styles/colors.styles';

interface Props {
  children: ReactChild[];
  cta?: string;
  ctaLink?: string;
  description: string;
  title: string;
}

function DriverInsights({ children, cta, ctaLink, description, title }: Props) {
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  return (
    <>
      <GridItem gridColumnM="2/5" gridColumnL="3/7">
        <h2 css={[colors.GLOBAL.WHITE, styles.title]}>{title}</h2>

        {!isMobile && (
          <p
            css={[typography.bodyCopy, colors.DARK.GRAY_40, styles.description]}
          >
            {description}
          </p>
        )}
        {cta && ctaLink && (
          <Link href={ctaLink} css={styles.cta}>
            {cta}
          </Link>
        )}
      </GridItem>
      <GridItem
        gridColumnM="5/8"
        gridColumnL="8/14"
        gridColumnXL="8/12"
        css={styles.cards}
      >
        {children}
      </GridItem>
    </>
  );
}

export default DriverInsights;
