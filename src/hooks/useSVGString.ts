import { useEffect, useState } from 'react';

/**
 *
 * @param url : cloudianry or local svg file
 * @returns svg string to be used in SVGInline
 */

function useSVGString(url: string) {
  const [SVGString, setSVGString] = useState<string | null>(null);
  useEffect(() => {
    if (SVGString) {
      return;
    }

    const getSVG = async () => {
      const data = await fetch(url)
        .then((response) => response.text())
        .then((data) => data);

      setSVGString(data);
    };

    getSVG();
  }, [SVGString, url]);

  return SVGString;
}

export default useSVGString;
