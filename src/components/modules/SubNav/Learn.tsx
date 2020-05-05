import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';

import SubNavContentWrapper from './SubNavContentWrapper';

interface Props {
  onClearSelectedLink: () => void;
  selectedLink: string;
  siteMenuLearn: SiteMenuLearn;
}

function Learn({ onClearSelectedLink, selectedLink, siteMenuLearn }: Props) {
  if (selectedLink !== 'Learn') {
    return null;
  }
  return (
    <SubNavContentWrapper
      isOpen={selectedLink === 'Learn'}
      onClose={onClearSelectedLink}
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
