import { ReactChild } from 'react';

import styles from './FooterCTA.styles';

import BaseLink from '~/components/global/Link/BaseLink';
import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';

interface Props {
  children: ReactChild;
  href: string;
  icon: IconType;
}

function FooterCTA(props: Props) {
  const { children, href, icon, ...rest } = props;

  return (
    <BaseLink href={href} css={styles.cta} {...rest}>
      <Icon name={icon} css={styles.circle}></Icon>
      <span css={styles.text}>{children}</span>
    </BaseLink>
  );
}

export default FooterCTA;
