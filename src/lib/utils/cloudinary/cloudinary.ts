import {
  CLOUDINARY_SRC_REGEX,
  CLOUDINARY_ST_SRC_REGEX,
} from './cloudinary.constants';
import {
  Angle,
  ColorSpace,
  CropMode,
  Effect,
  FetchFormat,
  Gravity,
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
              transformValue = quality(transformation[key] as number);
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

function gravity(g: Gravity): string {
  return `g_${g}`;
}

function height(h: number): string {
  return `h_${h}`;
}

function opacity(o: number): string {
  return `o_${o}`;
}

function quality(percent: number): string {
  return `q_${percent}`;
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
