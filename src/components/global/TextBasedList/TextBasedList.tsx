import Link from '~/components/global/Link/Link';
import styles from '~/components/global/TextBasedList/TextBasedList.styles';
import { TextBasedNavigationProps } from '~/data/models/TextBasedNavigationProps';
import { THEME } from '~/lib/constants';
import { isBrowser } from '~/lib/utils/browser';

function TextBasedList({ links, moreLink }: TextBasedNavigationProps) {
  const handleClick = (e: { preventDefault: () => void }, href: string) => {
    if (!window || !isBrowser()) {
      return;
    }
    const [path, hash] = href.split('#');
    if (path === window.location.pathname) {
      const targetElm = document.getElementById(hash);
      if (targetElm) {
        e.preventDefault();
        window.scroll({
          top: targetElm.offsetTop,
          behavior: 'smooth',
        });
        window.history.pushState('', '', href);
      }
    }
  };

  return (
    <div>
      <ul css={styles.list}>
        {links.map((item) => (
          <li key={item.label} css={styles.listItem}>
            <span>
              <Link
                theme={THEME.LIGHT}
                href={item.link.href}
                onClick={(e) => handleClick(e, item.link.href)}
              >
                {item.label}
              </Link>
            </span>
          </li>
        ))}
        {moreLink && (
          <li css={[styles.listItem, styles.moreLinkCustom]}>
            <Link theme={THEME.LIGHT} href={moreLink.link.href}>
              <strong>{moreLink.label}</strong>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default TextBasedList;
