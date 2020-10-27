import Car from '~/components/global/Car/Car';
import Icon from '~/components/global/Icon/Icon';
import { SiteCar } from '~/data/models/SiteCar';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import styles from './IconWithTitle.styles';

interface Props {
  data: SiteSearchResultTextItem;
  handleClick: (data: SiteSearchResultTextItem) => void;
  image: SiteIcon | SiteCar;
  title: string;
}

function IconWithTitle({ image, title, data, handleClick }: Props) {
  const handleOnClick = () => {
    handleClick(data);
  };

  return (
    <div css={styles.root} onClick={handleOnClick}>
      <div css={styles.circle}>
        {image && image.type === ICON_IMAGE_TYPE.CAR && (
          <div css={styles.carWrapper}>
            <Car carId={image.vehicleType} css={styles.car} />
          </div>
        )}
        {image && image.type === ICON_IMAGE_TYPE.ICON && (
          <div css={styles.icon}>
            <Icon name={image.svgId} />
          </div>
        )}
      </div>
      <p css={styles.subTitle}>{title}</p>
    </div>
  );
}

export default IconWithTitle;
