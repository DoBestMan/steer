import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Video from '~/components/global/Video/Video';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleYouTubeVideo } from '~/data/models/SiteModules';

function ModuleYouTubeVideo(props: SiteModuleYouTubeVideo) {
  // Force 16/9 ratio because it's a video
  if (
    props.poster.width &&
    props.poster.height &&
    props.poster.width / props.poster.height !== 16 / 9
  ) {
    props.poster.width = 1600;
    props.poster.height = 900;
  }

  return (
    <div data-component="module-video">
      <Grid css={styles.spacingTopS60XL80}>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <Video {...props} sizes={[400, 600, 800, 1200, 1600]} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleYouTubeVideo;
