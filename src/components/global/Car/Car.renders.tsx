import { useEffect, useState } from 'react';
import SVGInline from 'react-svg-inline';

import { Cars } from './Car.types';

type Cache = {
  [key: string]: string;
};

const cache: Cache = {};

type Props = {
  id: Cars | string;
};

function RenderCar(props: Props) {
  const { id } = props;
  const [SVGString, setSVGString] = useState<string | null>(null);

  // Load SVG sa text files, store the content in cache
  useEffect(() => {
    if (cache[id]) {
      setSVGString(cache[id]);
      return;
    }

    let didCancel = false;
    const url = `/static/assets/cars/${id}.svg`;

    const getSVG = async () => {
      const data = await fetch(url)
        .then((response) => response.text())
        .then((data) => data);

      // cache data
      cache[id] = data;

      !didCancel && setSVGString(data);
    };

    getSVG();

    return () => {
      didCancel = true;
    };
  }, [id]);

  if (SVGString) {
    return <SVGInline svg={SVGString}></SVGInline>;
  }

  return null;
}

export default RenderCar;
