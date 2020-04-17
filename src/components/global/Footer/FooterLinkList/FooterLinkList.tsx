import styles from './FooterLinkList.styles';

import Link from '~/components/global/Link/FooterLink';
import { LSize } from '~/lib/constants';

interface Link {
  action: string;
  icon?: string;
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
        const { action, text } = item;
        return (
          <li css={styles.listItem} key={text}>
            <Link size={LSize.SM} href={action}>
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default FooterLinkList;
