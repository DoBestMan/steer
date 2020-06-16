import { css } from '@emotion/core';
import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import { COLORS, SPACING, THEME, TIME } from '~/lib/constants';

import Loading from './Loading';

const styles = {
  buttonContainer: css({
    transition: `all ${TIME.MS350}ms ease-in-out`,
  }),
  buttonHidden: css({
    opacity: 0,
    visibility: 'hidden',
  }),
  container: css({
    padding: SPACING.SIZE_20,
    position: 'relative',
    textAlign: 'center',
  }),
  interactionContainer: css({
    position: 'relative',
    textAlign: 'center',
  }),
  loading: css({
    left: 0,
    margin: '0 auto',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  orangeContainer: css({
    background: COLORS.GLOBAL.ORANGE,
  }),
};

export default {
  component: Loading,
  title: 'Global/Loading',
};

export function LoadingDots() {
  return (
    <>
      <div css={styles.container}>
        <Loading />
      </div>
      <div css={[styles.container, styles.orangeContainer]}>
        <Loading theme={THEME.DARK} />
      </div>
    </>
  );
}

export function LoadingHide() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div css={styles.interactionContainer}>
      {isLoading && <Loading customStyles={styles.loading} />}

      <div css={[styles.buttonContainer, isLoading && styles.buttonHidden]}>
        <Button onClick={handleClick}>Click Me</Button>
      </div>
    </div>
  );
}

export function LoadingHideAndShow() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div css={styles.interactionContainer}>
      {isLoading && <Loading customStyles={styles.loading} />}

      <div css={[styles.buttonContainer, isLoading && styles.buttonHidden]}>
        <Button onClick={handleClick}>Click Me</Button>
      </div>
    </div>
  );
}
