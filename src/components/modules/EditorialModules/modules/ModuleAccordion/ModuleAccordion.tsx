import Accordion from '~/components/global/Accordion/Accordion';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleAccordion } from '~/data/models/SiteModules';
import { THEME } from '~/lib/constants';
import { randomString } from '~/lib/utils/string';

function ModuleAccordion(props: SiteModuleAccordion) {
  return (
    <div data-component="module-accordion">
      <Grid css={styles.spacingTopS40XL60}>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <div
            css={props.hasBottomBorder && styles.bottomBorder}
            data-component="module-accordion-container"
          >
            <Accordion
              {...props}
              id={props.id ? props.id : randomString()}
              theme={THEME.LIGHT}
            />
          </div>
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleAccordion;
