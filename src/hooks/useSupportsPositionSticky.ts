import { useEffect, useState } from 'react';

function browserSupportsPositionSticky() {
  const prop = 'position:';
  const value = 'sticky';
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

  const element = document.createElement('a');
  const elementStyle = element.style;
  elementStyle.cssText =
    prop + prefixes.join(`${value};${prop}`).slice(0, -prop.length);

  return elementStyle.position.indexOf(value) !== -1;
}

export function useSupportsPositionSticky() {
  const [supportsPositionSticky, setSupportsPositionSticky] = useState(true);
  useEffect(() => {
    setSupportsPositionSticky(browserSupportsPositionSticky());
  }, []);
  return {
    supportsPositionSticky,
  };
}
