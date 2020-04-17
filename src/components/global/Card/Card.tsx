import styles from './Card.styles';

import { COLORS } from '~/lib/constants';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';

import { typography } from '~/styles/global/typography.styles';

export interface Props {
  cta: string;
  ctaLink: string;
  decorator: string | IconType;
  description: string;
  eyebrow?: string;
  eyebrowIcon?: IconType;
  title: string;
}

function Card({
  cta,
  ctaLink,
  decorator,
  description,
  eyebrow,
  eyebrowIcon,
  title,
}: Props) {
  const icon = Object.entries(ICONS).find(([_, v]) => v === decorator);
  const iconName = icon && ICONS[icon[0]];
  const decoratorEl = iconName ? (
    <Icon name={iconName} />
  ) : (
    <p css={typography.primaryHeadline}>{decorator}</p>
  );

  return (
    <Grid>
      <GridItem
        gridColumnS="2/5"
        gridColumnM="2/5"
        gridColumnL="2/7"
        gridColumnXL="2/7"
        isGrid
        css={styles.root}
      >
        <GridItem gridColumnL="1/3" gridColumnXL="1/3">
          <div css={styles.decorator}>{decoratorEl}</div>
        </GridItem>
        <GridItem gridColumnL="3/6" gridColumnXL="3/6">
          {eyebrow && eyebrowIcon && (
            <div css={styles.eyebrow}>
              <span>Trending</span>
              <Icon
                fill={COLORS.GLOBAL.ORANGE}
                name={eyebrowIcon}
                css={styles.eyebrowIcon}
              />
            </div>
          )}
          <p css={styles.title}>{title}</p>
          <p css={styles.description}>{description}</p>
          <Link href={ctaLink} icon={ICONS.CHEVRON_RIGHT}>
            {cta}
          </Link>
        </GridItem>
      </GridItem>
    </Grid>
  );
}

export default Card;
