import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import SVGSpriter from 'svg-sprite';

import { createFile, lineBreak } from './utils';

// Remove sorting key to keep config consistant with online documentation
/* eslint sort-keys: 0 */
const config = {
  dest: path.resolve(__dirname, '../src/assets/svg-sprite'), // Main output directory
  log: null, // Logging verbosity (default: no logging)
  shape: {
    // SVG shape related options
    id: {
      // SVG shape ID related options
      separator: '--', // Separator for directory name traversal
      generator: function (name) {
        return (
          'steer--' +
          path.basename(
            name.split(path.sep).join(this.separator).toLowerCase(),
            '.svg',
          )
        );
      }, // SVG shape ID generator callback
      pseudo: '~', // File name separator for shape states (e.g. ':hover')
    },
    dimension: {
      // Dimension related options
      maxWidth: 2000, // Max. shape width
      maxHeight: 2000, // Max. shape height
      precision: 2, // Floating point precision
      attributes: false, // Width and height attributes on embedded shapes
    },
    spacing: {
      // Spacing related options
      padding: 0, // Padding around all shapes
      box: 'content', // Padding strategy (similar to CSS `box-sizing`)
    },
    transform: ['svgo'], // List of transformations / optimizations
    meta: null, // Path to YAML file with meta / accessibility data
    align: null, // Path to YAML file with extended alignment data
  },
  svg: {
    // General options for created SVG files
    xmlDeclaration: true, // Add XML declaration to SVG sprite
    doctypeDeclaration: true, // Add DOCTYPE declaration to SVG sprite
    namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
    namespaceClassnames: false, // Add namespace token to all CSS class names in SVG shapes
    dimensionAttributes: true, // Width and height attributes on the sprite
  },
  mode: {
    symbol: true, // Create a «symbol» sprite
  },
};

const spriter = new SVGSpriter(config);

/* eslint no-undef: 0 */
const iconsSrc = path.resolve(__dirname, '../src/assets/icons');
const iconNameArray = [];

fs.readdirSync(iconsSrc).forEach((file: string): void => {
  const iconSrc = path.resolve(iconsSrc, file);

  spriter.add(iconSrc, file, fs.readFileSync(iconSrc, { encoding: 'utf-8' }));
  iconNameArray.push(file.replace('.svg', ''));
});

iconNameArray.sort();

const getIconTypesContent = (): string => {
  const doNotEditWarning = 'DO NOT MANUALLY EDIT THIS FILE';
  const fileDescription = `// ${doNotEditWarning}, this file is auto-generated.${lineBreak}// To add new icons place svg file in /src/assets/icons${lineBreak}// and run 'yarn run generate-svg-sprite'`;

  const iconsType = `export type Icon = ${iconNameArray
    .map((icon) => `'${icon.toLowerCase()}'`)
    .join(' | ')};`;

  const size = 'export type IconSize = { h: number, w: number };';

  return `${fileDescription}${lineBreak}${lineBreak}${iconsType}${lineBreak}${lineBreak}${size}${lineBreak}${lineBreak}${lineBreak}${fileDescription}${lineBreak}`;
};

const getIconConstantsContent = (sizes): string => {
  const doNotEditWarning = 'DO NOT MANUALLY EDIT THIS FILE';
  const fileDescription = `// ${doNotEditWarning}, this file is auto-generated.${lineBreak}// To add new icons place svg file in /src/assets/icons${lineBreak}// and run 'yarn run generate-svg-sprite'`;

  const importTypes = 'import { IconSize, Icon } from "./Icon.types";';

  const iconsConstant = `${lineBreak}export const ICONS: Record<string, Icon> = ${JSON.stringify(
    iconNameArray.reduce((obj, icon) => {
      const key = icon.toUpperCase().replace(/-/g, '_');
      obj[key] = icon.toLowerCase();
      return obj;
    }, {}),
  )}`;

  const iconSizes = `${lineBreak}export const ICON_SIZES: Record<string, IconSize> = ${JSON.stringify(
    sizes,
  )}`;

  return `${fileDescription}${lineBreak}${lineBreak}${importTypes}${lineBreak}${lineBreak}${iconsConstant}${lineBreak}${lineBreak}${iconSizes}${lineBreak}${lineBreak}${lineBreak}${lineBreak}${lineBreak}${fileDescription}${lineBreak}`;
};

spriter.compile((error: string, result: object) => {
  /* Write `result` files to disk */
  for (const mode in result) {
    for (const resource in result[mode]) {
      mkdirp.sync(path.dirname(result[mode][resource].path));
      fs.writeFileSync(
        result[mode][resource].path,
        result[mode][resource].contents,
      );
    }
  }

  const contents = fs.readFileSync(
    path.resolve(
      __dirname,
      '../src/assets/svg-sprite/symbol/svg/sprite.symbol.svg',
    ),
    'utf8',
  );

  // Extract viewport to get original size for each SVG
  /* eslint no-useless-escape: 0 */
  const viewBoxes = contents
    .match(/viewBox\=\"([0-9 ]*)\"/g)
    .map((viewBox) =>
      viewBox.replace('viewBox="', '').replace('"', '').substr(4),
    );

  const sizes = {};
  viewBoxes.forEach((viewBox, i) => {
    const name = iconNameArray[i];
    const key = name.toUpperCase().replace(/-/g, '_');
    const aSize = viewBox.split(' ');
    sizes[key] = {
      h: +aSize[1],
      w: +aSize[0],
    };
  });

  // Finally, create files
  createFile(
    'src/components/global/Icon/',
    'Icon.types.ts',
    getIconTypesContent(),
  );

  createFile(
    'src/components/global/Icon/',
    'Icon.constants.ts',
    getIconConstantsContent(sizes),
  );
});
