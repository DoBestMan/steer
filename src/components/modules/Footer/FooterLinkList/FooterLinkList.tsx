import { Icon } from '~/components/global/Icon/Icon.types';
import Link from '~/components/global/Link/FooterLink';
import { LINK_ICON_POSITION } from '~/lib/constants';

import styles from './FooterLinkList.styles';

interface Link {
  action: string;
  icon?: Icon;
  isExternal?: boolean;
  text: string;
}

interface Props {
  links: Link[];
}

function FooterLinkList(props: Props) {
  const { links } = props;

  return (
    <ul css={styles.list}>
      {links.map((item: Link) => {
        const { action, icon, isExternal, text } = item;
        return (
          <li className="listItem" key={text}>
            <Link
              href={action}
              icon={icon}
              iconPosition={LINK_ICON_POSITION.LEFT}
              isExternal={isExternal}
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
