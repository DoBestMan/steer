import { useRef, useState } from 'react';

import { Loading, LOADING_OPTIONS } from '~/lib/constants';

import { useLazyImage } from './Image.hooks';
import styles from './Image.styles';

interface Props {
  altText: string;
  height?: string;
  loading?: Loading;
  srcSet: string;
  width?: string;
}

// TODO Responsive images - https://simpletire.atlassian.net/browse/WCS-183
function Image({
  altText,
  height,
  loading = LOADING_OPTIONS.LAZY,
  srcSet,
  width,
  ...rest
}: Props) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { finalSrcSet, isLazy } = useLazyImage({
    imgRef,
    loading,
    srcSet,
  });

  const isLazyAndNotLoaded = isLazy && !isLoaded;

  function handleImageLoad() {
    setIsLoaded(true);
  }
  return (
    <div
      ref={imgRef}
      css={[
        styles.root,
        isLazyAndNotLoaded && styles.placeholder,
        { height: `${height}px`, width: `${width}px` },
      ]}
    >
      {finalSrcSet && (
        <img
          css={[styles.image, isLoaded && styles.isLoaded]}
          src={finalSrcSet}
          srcSet={finalSrcSet}
          alt={altText}
          height={height}
          width={width}
          loading={loading}
          onLoad={handleImageLoad}
          {...rest}
        />
      )}
    </div>
  );
}

export default Image;
