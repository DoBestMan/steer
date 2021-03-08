import { useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ROUTE_MAP, ROUTES, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './TireSnapModal.styles';

interface Props {
  size: string;
}
function TireSnapSuccess({ size }: Props) {
  const [dotsNumber, setDotsNumber] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = ROUTE_MAP[
        ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY
      ].replace('[size]', size.replace('/', '-'));
    }, TIME.MS750);

    return () => clearTimeout(timer);
  }, [size]);

  useEffect(() => {
    const timer = setInterval(
      () => setDotsNumber((n) => (n + 1 > 3 ? 1 : n + 1)),
      TIME.MS500,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div css={styles.screenWrapper}>
      <div css={styles.screenContent}>
        <Icon name={ICONS.TIRE} css={styles.mainIcon} />
        <h2>
          {ui('simpleSnap.successScreen.title')}
          <br />
          <span css={styles.highlightedText}>{size}</span>
        </h2>
        <p>
          {ui('simpleSnap.successScreen.description')}
          <span css={styles.loadingDots}>
            {new Array(dotsNumber).fill(1).map((_e, i) => (
              <span key={i}>.</span>
            ))}
          </span>
        </p>
      </div>
    </div>
  );
}

export default TireSnapSuccess;
