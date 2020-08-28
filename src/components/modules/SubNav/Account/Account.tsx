import GridItem from '~/components/global/Grid/GridItem';
import BaseLink from '~/components/global/Link/BaseLink';
import { accountLinks } from '~/components/modules/Nav/mappers/links';
import { useNavContext } from '~/context/Nav.context';
import { ui } from '~/lib/utils/ui-dictionary';
import { layout } from '~/styles/layout.styles';
import { typography } from '~/styles/typography.styles';

import SubNavContentWrapper from '../SubNavContentWrapper';
import styles from './Account.styles';

export interface Props {
  isOpen: boolean;
}

function Account({ isOpen }: Props) {
  const { handleCloseSubNav } = useNavContext();
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
              <BaseLink css={styles.link} href={href} isExternal={isExternal}>
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
