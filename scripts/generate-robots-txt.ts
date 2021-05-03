import fs from 'fs';
import path from 'path';

import { isProductionDeploy } from '../src/lib/utils/deploy';

/* eslint no-console: 0 */
function generateRobotsTxtFile() {
  const stageRobotsTxtFilePath = path.resolve(
    __dirname,
    '../robots-txt/stage.txt',
  );
  const prodRobotsTxtFilePath = path.resolve(
    __dirname,
    '../robots-txt/prod.txt',
  );
  const robotsTxtFilePath = path.resolve(__dirname, '../public/robots.txt');
  const robotsTxtFile = isProductionDeploy()
    ? prodRobotsTxtFilePath
    : stageRobotsTxtFilePath;

  fs.readFile(robotsTxtFile, function (err, data) {
    if (err) {
      throw err;
    }
    fs.writeFile(robotsTxtFilePath, data, function (err) {
      if (err) {
        throw err;
      }
      console.log('Success! robots.txt file created successfully');
    });
  });
}

generateRobotsTxtFile();
