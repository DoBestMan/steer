import { useNavState } from '~/components/global/Nav/Nav.container';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';

import SubNavContentWrapper from './SubNavContentWrapper';

interface Props {
  siteMenuLearn: SiteMenuLearn;
}

function Learn({ siteMenuLearn }: Props) {
  const { handleClearLink, handleCloseSubNav } = useNavState();
  return (
    <SubNavContentWrapper
      isOpen
      onBack={handleClearLink}
      onClose={handleCloseSubNav}
    >
      <ul>
        {siteMenuLearn.list.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>
    </SubNavContentWrapper>
  );
}
export default Learn;
