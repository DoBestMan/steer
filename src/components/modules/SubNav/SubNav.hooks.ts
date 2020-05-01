import { useState } from 'react';

function useSelectCategory() {
  const [selectedLink, setSelectedLink] = useState('');
  return {
    handleSelectLink: (link: string) => () => {
      setSelectedLink(link);
    },
    onClearSelectedLink: () => {
      setSelectedLink('');
    },
    selectedLink,
  };
}

export default useSelectCategory;
