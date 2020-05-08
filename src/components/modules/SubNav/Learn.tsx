import { useNavContext } from '~/context/Nav.context';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { ui } from '~/lib/utils/ui-dictionary';

import SubNavContentWrapper from './SubNavContentWrapper';

interface Props {
  siteMenuLearn: SiteMenuLearn;
}

function Learn({ siteMenuLearn }: Props) {
  const { handleClearLink, handleCloseSubNav } = useNavContext();
  return (
    <SubNavContentWrapper
      isOpen
      contentLabel={ui('nav.learn.contentLabel')}
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
