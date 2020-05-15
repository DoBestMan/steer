import { useNavContext } from '~/context/Nav.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

import Learn, { LearnProps } from './Learn';

type Props = Pick<LearnProps, 'siteMenuLearn' | 'isMobile'>;

function LearnContainer({ isMobile, siteMenuLearn }: Props) {
  const { customerServiceEnabled } = useSiteGlobalsContext();
  const { handleClearLink, handleCloseSubNav } = useNavContext();
  return (
    <Learn
      isCustomerServiceEnabled={customerServiceEnabled}
      siteMenuLearn={siteMenuLearn}
      isMobile={isMobile}
      handleClearLink={handleClearLink}
      handleCloseSubNav={handleCloseSubNav}
    />
  );
}
export default LearnContainer;
