import { Loading } from '~/lib/constants';
import { TransformationArgs } from '~/lib/utils/cloudinary/cloudinary.types';

export interface SiteImageExtended {
  loading?: Loading;
  responsive?: boolean;
  srcSet?: string | null;
  srcTransformationArgs?: TransformationArgs;
  // Shortcut to generate width transformations based on `src` without proving `srcset`
  widths?: Array<number>;
}
