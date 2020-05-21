import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import { LINK_THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import BaseLink from './BaseLink';
import { AnchorProps } from './Link';
import styles, { iconCTA } from './Link.styles';

interface Props extends Pick<AnchorProps, 'theme' | 'href' | 'children'> {
  icon: IconType;
}
function IconLink({
  children,
  href,
  icon,
  theme = LINK_THEME.DARK,
  ...rest
}: Props) {
  return (
    <div css={iconCTA.root}>
      <BaseLink
        href={href}
        css={[typography.primarySubhead, styles.root, styles[theme]]}
        {...rest}
      >
        <Icon name={icon} css={iconCTA.icon} />
        <span css={styles.link}>{children}</span>
      </BaseLink>
    </div>
  );
}

export default IconLink;
