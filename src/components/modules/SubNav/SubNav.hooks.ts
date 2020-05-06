import { useState } from 'react';

function useSelectCategory() {
  const [selectedLink, setSelectedLink] = useState('');
  return {
    createSelectLinkHandler: (link: string) => () => {
      setSelectedLink(link);
    },
    onClearSelectedLink: () => {
      setSelectedLink('');
    },
    selectedLink,
  };
}

export default useSelectCategory;
