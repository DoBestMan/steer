import { boolean } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import Grid from '~/components/global/Grid/Grid';
import { COLORS } from '~/lib/constants';

import TireRatings from './TireRatings';
import { mockTireRatings } from './TireRatings.mocks';

export default {
  component: TireRatings,
  title: 'PDP/Tire Ratings',
};

function Container({ children }: { children: ReactNode }) {
  return <Grid css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>{children}</Grid>;
}

export function TireRatingsWithKnobs() {
  return (
    <Container>
      <TireRatings
        momentList={
          boolean('Enable moment list', true)
            ? mockTireRatings.momentList
            : undefined
        }
        ratings={mockTireRatings.ratings}
        title={mockTireRatings.title}
        videoId={
          boolean('Enable video', true) ? mockTireRatings.videoId : undefined
        }
      />
    </Container>
  );
}

export function TireRatingsNoVideo() {
  return (
    <Container>
      <TireRatings
        momentList={mockTireRatings.momentList}
        ratings={mockTireRatings.ratings}
        title={mockTireRatings.title}
      />
    </Container>
  );
}

export function TireRatingsNoMomentList() {
  return (
    <Container>
      <TireRatings
        ratings={mockTireRatings.ratings}
        title={mockTireRatings.title}
        videoId={mockTireRatings.videoId}
      />
    </Container>
  );
}

export function TireRatingsNoVideoOrMomentList() {
  return (
    <Container>
      <TireRatings
        ratings={mockTireRatings.ratings}
        title={mockTireRatings.title}
      />
    </Container>
  );
}
