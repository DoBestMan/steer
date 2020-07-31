import { button } from '@storybook/addon-knobs';
import { useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SiteImage } from '~/data/models/SiteImage';
import { COLORS } from '~/lib/constants';

import Video from './Video';

export default {
  component: Video,
  title: 'Global/Video',
};

const poster = {
  altText: 'Video poster',
  src: 'https://picsum.photos/1920/1080',
  type: 'SiteImage',
} as SiteImage;

export function VideoWithKnobs() {
  const [shouldPauseVideo, setShouldPauseVideo] = useState(false);
  button('Stop Video', () => setShouldPauseVideo(true));

  return (
    <Grid css={{ backgroundColor: COLORS.GLOBAL.BLACK, height: '100vh' }}>
      <GridItem gridColumnM="2/5" gridColumnL="2/10">
        <Video
          poster={poster}
          setShouldPauseVideo={setShouldPauseVideo}
          shouldPauseVideo={shouldPauseVideo}
          sizes={[960]}
          video={{ youtubeId: 'iQdV2fDR9RY' }}
        />
      </GridItem>
    </Grid>
  );
}
