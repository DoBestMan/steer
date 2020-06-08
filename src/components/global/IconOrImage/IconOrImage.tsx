import { IconOrImage as Props } from '~/data/models/IconOrImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import Icon from '../Icon/Icon';
import Image from '../Image/Image';
import { getMinimalQuery, getSrcset } from '../Image/Image.utils';

function IconOrImage(props: Props) {
  if (props.type === ICON_IMAGE_TYPE.ICON) {
    const { svgId, type: _type, ...rest } = props;
    return <Icon name={svgId} {...rest} />;
  }

  const { src, altText, width, height, type: _type, ...rest } = props;

  // If only a src provided (direct from data) and no srcSet,
  // we can build the minimal srcSet using the getSrcset() function + getMinimalQuery()
  let srcSet = props.srcSet;
  if (src) {
    const query = getMinimalQuery(width);
    srcSet = getSrcset(src, query);
  }

  return (
    <Image
      srcSet={srcSet}
      altText={altText}
      width={width}
      height={height}
      {...rest}
    />
  );
}

export default IconOrImage;
