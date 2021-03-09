import { ReactType, useRef, useState } from 'react';

import Link from '~/components/global/Link/Link';
import { SiteImageExtended } from '~/data/models/SiteImageExtended';
import { SiteLink } from '~/data/models/SiteLink';
import { CSSStylesProp, LOADING_OPTIONS } from '~/lib/constants';
import { Transformations } from '~/lib/utils/cloudinary/cloudinary.types';
import { percentageFromNumber } from '~/lib/utils/number';

import { useImageProps } from './Image.hooks';
import styles from './Image.styles';
import { getMinimalQuery, getSrcset } from './Image.utils';

export interface ImageProps extends SiteImageExtended {
  altText: string;
  as?: ReactType;
  height?: string | number;
  link?: SiteLink;
  noPlaceholder?: boolean;
  onError?: () => void;
  onLoad?: () => void;
  src: string;
  width?: string | number;
}

function Image({
  altText,
  as = 'div',
  customContainerStyles,
  responsive,
  height,
  loading = LOADING_OPTIONS.LAZY,
  onError,
  onLoad,
  src,
  srcSet,
  srcTransformationArgs,
  width,
  widths,
  link,
  noPlaceholder,
  ...rest
}: ImageProps) {
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

    if (onLoad) {
      onLoad();
    }
  }

  // Use paddingBottom technique to create responsive container with correct size
  let ratio = 0;
  if (width && height && responsive) {
    const h: number =
      typeof height === 'string' ? parseInt(height, 10) : height;
    const w: number = typeof width === 'string' ? parseInt(width, 10) : width;

    ratio = percentageFromNumber(h, w);
  }

  const style: CSSStylesProp = {};

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

  function ImageTag() {
    return (
      <img
        css={[
          styles.image,
          (isLoaded || loading === LOADING_OPTIONS.EAGER) && styles.isLoaded,
          ratio && responsive && styles.responsive,
        ]}
        onError={onError}
        sizes={sizes ? sizes : undefined}
        src={finalSrc ? finalSrc : src}
        srcSet={finalSrcSet ? finalSrcSet : (srcSet as string)}
        alt={altText}
        loading={loading}
        onLoad={handleImageLoad}
        {...rest}
      />
    );
  }
  return (
    <Container
      ref={imgRef}
      css={[
        styles.root,
        isLazyAndNotLoaded && !noPlaceholder && styles.placeholder,
        { ...style },
        customContainerStyles,
      ]}
    >
      {finalSrcSet ? (
        link ? (
          <>
            <Link {...link}>
              <ImageTag />
            </Link>
          </>
        ) : (
          <ImageTag />
        )
      ) : link ? (
        <>
          <Link {...link}>
            <ImageTag />
          </Link>
        </>
      ) : (
        <ImageTag />
      )}
    </Container>
  );
}

export default Image;
