import { useEffect, useRef, useState } from 'react';

import { styles } from '../Weather.styles';

type Props = {
  animate?: boolean;
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
  const [SVGString, setSVGString] = useState<string | null>(null);
  const { animate = true, height, width } = props;

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
      const snowSVGURL = '/static/assets/weather/snowflake.svg';
      const getSVG = async () => {
        const data = await fetch(snowSVGURL)
          .then((response) => response.text())
          .then((data) => data);

        setSVGString(data);
      };

      getSVG();

      if (SVGString) {
        const DOMURL = window.URL || window.webkitURL || window;
        const snowflakeImg = new Image();
        const svg = new Blob([SVGString], { type: 'image/svg+xml' });
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
    }

    // We have everything, we can start the animation
    // (or restart if resize)

    let angle = 0;
    let frame = 0;

    const ctx = canvasRef.current.getContext('2d');
    let mp = Math.round(width / 90); //max particles
    if (mp < 10) {
      mp = 10;
    }

    const particles: Array<Particle> = [];

    for (let i = 0; i < mp; i++) {
      particles.push({
        d: Math.random() * mp, //density
        r: Math.random() * 4 + 1, //radius
        x: Math.random() * width, //x-coordinate
        y: animate ? -Math.random() * height : Math.random() * height, //y-coordinate
      });
    }

    /* Inspired from https://designers.hubspot.com/blog/how-to-implement-an-animated-snow-effect-using-html5-canvas-and-javascript */
    function moveSnowflakes() {
      angle += 0.005;
      for (let i = 0; i < mp; i++) {
        const p = particles[i];

        //Updating X coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        const vx = Math.cos(angle + p.d) + 1 + p.r / 4;
        p.y += vx;

        // Update Y coordinates
        // Add the density to sin to make each flake's interval random
        // Subtract 2 so that the flake moves to the left most of the time.
        const vy = Math.sin(angle + p.d) - 2;
        p.x += vy;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (
          p.x > width + SNOWFLAKE_WIDTH ||
          p.x < SNOWFLAKE_WIDTH * -1 ||
          p.y > height
        ) {
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
            if (vy > 0) {
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
        if (animate) {
          moveSnowflakes();
        }
      }

      if (animate) {
        frame = requestAnimationFrame(draw);
      }
    }

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [canvasRef, width, height, snowflakeData, animate, SVGString]);

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
