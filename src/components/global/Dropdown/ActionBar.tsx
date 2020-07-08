import Button from '~/components/global/Button/Button';

import styles from './ActionBar.styles';

export interface ActionBarProps {
  onClickPrimary: () => void;
  onClickSecondary?: () => void;
  primaryLabel: string;
  secondaryLabel?: string;
}

function ActionBar({
  primaryLabel,
  onClickPrimary,
  secondaryLabel,
  onClickSecondary,
}: ActionBarProps) {
  return (
    <div css={styles.root}>
      {secondaryLabel && (
        <button type="button" css={styles.secondary} onClick={onClickSecondary}>
          {secondaryLabel}
        </button>
      )}
      <Button css={styles.primary} onClick={onClickPrimary}>
        {primaryLabel}
      </Button>
    </div>
  );
}

export default ActionBar;
