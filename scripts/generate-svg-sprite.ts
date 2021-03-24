import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import SVGSpriter from 'svg-sprite';

import {
  compareIconsArray,
  createFile,
  getSVGContent,
  lineBreak,
} from './utils';

// Remove sorting key to keep config consistant with online documentation
/* eslint sort-keys: 0 */
const config = {
  dest: path.resolve(__dirname, '../public/static/assets/svg-sprite'), // Main output directory
  log: null, // Logging verbosity (default: no logging)
  shape: {
    // SVG shape related options
    id: {
      // SVG shape ID related options
      separator: '--', // Separator for directory name traversal
      generator(name) {
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
    stack: true, // Create a «stack» sprite
  },
};

const spriter = new SVGSpriter(config);

/* eslint no-undef: 0 */

const iconsCommonSrc = path.resolve(__dirname, '../src/assets/icons/common');
const iconsOthersSrc = path.resolve(__dirname, '../src/assets/icons/others');
const iconNameArray = [];

/*
 * Step 1: Get SVGs, make sure they are valid, copy over the "other" icons
 */

console.log(
  'Step 1 - Get SVGs, make sure they are valid, copy over the "other" icons',
);

// Common icons
fs.readdirSync(iconsCommonSrc).forEach((file: string): void => {
  const filepath = path.resolve(iconsCommonSrc, file);
  const { content, constName, hasViewbox, key, name, size } = getSVGContent(
    file,
    filepath,
  );

  if (hasViewbox) {
    // Common icons go to Sprite
    spriter.add(filepath, null, content);

    const SVGObject = {
      constName,
      key,
      name,
      size,
      type: 'COMMON',
    };

    iconNameArray.push(SVGObject);
  }
});

// Other icons
fs.readdirSync(iconsOthersSrc).forEach((file: string): void => {
  const filepath = path.resolve(iconsOthersSrc, file);
  const { content, constName, hasViewbox, key, name, size } = getSVGContent(
    file,
    filepath,
  );

  if (hasViewbox) {
    // const destination = `${iconsPublicOthersPath}/${file}`;
    spriter.add(filepath, null, content);

    const SVGObject = {
      content,
      constName,
      // filepath: destination,
      key,
      name,
      size,
      type: 'OTHER',
    };

    iconNameArray.push(SVGObject);

    // Rewrite others icon to "clean" them (likely add width/height attr)
    fs.writeFileSync(filepath, content, { encoding: 'utf8' });
  }
});

// Sort array, make them object already "sorted"
iconNameArray.sort(compareIconsArray);

const icons = {};

iconNameArray.forEach((icon) => {
  icons[icon.key] = { h: icon.size.h, type: icon.type, w: icon.size.w };
});

function getIconTypesContent(): string {
  const doNotEditWarning = 'DO NOT MANUALLY EDIT THIS FILE';
  const fileDescription = `// ${doNotEditWarning}, this file is auto-generated.${lineBreak}// To add new icons place svg file in /src/assets/icons${lineBreak}// and run 'yarn run generate-svg-sprite'`;

  const iconsType = `export type Icon = ${iconNameArray
    .map((icon) => `'${icon.name.toLowerCase()}'`)
    .join(' | ')};`;

  const type = "export type IconType = 'COMMON' | 'OTHER';";
  const size =
    'export type IconObject = { h: number, type: IconType, w: number };';

  return `${fileDescription}${lineBreak}${lineBreak}${iconsType}${lineBreak}${lineBreak}${type}${lineBreak}${lineBreak}${size}${lineBreak}${lineBreak}${lineBreak}${fileDescription}${lineBreak}`;
}

function getIconConstantsContent(): string {
  const doNotEditWarning = 'DO NOT MANUALLY EDIT THIS FILE';
  const fileDescription = `// ${doNotEditWarning}, this file is auto-generated.${lineBreak}// To add new icons place svg file in /src/assets/icons${lineBreak}// and run 'yarn run generate-svg-sprite'`;

  const importTypes = 'import { IconObject, Icon } from "./Icon.types";';

  const iconsConstant = `${lineBreak}export const ICONS: Record<string, Icon> = ${JSON.stringify(
    iconNameArray.reduce((obj, icon) => {
      const key = icon.key;
      obj[key] = icon.name;
      return obj;
    }, {}),
  )}`;

  const iconSizes = `${lineBreak}export const ICON_SIZES: Record<string, IconObject> = ${JSON.stringify(
    icons,
  )}`;

  const iconsTypes = `${lineBreak}export const ICON_TYPES = { COMMON: 'COMMON', OTHER:'OTHER'};`;
  const publicIconsPath = `${lineBreak}export const PUBLIC_ICONS_PATH = '/static/assets/icons-others';`;

  return `${fileDescription}${lineBreak}${lineBreak}${importTypes}${lineBreak}${lineBreak}${iconsConstant}${lineBreak}${lineBreak}${iconSizes}${lineBreak}${lineBreak}${iconsTypes}${lineBreak}${lineBreak}${publicIconsPath}${lineBreak}${lineBreak}${lineBreak}${lineBreak}${lineBreak}${fileDescription}${lineBreak}`;
}

function getIconOthersContent(): string {
  const doNotEditWarning = 'DO NOT MANUALLY EDIT THIS FILE';
  const fileDescription = `// ${doNotEditWarning}, this file is auto-generated.${lineBreak}// To add new icons place svg file in /src/assets/icons${lineBreak}// and run 'yarn run generate-svg-sprite'`;

  const importTypes =
    'import dynamic from "next/dynamic"; import { ReactElement } from "react";';

  let dynamicImports = '';

  iconNameArray
    .filter((icon) => icon.type === 'OTHER')
    .forEach((icon) => {
      dynamicImports += `const ${icon.constName} = dynamic(() => import('~/assets/icons/others/${icon.name}.svg'), { ssr: false });`;
    });

  const iconsConstant = `${lineBreak}export const ICONS_OTHER_MAP: Record<string, ReactElement> = { ${iconNameArray
    .filter((icon) => icon.type === 'OTHER')
    .map((icon) => {
      return `${icon.key}: <${icon.constName} />`;
    })} }`;

  return `${fileDescription}${lineBreak}${lineBreak}${importTypes}${lineBreak}${lineBreak}${dynamicImports}${lineBreak}${lineBreak}${iconsConstant}${lineBreak}${lineBreak}${lineBreak}${lineBreak}${lineBreak}${fileDescription}${lineBreak}`;
}

/*
 * Step 2: Compile Sprite
 */

/* eslint no-console: 0 */
console.log('Step 2: Compile Sprite');

spriter.compile((_error: string, result: Record<string, unknown>) => {
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

  /*
   * Step 3: Write contants/type files
   */

  console.log('Step 3: Write contants/type files');

  createFile(
    'src/components/global/Icon/',
    'Icon.types.ts',
    getIconTypesContent(),
  );

  createFile(
    'src/components/global/Icon/',
    'Icon.constants.ts',
    getIconConstantsContent(),
  );

  createFile(
    'src/components/global/Icon/',
    'Icon.others.tsx',
    getIconOthersContent(),
  );

  console.log('All done!');
  process.exit(0);
});
