import Link from '~/components/global/Link/Link';
import { SiteLink } from '~/data/models/SiteLink';
import { THEME } from '~/lib/constants';

import styles from './LinkList.styles';

export interface LinkListProps {
  links: Array<{
    label: string;
    link: SiteLink;
  }>;
  title?: string;
}

function LinkList({ links, title }: LinkListProps) {
  if (!title && !links.length) {
    return null;
  }

  return (
    <div>
      {title && <p css={styles.title}>{title}</p>}
      {links.length && (
        <div css={styles.list}>
          {links.map((link) => (
            <Link
              theme={THEME.LIGHT}
              href={link.link.href}
              css={styles.link}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default LinkList;
