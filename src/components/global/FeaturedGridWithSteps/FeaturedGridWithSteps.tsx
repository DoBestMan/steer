import Carousel from '~/components/global/Carousel/Carousel';
import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Markdown from '~/components/global/Markdown/Markdown';
import { isSiteIcon, SiteIcon } from '~/data/models/SiteIcon';

import styles from './FeaturedGridWithSteps.styles';

export interface FeaturedGridItemProps {
  description?: string;
  icon?: IconType | SiteIcon;
  stepCount?: number;
  title: string;
}

export interface FeaturedGridWithStepsProps {
  dataItems: Array<FeaturedGridItemProps>;
  header?: string;
}

function FeaturedGridWithSteps({
  dataItems,
  header,
}: FeaturedGridWithStepsProps) {
  function FeaturedGraphicGridItem({
    stepCount = 0,
    description,
    icon,
    title,
  }: FeaturedGridItemProps) {
    if (typeof icon !== 'string' && icon && isSiteIcon(icon)) {
      icon = icon.svgId;
    }
    return (
      <div css={styles.itemWrapper}>
        <div
          css={
            stepCount === 0
              ? styles.stepCountSectionFirst
              : styles.stepCountSection
          }
        >
          <div css={styles.stepCountCircle}>{stepCount + 1}</div>
          <div
            css={
              stepCount === 0
                ? styles.stepCountMiddleLineFirst
                : styles.stepCountMiddleLine
            }
          ></div>
        </div>
        <div css={styles.infoSection}>
          {icon && <Icon name={icon} css={styles.icon} />}
          <h3 css={styles.title}>
            <Markdown renderers={{ paragraph: 'span' }}>{title}</Markdown>
          </h3>
          {description && <p css={styles.featureDescription}>{description}</p>}
        </div>
      </div>
    );
  }

  return (
    <div css={[styles.root]} data-component="featured-grid-with-steps">
      {header && <header css={styles.header}>{header}</header>}
      <div css={styles.carousel}>
        {dataItems && (
          <Carousel
            rebuildOnUpdate
            shortSwipes
            WrapperEl={'ul' as any} // eslint-disable-line @typescript-eslint/no-explicit-any
            wrapperClass="featured-grid-carousel"
          >
            {dataItems?.map((dataItem: FeaturedGridItemProps, index) => (
              <li css={styles.item} key={`featured_grid_carousel_${index}`}>
                <FeaturedGraphicGridItem {...dataItem} stepCount={index} />
              </li>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default FeaturedGridWithSteps;
