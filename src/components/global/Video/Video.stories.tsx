import { button } from '@storybook/addon-knobs';
import { useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { COLORS } from '~/lib/constants';

import Video from './Video';

export default {
  component: Video,
  title: 'Global/Video',
};

export function VideoWithKnobs() {
  const [shouldStopVideo, setShouldStopVideo] = useState(false);
  button('Stop Video', () => setShouldStopVideo(true));

  return (
    <Grid css={{ backgroundColor: COLORS.GLOBAL.BLACK, height: '100vh' }}>
      <GridItem gridColumnM="2/5" gridColumnL="2/10">
        <Video
          youtubeId="iQdV2fDR9RY"
          posterFrame="https://picsum.photos/1920/1080"
          sizes={[920]}
          shouldStopVideo={shouldStopVideo}
          setShouldStopVideo={setShouldStopVideo}
        />
      </GridItem>
    </Grid>
  );
}
