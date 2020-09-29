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
          <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
            <Markdown isEditorial>{props.headerText}</Markdown>
          </GridItem>
        </Grid>
      )}
      <div>
        <CircularIllustrationCarousel
          {...props}
          imageMaxWidthCustomStyles={
            props.imageTypeForMaxWidth
              ? customImageMaxWidth[props.imageTypeForMaxWidth + 'MaxWidth']
              : undefined
          }
        />
      </div>
    </div>
  );
}

export default ModuleCircularIllustrationCarousel;
