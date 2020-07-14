import { useEffect, useRef, useState } from 'react';

import Rain from './all/Rain';
import Snow from './all/Snow';
import Storm from './all/Storm/Storm';
import { WEATHERS } from './Weather.constants';
import { styles } from './Weather.styles';
import { Weathers } from './Weather.types';

type Props = {
  animate?: boolean;
  weatherID: Weathers | string | null;
};

interface Size {
  height: number;
  width: number;
}

function Weather({ weatherID, animate, ...rest }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elementSize, setElementSize] = useState<Size>({ height: 0, width: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef && containerRef.current && weatherID) {
        const bounds = containerRef.current.getBoundingClientRect();

        setElementSize({
          height: bounds.height,
          width: bounds.width,
        });
        return;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [weatherID]);

  return (
    <div css={styles.container} ref={containerRef} {...rest}>
      {elementSize.width > 0 && weatherID === WEATHERS.SNOWING && (
        <Snow
          width={elementSize.width}
          height={elementSize.height}
          animate={animate}
        />
      )}

      {elementSize.width > 0 && weatherID === WEATHERS.RAINING && (
        <Rain
          width={elementSize.width}
          height={elementSize.height}
          animate={animate}
        />
      )}

      {elementSize.width > 0 && weatherID === WEATHERS.STORMING && (
        <Storm
          width={elementSize.width}
          height={elementSize.height}
          animate={animate}
        />
      )}
    </div>
  );
}

export default Weather;
