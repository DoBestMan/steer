import { useEffect, useRef, useState } from 'react';

import Snowflake from '~/assets/weather/snowflake.svg';

import { styles } from '../Weather.styles';

type Props = {
  height: number;
  width: number;
};

type Particle = {
  d: number;
  r: number;
  x: number;
  y: number;
};

const SNOWFLAKE_WIDTH = 12.83;
const SNOWFLAKE_HEIGHT = 11.93;

function Snow(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snowflakeData, setSnowflakeData] = useState<ImageData>();
  const { height, width } = props;

  useEffect(() => {
    if (
      canvasRef === null ||
      canvasRef.current === null ||
      typeof window === 'undefined'
    ) {
      return;
    }

    if (!snowflakeData) {
      // Load image and store imageData for optim once
      const DOMURL = window.URL || window.webkitURL || window;
      const snowflakeImg = new Image();
      const svg = new Blob([Snowflake], { type: 'image/svg+xml' });
      const url = DOMURL.createObjectURL(svg);

      snowflakeImg.onload = function () {
        DOMURL.revokeObjectURL(url);

        const canvasOffScreen = document.createElement('canvas');
        const ctxOffScreen = canvasOffScreen.getContext('2d');

        if (ctxOffScreen) {
          ctxOffScreen.drawImage(snowflakeImg, 0, 0);
          const imageData = ctxOffScreen.getImageData(
            0,
            0,
            SNOWFLAKE_WIDTH,
            SNOWFLAKE_HEIGHT,
          );

          setSnowflakeData(imageData);
        }
      };
      snowflakeImg.src = url;

      return;
    }

    // We have everything, we can start the animation
    // (or restart if resize)

    let angle = 0;
    let frame = 0;

    const ctx = canvasRef.current.getContext('2d');
    let mp = Math.round(width / 50); //max particles
    if (mp < 10) {
      mp = 10;
    }

    const particles: Array<Particle> = [];

    for (let i = 0; i < mp; i++) {
      particles.push({
        d: Math.random() * mp, //density
        r: Math.random() * 4 + 1, //radius
        x: Math.random() * width, //x-coordinate
        y: -Math.random() * height, //y-coordinate
      });
    }

    /* Inspired from https://designers.hubspot.com/blog/how-to-implement-an-animated-snow-effect-using-html5-canvas-and-javascript */
    function moveSnowflakes() {
      angle += 0.01;
      for (let i = 0; i < mp; i++) {
        const p = particles[i];

        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > width + 5 || p.x < -5 || p.y > height) {
          if (i % 3 > 0) {
            //66.67% of the flakes
            particles[i] = {
              d: p.d,
              r: p.r,
              x: Math.random() * width,
              y: -10,
            };
          } else {
            //If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              //Enter from the left
              particles[i] = {
                d: p.d,
                r: p.r,
                x: -5,
                y: Math.random() * height,
              };
            } else {
              //Enter from the right
              particles[i] = {
                d: p.d,
                r: p.r,
                x: width + 5,
                y: Math.random() * height,
              };
            }
          }
        }
      }
    }

    function draw() {
      if (ctx) {
        ctx.clearRect(0, 0, width, height);

        // draw the flake
        for (let i = 0; i < mp; i++) {
          const p = particles[i];
          if (snowflakeData) {
            ctx.putImageData(snowflakeData, p.x, p.y);
          }
        }

        // move them
        moveSnowflakes();
      }

      frame = requestAnimationFrame(draw);
    }

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [canvasRef, width, height, snowflakeData]);

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
