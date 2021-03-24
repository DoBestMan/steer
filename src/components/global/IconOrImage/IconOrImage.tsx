import { IconOrImage as IconOrImageProps } from '~/data/models/IconOrImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { LOADING_OPTIONS } from '~/lib/constants/image';

import Icon from '../Icon/Icon';
import Image from '../Image/Image';

function IconOrImage(props: IconOrImageProps) {
  if (props.type === ICON_IMAGE_TYPE.ICON) {
    const { svgId, type: _type, ...rest } = props;
    return <Icon name={svgId} ssr={props.ssr} {...rest} />;
  }

  const { src, altText, width, height, type: _type, ssr, ...rest } = props;

  return (
    <Image
      src={src}
      altText={altText}
      width={width}
      height={height}
      loading={ssr ? LOADING_OPTIONS.EAGER : LOADING_OPTIONS.LAZY}
      {...rest}
    />
  );
}

export default IconOrImage;
