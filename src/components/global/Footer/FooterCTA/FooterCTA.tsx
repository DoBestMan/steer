import { ReactChild } from 'react';
import NextLink from 'next/link';

import styles from './FooterCTA.styles';

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
    <NextLink href={href} passHref>
      <a css={styles.cta} {...rest}>
        <Icon name={icon} css={styles.circle}></Icon>
        <span css={styles.text}>{children}</span>
      </a>
    </NextLink>
  );
}

export default FooterCTA;
