import { useEffect, useState } from 'react';

const useMobileOrTablet = () => {
  const [value, setValue] = useState(false);

  //need to make sure it is working on broswer
  useEffect(() => {
    const isMobileOrTablet =
      (typeof window !== 'undefined' &&
        typeof window.orientation !== 'undefined') ||
      !!navigator.userAgent.match(/IEMobile/) ||
      !!navigator.userAgent.match(/Android/i) ||
      !!navigator.userAgent.match(/webOS/i) ||
      !!navigator.userAgent.match(/iPhone/i) ||
      !!navigator.userAgent.match(/iPad/i) ||
      !!navigator.userAgent.match(/iPod/i) ||
      !!navigator.userAgent.match(/BlackBerry/i);
    setValue(isMobileOrTablet);
  }, []);

  return value;
};

export default useMobileOrTablet;
