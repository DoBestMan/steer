import { replaceAt } from '~/lib/utils/string';

import {
  CLOUDINARY_BLACK_BRAND_LOGO,
  CLOUDINARY_SRC_REGEX,
  CLOUDINARY_ST_SRC_REGEX,
  CLOUDINARY_WHITE_BRAND_LOGO,
} from './cloudinary.constants';
import {
  Angle,
  ColorSpace,
  CropMode,
  Effect,
  FetchFormat,
  Gravity,
  ImageFlags,
  Transformations,
} from './cloudinary.types';

export function isCloudinarySrc(
  src: string,
  reg: RegExp = CLOUDINARY_SRC_REGEX,
) {
  const matches = src.match(reg);
  return matches && matches.length === 3;
}

function getMatches(
  src: string,
  reg: RegExp = CLOUDINARY_SRC_REGEX,
): Array<string> | null {
  const matches = src.match(reg);
  if (matches) {
    return matches;
  }
  return null;
}

/* List of transformation: https://cloudinary.com/documentation/image_transformation_reference */
/* Includes only the most simple transformations */
export function transformation(
  src: string,
  transformations?: Transformations | Array<Transformations>,
): string {
  if (transformations && !Array.isArray(transformations)) {
    transformations = [transformations];
  }

  if (
    (!isCloudinarySrc(src, CLOUDINARY_ST_SRC_REGEX) && !isCloudinarySrc(src)) ||
    !transformations ||
    !transformations.length
  ) {
    return src;
  }

  let matches = getMatches(src, CLOUDINARY_ST_SRC_REGEX);

  if (!matches) {
    matches = getMatches(src);
  }

  if (!matches) {
    return src;
  }

  const base = matches[1];
  const object = matches[2];

  const transformationStr = transformations
    .map((transformation) => {
      const transformationsItem = Object.keys(transformation)
        .map((key) => {
          let transformValue = '';
          let effectArray;
          let effectName;
          let effectValue;
          let colorArray;
          let colorSpace;
          let colorValue;

          // Can't use a map object because functions have different possible argument types
          switch (key) {
            case 'angle':
              transformValue = angle(transformation[key] as Angle | number);
              break;
            case 'aspectRatio':
              transformValue = aspectRatio(
                transformation[key] as string | number,
              );
              break;
            case 'background':
              transformValue = background(transformation[key] as string);
              break;
            case 'border':
              transformValue = border(transformation[key] as string);
              break;
            case 'color':
              colorArray = Array.isArray(transformation[key])
                ? transformation[key]
                : [transformation[key]];

              if (!colorArray || !colorArray[0]) {
                break;
              }

              colorSpace = colorArray[0] as ColorSpace;
              colorValue = colorArray[1] && (colorArray[1] as string);

              transformValue = color(colorSpace, colorValue);
              break;
            case 'crop':
              transformValue = crop(transformation[key] as CropMode);
              break;
            case 'effect':
              effectArray = Array.isArray(transformation[key])
                ? transformation[key]
                : [transformation[key]];

              if (!effectArray || !effectArray[0]) {
                break;
              }

              effectName = effectArray[0] as Effect;
              effectValue =
                effectArray[1] && (effectArray[1] as string | number);

              transformValue = effect(effectName, effectValue);
              break;
            case 'fetchFormat':
              transformValue = fetchFormat(transformation[key] as FetchFormat);
              break;
            case 'imageFlag':
              transformValue = imageFlag(transformation[key] as ImageFlags);
              break;
            case 'gravity':
              transformValue = gravity(transformation[key] as Gravity);
              break;
            case 'height':
              transformValue = height(transformation[key] as number);
              break;
            case 'opacity':
              transformValue = opacity(transformation[key] as number);
              break;
            case 'quality':
              transformValue = quality(transformation[key] as string);
              break;
            case 'radius':
              transformValue = radius(transformation[key] as number);
              break;
            case 'width':
              transformValue = width(transformation[key] as number);
              break;
            case 'x':
              transformValue = x(transformation[key] as number);
              break;
            case 'y':
              transformValue = y(transformation[key] as number);
              break;
            case 'zoom':
              transformValue = zoom(transformation[key] as number);
              break;
          }

          return transformValue;
        })
        .join();

      return transformationsItem;
    })
    .join('/');

  return `${base}${transformationStr}/${object}`;
}

function angle(a: Angle | number): string {
  return `a_${a}`;
}

function aspectRatio(ar: string | number): string {
  return `ar_${ar}`;
}

function background(color: string): string {
  return `b_${color}`;
}

