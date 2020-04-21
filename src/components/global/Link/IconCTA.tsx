import { LinkProps } from './Link';

import styles, { iconCTA } from './Link.styles';

import BaseLink from './BaseLink';

import { LINK_SIZE, LINK_THEME, LINK_WEIGHT } from '~/lib/constants';
import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';

interface Props extends Pick<LinkProps, 'theme' | 'href' | 'children'> {
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
        css={[
          styles.root,
          styles[theme],
          styles[LINK_SIZE.REG],
          styles[LINK_WEIGHT.BOLD],
        ]}
        {...rest}
      >
        <Icon name={icon} css={iconCTA.icon} />
        <span css={styles.link}>{children}</span>
      </BaseLink>
    </div>
  );
}

export default IconLink;
