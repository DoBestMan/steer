import { useEffect, useState } from 'react';

import Image from '~/components/global/Image/Image';
import Markdown from '~/components/global/Markdown/Markdown';
import { TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './TireSnapModal.styles';

function TireSnapLoading() {
  const [dotsNumber, setDotsNumber] = useState(3);

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
        <div css={styles.mainIcon}>
          <Image
            altText={ui('simpleSnap.loadingScreen.image.alt')}
            src={ui('simpleSnap.loadingScreen.image.src')}
            width={168}
            css={styles.loadingWheel}
          />
        </div>
        <h2>
          <Markdown isEditorial>
            {ui('simpleSnap.loadingScreen.title')}
          </Markdown>
        </h2>
        <p>
          {ui('simpleSnap.loadingScreen.description')}
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

export default TireSnapLoading;