function border(bo: string): string {
  return `bo_${bo}`;
}

function color(c: ColorSpace, value = ''): string {
  return `co_${c}:${value}`;
}

function crop(c: CropMode): string {
  return `c_${c}`;
}

function effect(e: Effect, value: string | number = ''): string {
  return `e_${e}:${value}`;
}

function fetchFormat(f: FetchFormat): string {
  return `f_${f}`;
}

function imageFlag(fl: ImageFlags): string {
  return `fl_${fl}`;
}

function gravity(g: Gravity): string {
  return `g_${g}`;
}

function height(h: number): string {
  return `h_${h}`;
}

function opacity(o: number): string {
  return `o_${o}`;
}

function quality(q: string): string {
  return `q_${q}`;
}

function radius(r: number): string {
  return `r_${r}`;
}

function width(w: number): string {
  return `w_${w}`;
}

function x(x: number): string {
  return `x_${x}`;
}

function y(y: number): string {
  return `y_${y}`;
}

function zoom(z: number): string {
  return `z_${z}`;
}

export function getSquareImageTransformations(sizes: number[]) {
  return sizes.reduce((object: Record<string, Transformations[]>, size) => {
    object[`${size}w`] = [
      {
        width: size,
        height: size,
        crop: CropMode.PAD,
      },
    ];
    return object;
  }, {});
}

// This should not be used anymore, but we keep it just in case we have to
export function getInvertedImageTransformations(sizes: number[]) {
  return sizes.reduce((object: Record<string, Transformations[]>, size) => {
    object[`${size}w`] = [
      {
        color: ['rgb' as ColorSpace, 'FFFFFF'],
        effect: ['colorize' as Effect, '100'],
        width: size,
      },
    ];
    return object;
  }, {});
}

export function getCroppedImageTransformations(
  sizes: {
    height: number;
    width: number;
  }[],
) {
  return sizes.reduce((object: Record<string, Transformations[]>, size) => {
    object[`${size.width}w`] = [
      {
        crop: CropMode.FILL,
        gravity: Gravity.NORTH,
        height: size.height,
        width: size.width,
      },
    ];
    return object;
  }, {});
}

export function getWidthsTransformations(sizes: number[]) {
  return sizes.reduce((object: Record<string, Transformations[]>, size) => {
    object[`${size}w`] = [
      {
        width: size,
      },
    ];
    return object;
  }, {});
}

/*
 * Based on a brand src:
 * - tries to switch b -> w if the provided logo is black and should be white, or
 * - tries to switch w -> b if the provided logo is white and should be black
 */
function getTransformedSrcLogo({
  src,
  shouldBeWhite = false,
}: {
  shouldBeWhite?: boolean;
  src: string;
}): string {
  let srcFinal = src;

  const matchIsBlack = CLOUDINARY_BLACK_BRAND_LOGO.exec(src);
  const matchIsWhite = CLOUDINARY_WHITE_BRAND_LOGO.exec(src);

  // No match, we just return the current result
  if (!matchIsBlack && !matchIsWhite) {
    return srcFinal;
  }

  let match = null;

  if (!shouldBeWhite && matchIsWhite) {
    match = matchIsWhite;
  }

  if (shouldBeWhite && matchIsBlack) {
    match = matchIsBlack;
  }

  // No match, we just return the current result
  if (!match) {
    return srcFinal;
  }

  const matched = match[0];
  let indexBOrW = 0;

  // because matched would be <number><b|w>... , we need to get the exact index for b or w by "removing" the numbers.
  while (matched[indexBOrW] !== undefined) {
    if (matched[indexBOrW] === 'b' || matched[indexBOrW] === 'w') {
      break;
    }
    indexBOrW++;
  }

  indexBOrW += match.index;

  // If the url provided is black and it's supposed to be white
  // and if we've found the correct index, we switch the later to 'w'
  if (src[indexBOrW] === 'b' && shouldBeWhite) {
    srcFinal = replaceAt(src, indexBOrW, 'w');
  }

  // If the url provided is whie and it's supposed to be black
  // and if we've found the correct index, we switch the later to 'b'
  if (src[indexBOrW] === 'w' && !shouldBeWhite) {
    srcFinal = replaceAt(src, indexBOrW, 'b');
  }

  return srcFinal;
}

export function transformSrcLogoToWhite(src: string): string {
  return getTransformedSrcLogo({ src, shouldBeWhite: true });
}

export function transformSrcLogoToBlack(src: string): string {
  return getTransformedSrcLogo({ src, shouldBeWhite: false });
}
