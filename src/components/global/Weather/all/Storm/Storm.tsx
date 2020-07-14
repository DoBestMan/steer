import { useEffect, useRef } from 'react';

import { getRandomMinMax, mapNumberToRange } from '~/lib/utils/number';

import { styles } from '../../Weather.styles';
import LightningBolt from './LightningBolt';
import {
  BOLT_LIFESPAN,
  BOLT_NUM_SEGMENTS,
  BOLT_START_WIDTH,
  BOLT_TIMEOUT,
  NUM_BRANCHES,
  SEGMENT_RENDER_INTERVAL,
} from './Storm.constants';

type Props = {
  animate?: boolean;
  height: number;
  width: number;
};

export type vtx2d = { x: number; y: number };

function Storm(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { animate = true, height, width } = props;

  useEffect(() => {
    if (
      canvasRef === null ||
      canvasRef.current === null ||
      typeof window === 'undefined'
    ) {
      return;
    }

    let frame = 0;
    const dpr = 1;
    const ctx = canvasRef.current.getContext('2d');

    const BOLT_START = {
      x: getRandomMinMax(width / 5, (width / 5) * 4), // between 20% and 80% of screen width.
      y: 0,
    };

    let lightningBolts: Array<LightningBolt> = [];

    function initStorm() {
      const mainBolt = new LightningBolt();
      mainBolt.init({
        lifeSpan: getRandomMinMax(BOLT_LIFESPAN.MIN, BOLT_LIFESPAN.MAX),
        numSegments: Math.round(
          getRandomMinMax(BOLT_NUM_SEGMENTS.MIN, BOLT_NUM_SEGMENTS.MAX),
        ),
        pos: BOLT_START,
      });

      lightningBolts = [mainBolt];
      for (let i = 0; i < NUM_BRANCHES; i++) {
        // Space out the "branches" across different segment indexes
        const nodeIndex = i * 3 + Math.floor(getRandomMinMax(4, 6));
        const node = mainBolt.segments[nodeIndex];

        const lightning = new LightningBolt();
        lightning.init({
          branchNodeIndex: nodeIndex,
          lifeSpan: mainBolt.lifeSpan,
          numSegments: Math.round(getRandomMinMax(6 - i * 2, 10 - i * 2)), // less segments for branches further down the chain
          pos: { x: node.pos.x, y: node.pos.y },
        });

        lightningBolts.push(lightning);
      }

      // Show another lightining bolt after a random amount of time
      setTimeout(
        initStorm,
        Math.floor(getRandomMinMax(BOLT_TIMEOUT.MIN, BOLT_TIMEOUT.MAX)),
      );
    }

    initStorm();

    function draw() {
      if (ctx) {
        ctx.clearRect(0, 0, width * dpr, height * dpr);

        const currentTime = Date.now();

        // Render all of the bolts (and branches)
        for (let i = 0; i < lightningBolts.length; i++) {
          ctx.beginPath();

          const lightning = lightningBolts[i];

          // Update lightning bolt opacity
          lightning.updateOpacity(currentTime);

          // Draw the "flash" across the entire canvas
          if (!lightning.isEntering && !lightning.branchNodeIndex) {
            ctx.fillStyle = `rgba(24, 24, 24, ${
              animate ? lightning.opacity : 0
            })`;
            ctx.fillRect(0, 0, width, height);
          }

          // Draw all bolt segments
          for (let j = 0; j < lightning.segments.length; j++) {
            const segment = lightning.segments[j];
            const { pos, range } = segment;

            // Sequentially draw segments based on interval
            if (
              SEGMENT_RENDER_INTERVAL * j <=
              currentTime - lightning.birthTime
            ) {
              segment.isRendered = true;
            }
            if (!segment.isRendered && animate) {
              continue;
            }

            // Move and trace segment
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(pos.x + range.x, pos.y + range.y);

            let startingWidth = BOLT_START_WIDTH;

            // If this is a "branch", the width should start as the same width
            // as the parent's segment
            if (lightning.branchNodeIndex) {
              startingWidth = mapNumberToRange(
                lightning.branchNodeIndex,
                [0, lightningBolts[0].segments.length],
                [BOLT_START_WIDTH, 1],
              );
            }

            // Update width based on segment number (wide to thin)
            ctx.lineWidth = mapNumberToRange(
              j,
              [0, lightning.segments.length],
              [startingWidth, 1],
            );

            // Draw stroke on canvas for segment
            ctx.strokeStyle = `rgba(201, 201, 201, ${
              animate ? lightning.opacity : 1
            })`;
            ctx.stroke();
          }
        }

        if (animate) {
          frame = requestAnimationFrame(draw);
        }
      }
    }

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [canvasRef, width, height, animate]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        css={styles.canvas}
      ></canvas>
    </>
  );
}

export default Storm;
