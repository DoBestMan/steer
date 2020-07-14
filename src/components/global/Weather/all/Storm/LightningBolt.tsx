import { TWEEN_FUNCTIONS } from '~/lib/utils/ease';
import { getRandomMinMax } from '~/lib/utils/number';

import LightningSegment from './LightningSegment';
import { vtx2d } from './Storm';

class LightningBolt {
  birthTime: number;
  branchNodeIndex?: number;
  currentSegmentDrawn: number;
  isEntering: boolean;
  lifeSpan: number;
  numSegments: number;
  opacity: number;
  pos: vtx2d;
  segments: LightningSegment[];

  constructor() {
    this.birthTime = 0;
    this.branchNodeIndex;
    this.currentSegmentDrawn = 0;
    this.isEntering = true;
    this.lifeSpan = 0;
    this.numSegments = 1;
    this.opacity = 1;
    this.pos = { x: 0, y: 0 };
    this.segments = [];
  }

  init({
    branchNodeIndex,
    lifeSpan,
    numSegments,
    pos,
  }: {
    branchNodeIndex?: number;
    lifeSpan: number;
    numSegments: number;
    pos: vtx2d;
  }) {
    this.branchNodeIndex = branchNodeIndex; // if this bolt is a "branch", this is the index of the parent segment it's branched from
    this.birthTime = Date.now();
    this.lifeSpan = lifeSpan;

    this.pos = pos;
    this.numSegments = numSegments;
    this.segments = [];

    const direction = Math.random() >= 0.5 ? -1 : 1; // "flip a coin" to see if bolt mostly goes neg or pos
    const baseRangeX = getRandomMinMax(
      direction === 1 ? 0 : -15,
      direction === 1 ? 15 : 0,
    );

    for (let i = 0; i < this.numSegments; i++) {
      const segment = new LightningSegment();
      const prevSegment = this.segments[i - 1];

      segment.init({
        pos: {
          x: prevSegment ? prevSegment.pos.x + prevSegment.range.x : pos.x,
          y: prevSegment ? prevSegment.pos.y + prevSegment.range.y : pos.y,
        },
        range: {
          x: branchNodeIndex
            ? getRandomMinMax(baseRangeX - 15, baseRangeX + 15)
            : getRandomMinMax(-20, 20),
          y: branchNodeIndex
            ? getRandomMinMax(16 - branchNodeIndex, 22 - branchNodeIndex)
            : getRandomMinMax(15, 25),
        },
      });

      this.segments.push(segment);
    }
  }

  updateOpacity(currentTime: number) {
    // Update lightning bolt opacity
    if (this.isEntering) {
      this.opacity = Math.min(
        TWEEN_FUNCTIONS.EASE_IN_QUART(
          currentTime - this.birthTime,
          0,
          1,
          this.lifeSpan * 0.3, // fade in is 30% of lifespan
        ),
        1,
      );

      // When bolt is completely faded in, start fading out
      if (this.opacity === 1) {
        this.isEntering = false;
      }
    } else {
      this.opacity = Math.max(
        TWEEN_FUNCTIONS.LINEAR(
          currentTime - this.birthTime,
          1,
          0,
          this.lifeSpan * 0.7, // fade out is 70% of lifespan
        ),
        0,
      );
    }
  }
}

export default LightningBolt;
