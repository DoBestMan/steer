import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { SiteModuleLinkWithLabel } from '~/data/models/SiteModules';

function ModuleSiteLinkWithLabel(props: SiteModuleLinkWithLabel) {
  return (
    <div
      data-component="module-siteLinkWithLabel"
      css={{
        marginTop: props.marginBottom ? props.marginTop : 0,
        marginBottom: props.marginBottom ? props.marginBottom : 0,
      }}
    >
      <Grid>
        <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
          <Link {...props.link} theme={props.theme}>
            {props.label}
          </Link>
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleSiteLinkWithLabel;
