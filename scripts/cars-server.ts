import express from 'express';
import fs from 'fs';
import path from 'path';
import { Cluster } from 'puppeteer-cluster';

import { createFile, lineBreak } from './utils';

(async () => {
  const app = express();
  const port = 8888;
  const location = `http://localhost:${port}`;
  app.use(express.static('public'));

  /* eslint no-console: 0 */
  console.log(`1/4 - Start server at ${location}`);

  /* eslint no-console: 0 */
  app.listen(port, () => {});

  // get all cars
  const carFolder = '/static/assets/cars';

  /* eslint no-undef: 0 */
  const carsSrc = path.resolve(__dirname, `../public/${carFolder}`);
  const aCarPath = [];

  /* eslint no-console: 0 */
  console.log('2/4 - Get car SVGs, replace "id" by "class"');

  fs.readdirSync(carsSrc).forEach((file: string): void => {
    const carSrc = path.resolve(carsSrc, file);

    if (carSrc.indexOf('.svg') > -1) {
      // get content, replace id= with class=
      const filePath = path.resolve(__dirname, `../public${carFolder}/${file}`);

      let contents = fs.readFileSync(filePath, 'utf8');
      contents = contents.replace(' id=', ' class=');
      fs.writeFileSync(filePath, contents);

      const carPath = `${carFolder}/${file}`;
      aCarPath.push(carPath);
    }
  });

  /* eslint no-console: 0 */
  console.log('3/4 - Start puppeteer clusters to get car details of each car');

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
  });

  const carDetails = {};
  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);

    const assetPath = url.replace(location, '');
    const asset = assetPath.replace(carFolder + '/', '').replace('.svg', '');

    // SVG Dimension: Should away work
    const dimensions = await page.evaluate(() => {
      return {
        height: document.querySelector('svg').getBoundingClientRect().height,
        width: document.querySelector('svg').getBoundingClientRect().width,
      };
    });

    // BackWheel
    let backWheel = null;
    try {
      backWheel = await page.evaluate(() => {
        return {
          width: document.querySelector('.back-wheel').getBoundingClientRect()
            .width,
          x: document.querySelector('.back-wheel').getBoundingClientRect().x,
          y: document.querySelector('.back-wheel').getBoundingClientRect().y,
        };
      });
    } catch (e) {
      /* eslint no-console: 0 */
      console.log(`ERROR: No .back-wheel class found in ${assetPath}`);
    }

    let frontWheel = null;
    try {
      frontWheel = await page.evaluate(() => {
        return {
          width: document.querySelector('.front-wheel').getBoundingClientRect()
            .width,
          x: document.querySelector('.front-wheel').getBoundingClientRect().x,
          y: document.querySelector('.front-wheel').getBoundingClientRect().y,
        };
      });
    } catch (e) {
      /* eslint no-console: 0 */
      console.log(`WARNING: No .front-wheel class found in ${assetPath}`);
    }

    // Need at least a back wheel (some cars have 1 wheel only)
    if (!backWheel) {
      console.error(
        `Cars: Error with ${assetPath}: Missing <g class="back-wheel"></g>`,
      );
      return;
    }

    const wheelWidth = backWheel.width; // assuming front = rear, or no front;

    // Only if we have a front wheel
    let distanceFrontToFrontWheel = 0;
    if (frontWheel) {
      distanceFrontToFrontWheel =
        dimensions.width - (frontWheel.x + frontWheel.width);
    }

    carDetails[asset] = {
      backWheelCenterPos: {
        x: backWheel.x + wheelWidth / 2,
        y: backWheel.y + wheelWidth / 2,
      },
      distanceBackToRearWheel: backWheel.x,
      distanceFrontToFrontWheel,
      frontWheelCenterPos: frontWheel
        ? {
            x: frontWheel.x + wheelWidth / 2,
            y: frontWheel.y + wheelWidth / 2,
          }
        : { x: 0, y: 0 },
      height: dimensions.height,
      wheelWidth,
      width: dimensions.width,
    };
  });

  aCarPath.forEach((carPath) => {
    const pathToGo = `${location}${carPath}`;
    cluster.queue(pathToGo);
  });

  await cluster.idle();
  await cluster.close();

  // Finally, write the details in a file
  /* eslint no-console: 0 */
  console.log('4/4 - Write CarDetails.constants.ts');

  const carDetailsOrdered = {};
  Object.keys(carDetails)
    .sort()
    .forEach(function (key) {
      carDetailsOrdered[key] = carDetails[key];
    });

  const getCarDetailConstantsContent = (): string => {
    const doNotEditWarning = 'DO NOT MANUALLY EDIT THIS FILE';
    const fileDescription = `// ${doNotEditWarning}, this file is auto-generated.${lineBreak}// To add new icons place svg file in /src/assets/icons${lineBreak}// and run 'yarn run generate-svg-sprite'`;

    const importTypes = 'import { Cars, CarDetail } from "./Car.types";';

    const carsConstant = `${lineBreak}export const CAR_DETAILS: Record<Cars, CarDetail> = ${JSON.stringify(
      carDetailsOrdered,
    )}`;

    return `${fileDescription}${lineBreak}${lineBreak}${importTypes}${lineBreak}${lineBreak}${carsConstant}${lineBreak}${lineBreak}${lineBreak}${lineBreak}${lineBreak}${fileDescription}${lineBreak}`;
  };

  createFile(
    'src/components/global/Car/',
    'CarDetails.constants.ts',
    getCarDetailConstantsContent(),
  );

  process.exit(0);
})();
