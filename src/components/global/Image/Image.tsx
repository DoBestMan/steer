import { ReactType, useRef, useState } from 'react';

import { SiteImageExtended } from '~/data/models/SiteImageExtended';
import { CSSStyles, LOADING_OPTIONS } from '~/lib/constants';
import { Transformations } from '~/lib/utils/cloudinary/cloudinary.types';
import { percentageFromNumber } from '~/lib/utils/number';

import { useImageProps } from './Image.hooks';
import styles from './Image.styles';
import { getMinimalQuery, getSrcset } from './Image.utils';

interface Props extends SiteImageExtended {
  altText: string;
  as?: ReactType;
  height?: string | number;
  src: string;
  width?: string | number;
}

function Image({
  altText,
  as = 'div',
  customStyles,
  responsive,
  height,
  loading = LOADING_OPTIONS.LAZY,
  src,
  srcSet,
  srcTransformationArgs,
  width,
  widths,
  ...rest
}: Props) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // If no srcsrt provided, then we try a few other things
  if (!srcSet) {
    // First, see if `srcTransformationArgs` is provided
    if (srcTransformationArgs) {
      srcSet = getSrcset(src, srcTransformationArgs);
    }
    // If not, see if widths are provided
    else if (widths) {
      const query: Record<string, Transformations> = {};

      widths.forEach((width) => {
        query[`${width}w`] = { width } as Transformations;
      });

      srcSet = getSrcset(src, query);
    }
    // Finally, fallback to a minimum width transformation
    else {
      const query = getMinimalQuery(width);
      srcSet = getSrcset(src, query);
    }
  }

  const { finalSrcSet, isLazy, sizes, finalSrc } = useImageProps({
    imgRef,
    loading,
    srcSet,
    width,
  });

  const isLazyAndNotLoaded = isLazy && !isLoaded;

  function handleImageLoad() {
    setIsLoaded(true);
  }

  // Use paddingBottom technique to create responsive container with correct size
  let ratio = 0;
  if (width && height && responsive) {
    const h: number =
      typeof height === 'string' ? parseInt(height, 10) : height;
    const w: number = typeof width === 'string' ? parseInt(width, 10) : width;

    ratio = percentageFromNumber(h, w);
  }

  const style: CSSStyles = {};

  if (ratio && responsive) {
    style.position = 'relative';
    style.paddingBottom = `${ratio}%`;
  }

  // Fixed approach
  if (width && !responsive) {
    style.width = `${width}px`;
  }

  if (height && !responsive) {
    style.height = `${height}px`;
  }

  const Container: ReactType = as;

  return (
    <Container
      ref={imgRef}
      css={[
        styles.root,
        isLazyAndNotLoaded && styles.placeholder,
        { ...style },
        customStyles,
      ]}
    >
      {finalSrcSet && (
        <img
          css={[
            styles.image,
            isLoaded && styles.isLoaded,
            ratio && responsive && styles.responsive,
          ]}
          sizes={sizes}
          src={finalSrc}
          srcSet={finalSrcSet}
          alt={altText}
          loading={loading}
          onLoad={handleImageLoad}
          {...rest}
        />
      )}
    </Container>
  );
}

export default Image;
