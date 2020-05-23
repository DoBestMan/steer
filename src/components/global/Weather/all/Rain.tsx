import { useEffect, useRef } from 'react';

import { styles } from '../Weather.styles';

type Props = {
  height: number;
  width: number;
};

// Rain definition
class Rain {
  height: number;
  x: number;
  y: number;
  z: number;

  constructor() {
    this.height = 30 + Math.random() * 10;
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  init(width: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * -100;
    this.z = Math.random() * 0.5 + 0.5;
  }
}

const RAIN_WIDTH = 1;
const WIND = 4;
const RAIN_COLOR = '#c9c9c9';
const SPEED = 25;

function Snow(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { height, width } = props;

  useEffect(() => {
    if (
      canvasRef === null ||
      canvasRef.current === null ||
      typeof window === 'undefined'
    ) {
      return;
    }

    // We have everything, we can start the animation
    // (or restart if resize)

    let frame = 0;
    const dpr = 1;

    const ctx = canvasRef.current.getContext('2d');
    let mp = Math.round(width / 10); //max particles
    // console.log('mp');
    if (mp < 10) {
      mp = 10;
    }

    const rainPool: Array<Rain> = [];

    for (let i = 0; i < mp; i++) {
      const rain = new Rain();
      rain.init(width);

      rainPool.push(rain);
    }

    /* Inspired from https://codepen.io/MillerTime/pen/oXmgJe */
    function draw() {
      if (ctx) {
        ctx.clearRect(0, 0, width * dpr, height * dpr);

        // draw rain (trace all paths first, then stroke once)
        ctx.beginPath();

        for (let i = rainPool.length - 1; i >= 0; i--) {
          const r = rainPool[i];
          const rainHeight = r.height * dpr;
          const realX = r.x * dpr;
          const realY = r.y * dpr;
          ctx.moveTo(realX, realY);

          // magic number 1.5 compensates for lack of trig in drawing angled rain
          ctx.lineTo(realX - WIND * r.z * dpr * 1.5, realY - rainHeight * r.z);
        }

        ctx.lineWidth = RAIN_WIDTH * dpr;
        ctx.strokeStyle = RAIN_COLOR;
        ctx.stroke();

        moveRain();

        frame = requestAnimationFrame(draw);
      }
    }

    function moveRain() {
      for (let i = 0; i < rainPool.length; i++) {
        const r = rainPool[i];

        r.y += SPEED * r.z;
        r.x += r.z * WIND;

        // recycle rain
        if (
          r.y > height + r.height * r.z ||
          (WIND < 0 && r.x < WIND) ||
          (WIND > 0 && r.x > width + WIND)
        ) {
          r.init(width);
        }
      }
    }

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [canvasRef, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      css={styles.canvas}
    ></canvas>
  );
}

export default Snow;
