import styles from './FooterLinkList.styles';

import Link from '~/components/global/Link/FooterLink';
import { LINK_ICON_POSITION, LINK_SIZE } from '~/lib/constants';
import { Icon } from '~/components/global/Icon/Icon.types';

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
              href={action}
              icon={icon}
              iconPosition={LINK_ICON_POSITION.LEFT}
              size={LINK_SIZE.SM}
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
