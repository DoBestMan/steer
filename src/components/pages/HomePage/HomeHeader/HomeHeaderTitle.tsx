import { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/Markdown';
import PromoTag from '~/components/global/PromoTag/PromoTag';
import { SiteHero } from '~/data/models/SiteHero';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { typography } from '~/styles/typography.styles';

import { animations, styles, TITLE_DURATION } from './HomeHeader.styles';

interface Props extends Pick<SiteHero, 'body' | 'eyebrow' | 'title'> {
  hasMotion: boolean;
}

function HomeHeaderTitle({ body, eyebrow, hasMotion, title }: Props) {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  return (
    <Transition appear in={inProp} timeout={hasMotion ? TITLE_DURATION : 0}>
      {(titleTransitionState: TransitionStatus) => {
        const animationStyles =
          hasMotion && animations[`title_${titleTransitionState}`];
        const eyebrowStyles = [styles.eyebrow, animationStyles];
        const titleStyles = [
          typography.jumboHeadline,
          styles.title,
          animationStyles,
        ];
        const descriptionStyles = [
          typography.bodyCopy,
          styles.description,
          animationStyles,
        ];
        return (
          <Grid css={styles.copyContainer}>
            <GridItem gridColumnS="2/6" gridColumnM="2/8" gridColumnXL="2/8">
              {eyebrow && (
                <div css={eyebrowStyles}>
                  <PromoTag
                    label={eyebrow}
                    style={SitePromotionStyleEnum.SitePromotionItemOrangePill}
                    isUppercase
                  />
                </div>
              )}
              <h1 css={titleStyles}>
                <Markdown renderers={{ paragraph: 'span' }}>{title}</Markdown>
              </h1>

              <div css={descriptionStyles}>
                <Markdown>{body}</Markdown>
              </div>
            </GridItem>
          </Grid>
        );
      }}
    </Transition>
  );
}

export default HomeHeaderTitle;
