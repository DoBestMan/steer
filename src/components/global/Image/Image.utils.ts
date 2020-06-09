import { transformation } from '~/lib/utils/cloudinary/cloudinary';
import {
  FetchFormat,
  TransformationArgs,
  Transformations,
} from '~/lib/utils/cloudinary/cloudinary.types';
import { isTransformations } from '~/lib/utils/cloudinary/cloudinary.utils';

const IS_CLIENT = typeof window !== 'undefined';
/* eslint-disable  @typescript-eslint/no-explicit-any */
const anyNavigator: any = IS_CLIENT && window.navigator;

export function getSrcset(url: string, q?: TransformationArgs): string {
  if (!url) {
    return '';
  }

  let queries: Record<string, Transformations | Array<Transformations>> = {};

  if (!q) {
    queries = { all: {} };
  }

  // q:Array<Transformations>
  if (q && Array.isArray(q)) {
    queries = { all: q };
  }

  // q:Transformations
  if (q && isTransformations(q)) {
    queries = { all: [q as Transformations] };
  }

  // q:Record<string, Transformations | Array<Transformations>>
  if (!Object.keys(queries).length) {
    queries = q as Record<string, Transformations | Array<Transformations>>;
  }

  const srcset = Object.entries(queries)
    .map((query) => {
      const widthStr = query[0] !== 'all' ? query[0] : '';
      let transform = query[1];

      // Transformations
      if (!Array.isArray(transform)) {
        transform = [transform];
      }

      // fetchFormat: auto, to fetch webp if no format given
      if (!transform[0].fetchFormat) {
        transform[0].fetchFormat = FetchFormat.AUTO;
      }

      // alternate quality depending on user's connectivity
      let quality = 100;
      let type = null;

      if (
        IS_CLIENT &&
        anyNavigator &&
        anyNavigator.connection &&
        anyNavigator.connection.type
      ) {
        type = anyNavigator.connection.type;
      }

      if (
        IS_CLIENT &&
        anyNavigator &&
        anyNavigator.connection &&
        anyNavigator.connection.effectiveType
      ) {
        type = anyNavigator.connection.effectiveType;
      }

      // Reduce quality
      if (type !== null && type !== 'wifi' && type !== '4g') {
        quality = 50;
      }

      // Apply quality
      transform[0].quality = quality;

      const transformed = transformation(url, transform);

      return `${transformed} ${widthStr}`;
    })
    .join();

  return srcset;
}

export function getMinimalQuery(width: number | undefined) {
  let query;

  if (width) {
    query = { [`${width}w`]: { width } };
  }

  return query;
}
