import GridItem from '~/components/global/Grid/GridItem';
import BaseLink from '~/components/global/Link/BaseLink';
import { generateAccountLinks } from '~/components/modules/Nav/mappers/links';
import { useNavContext } from '~/context/Nav.context';
import { ui } from '~/lib/utils/ui-dictionary';
import { layout } from '~/styles/layout.styles';
import { typography } from '~/styles/typography.styles';

import { useAccountContext } from '../../Account/Account.context';
import SubNavContentWrapper from '../SubNavContentWrapper';
import styles from './Account.styles';

export interface Props {
  isOpen: boolean;
}

function Account({ isOpen }: Props) {
  const { handleCloseSubNav } = useNavContext();
  const accountLinks = generateAccountLinks();
  const { handleLogout } = useAccountContext();

  const handleLinkClick = (linkName: string) => {
    if (linkName === ui('links.logout')) {
      handleLogout();
      return;
    }
  };

  return (
    <SubNavContentWrapper
      onClose={handleCloseSubNav}
      isOpen={isOpen}
      contentLabel={ui('links.account')}
    >
      <GridItem css={layout.hideOnSmall}>
        <ul css={styles.list}>
          {accountLinks.map(({ href, isExternal, text }) => (
            <li css={[typography.primaryHeadline, styles.linkItem]} key={text}>
              <BaseLink
                css={styles.link}
                href={href}
                isExternal={isExternal}
                onClick={() => handleLinkClick(text)}
              >
                {text}
              </BaseLink>
            </li>
          ))}
        </ul>
      </GridItem>
    </SubNavContentWrapper>
  );
}
export default Account;
