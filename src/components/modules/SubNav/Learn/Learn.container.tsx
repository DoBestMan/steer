import { useNavContext } from '~/context/Nav.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

import Learn, { LearnProps } from './Learn';

type Props = Pick<LearnProps, 'siteMenuLearn' | 'isMobile' | 'isOpen'>;

function LearnContainer({ isMobile, isOpen, siteMenuLearn }: Props) {
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();
  const { handleClearLink, handleCloseSubNav } = useNavContext();
  return (
    <Learn
      customerServiceNumber={customerServiceNumber}
      isCustomerServiceEnabled={customerServiceEnabled}
      siteMenuLearn={siteMenuLearn}
      isOpen={isOpen}
      isMobile={isMobile}
      handleClearLink={handleClearLink}
      handleCloseSubNav={handleCloseSubNav}
    />
  );
}
export default LearnContainer;
