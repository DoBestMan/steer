import { Transformations } from '~/lib/utils/cloudinary/cloudinary.types';

export function isTransformations(arg: any): arg is Transformations {
  return (
    arg &&
    (arg.angle ||
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
      arg.zoom)
  );
}
