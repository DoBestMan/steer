import { Icon } from '~/components/global/Icon/Icon.types';
import Link from '~/components/global/Link/FooterLink';
import { LINK_ICON_POSITION } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import styles from './FooterLinkList.styles';

interface Link {
  action: string;
  icon?: Icon;
  text: string;
}

interface Props {
  links: Link[];
}

function FooterLinkList(props: Props) {
  const { links } = props;

  return (
    <ul>
      {links.map((item: Link) => {
        const { action, icon, text } = item;
        return (
          <li css={styles.listItem} key={text}>
            <Link
              css={typography.smallCopy}
              href={action}
              icon={icon}
              iconPosition={LINK_ICON_POSITION.LEFT}
            >
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default FooterLinkList;
