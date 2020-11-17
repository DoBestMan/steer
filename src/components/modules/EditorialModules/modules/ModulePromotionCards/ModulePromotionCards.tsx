import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import PromotionCardCarousel from '~/components/global/PromotionCardCarousel/PromotionCardCarousel';
import PromotionHeader from '~/components/global/PromotionHeader/PromotionHeader';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModulePromotionCards } from '~/data/models/SiteModules';

function ModulePromotionCards({ ...props }: SiteModulePromotionCards) {
  const { header, carousel } = props;
  return (
    <div data-component="module-promotion-card-carousel">
      <Grid css={styles.spacingTop40}>
        <GridItem fullbleed>
          {header && (
            <div data-component="module-promotion-header">
              <PromotionHeader
                iconName={header.icon.svgId}
                subTitle={header.subtitle}
                title={header.title}
                promoTagLabel={header.pill}
              />
            </div>
          )}
          {carousel && <PromotionCardCarousel cards={carousel.dealsCards} />}
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModulePromotionCards;
