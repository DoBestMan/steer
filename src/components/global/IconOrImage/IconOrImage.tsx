import { IconOrImage as IconOrImageProps } from '~/data/models/IconOrImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import Icon from '../Icon/Icon';
import Image from '../Image/Image';

function IconOrImage(props: IconOrImageProps) {
  if (props.type === ICON_IMAGE_TYPE.ICON && 'svgId' in props) {
    const { svgId, type: _type, ...rest } = props;
    return <Icon name={svgId} {...rest} />;
  }

  const { src, altText, width, height, type: _type, ...rest } = props;

  return (
    <Image
      src={src}
      altText={altText}
      width={width}
      height={height}
      {...rest}
    />
  );
}

export default IconOrImage;
