import { useNavContext } from '~/context/Nav.context';

import Learn, { LearnProps } from './Learn';

type Props = Pick<LearnProps, 'isCustomerServiceEnabled' | 'siteMenuLearn'>;

function LearnContainer({ isCustomerServiceEnabled, siteMenuLearn }: Props) {
  const { handleClearLink, handleCloseSubNav } = useNavContext();
  return (
    <Learn
      isCustomerServiceEnabled={isCustomerServiceEnabled}
      siteMenuLearn={siteMenuLearn}
      handleClearLink={handleClearLink}
      handleCloseSubNav={handleCloseSubNav}
    />
  );
}
export default LearnContainer;
