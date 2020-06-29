import styles from './TitleSelectorLabel.styles';

interface Props {
  count?: number | null;
  description?: string | null;
  flair?: string | null;
  isDisabled?: boolean;
  label: string;
}

export default function TitleSelectorLabel({
  isDisabled,
  count = null,
  description,
  flair,
  label,
}: Props) {
  return (
    <span css={isDisabled && styles.disabled}>
      <span css={styles.containerLabel}>
        <p css={styles.label}>{label}</p>
        <span css={styles.tags}>
          {count !== null && <p css={styles.count}>({count})</p>}
          {flair && <p css={styles.flair}>{flair}</p>}
        </span>
      </span>
      {description && <p css={styles.description}>{description}</p>}
    </span>
  );
}
