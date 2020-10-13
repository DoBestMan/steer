import CircularIllustrationCarousel from '~/components/global/CircularIllustration/CircularIllustrationCarousel/CircularIllustrationCarousel';
import { customImageMaxWidth } from '~/components/global/CircularIllustration/CircularIllustrationItem/CircularIllustrationItem.styles';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/Markdown';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleCircularIllustrationCarousel } from '~/data/models/SiteModules';

function ModuleCircularIllustrationCarousel(
  props: SiteModuleCircularIllustrationCarousel,
) {
  return (
    <div
      data-component="module-circularillustration-carousel"
      css={styles.spacingTopS60XL80}
    >
      {props.headerText && (
        <Grid css={styles.carouselHeader}>
          <GridItem
            gridColumnS={'2/7'}
            gridColumnM={'2/9'}
            gridColumnL={'2/15'}
            gridColumnXL={'4/15'}
          >
            <Markdown isEditorial>{props.headerText}</Markdown>
            <CircularIllustrationCarousel
              {...props}
              removeBackground
              itemCustomStyle={styles.carouselItem}
              imageMaxWidthCustomStyles={
                props.imageTypeForMaxWidth
                  ? customImageMaxWidth[props.imageTypeForMaxWidth + 'MaxWidth']
                  : undefined
              }
            />
          </GridItem>
        </Grid>
      )}
    </div>
  );
}

export default ModuleCircularIllustrationCarousel;
