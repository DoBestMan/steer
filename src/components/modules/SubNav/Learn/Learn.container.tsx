import { useNavContext } from '~/context/Nav.context';

import Learn, { LearnProps } from './Learn';

type Props = Pick<
  LearnProps,
  'isCustomerServiceEnabled' | 'siteMenuLearn' | 'isMobile'
>;

function LearnContainer({
  isCustomerServiceEnabled,
  isMobile,
  siteMenuLearn,
}: Props) {
  const { handleClearLink, handleCloseSubNav } = useNavContext();
  return (
    <Learn
      isCustomerServiceEnabled={isCustomerServiceEnabled}
      siteMenuLearn={siteMenuLearn}
      isMobile={isMobile}
      handleClearLink={handleClearLink}
      handleCloseSubNav={handleCloseSubNav}
    />
  );
}
export default LearnContainer;
