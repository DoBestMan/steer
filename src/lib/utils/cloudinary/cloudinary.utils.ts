import {
  TransformationArgs,
  Transformations,
} from '~/lib/utils/cloudinary/cloudinary.types';

export function isTransformations(
  arg: TransformationArgs,
): arg is Transformations {
  return (
    arg &&
    !Array.isArray(arg) &&
    !!(
      arg.angle ||
      arg.aspectRatio ||
      arg.background ||
      arg.border ||
      arg.crop ||
      arg.effect ||
      arg.fetchFormat ||
      arg.height ||
      arg.opacity ||
      arg.gravity ||
      arg.quality ||
      arg.radius ||
      arg.width ||
      arg.x ||
      arg.y ||
      arg.zoom
    )
  );
}
