import { ReactNode } from 'react';

import Button from '~/components/global/Button/Button';

import styles from './ActionBar.styles';

export interface ActionBarProps {
  isDisabled?: boolean;
  onClickPrimary: () => void;
  onClickSecondary?: () => void;
  primaryLabel: string | ReactNode;
  secondaryLabel?: string;
}

function ActionBar({
  isDisabled = false,
  primaryLabel,
  onClickPrimary,
  secondaryLabel,
  onClickSecondary,
}: ActionBarProps) {
  return (
    <div css={styles.root}>
      {secondaryLabel && (
        <button
          type="button"
          css={[styles.secondary, isDisabled && styles.disabled]}
          onClick={onClickSecondary}
        >
          {secondaryLabel}
        </button>
      )}
      <Button
        isDisabled={isDisabled}
        css={styles.primary}
        onClick={onClickPrimary}
      >
        {primaryLabel}
      </Button>
    </div>
  );
}

export default ActionBar;
