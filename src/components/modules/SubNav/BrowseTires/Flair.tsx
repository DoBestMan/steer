import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import { FlairType } from '~/data/models/SiteMenuBrowseGroupItem';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { typography } from '~/styles/typography.styles';

import styles from './BrowseTires.styles';

function Flair(props: FlairType) {
  if (
    props.type === ICON_IMAGE_TYPE.ICON ||
    props.type === ICON_IMAGE_TYPE.IMAGE
  ) {
    return <IconOrImage css={[styles.flair, styles.flairIcon]} {...props} />;
  }

  if ('value' in props) {
    return (
      <div css={styles.flairSeparator}>
        <p css={[typography.secondarySubhead, styles.flair]}>{props.value}</p>
      </div>
    );
  }

  return null;
}

export default Flair;
