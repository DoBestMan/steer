import { CSSObject } from '@emotion/core';
import { ReactType, useRef, useState } from 'react';

import { Loading, LOADING_OPTIONS } from '~/lib/constants';
import { percentageFromNumber } from '~/lib/utils/number';

import { useImageProps } from './Image.hooks';
import styles from './Image.styles';

interface Props {
  altText: string;
  as?: ReactType;
  height?: string | number;
  loading?: Loading;
  responsive?: boolean;
  srcSet?: string;
  width?: string | number;
}

function Image({
  altText,
  as = 'div',
  responsive,
  height,
  loading = LOADING_OPTIONS.LAZY,
  srcSet = '', // TODO: to remove when `src` is mandatory on final endpoints
  width,
  ...rest
}: Props) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { finalSrcSet, isLazy, sizes, src } = useImageProps({
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

  const style: CSSObject = {};

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
          src={src}
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
