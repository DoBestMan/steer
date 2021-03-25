import { useEffect, useState } from 'react';

import { CSSStylesProp } from '~/lib/constants';

import styles from './HorizontalNumberPicker.styles';

interface Props {
  customCarouselStyles?: CSSStylesProp;
  customContainerStyles?: CSSStylesProp;
  initialIndex?: number;
  numbers: number[];
  onSelect?: (value: number, index: number) => void;
  subTitle?: string | JSX.Element;
  title: string;
}

function HorizontalNumberPickerWithControls({
  customCarouselStyles,
  customContainerStyles,
  numbers,
  initialIndex,
  onSelect,
  subTitle,
  title,
  ...rest
}: Props) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(
    initialIndex === undefined ? -1 : initialIndex,
  );
  useEffect(() => {
    if (initialIndex === undefined) {
      return;
    }
    setSelectedItemIndex(initialIndex === undefined ? -1 : initialIndex);
  }, [numbers, initialIndex]);

  useEffect(() => {
    if (onSelect) {
      onSelect(numbers[selectedItemIndex], selectedItemIndex);
    }
  }, [numbers, onSelect, selectedItemIndex]);

  const increment = () => {
    if (selectedItemIndex < numbers.length - 1) {
      setSelectedItemIndex(selectedItemIndex + 1);
    }
  };

  const decrement = () => {
    if (selectedItemIndex > 0) {
      setSelectedItemIndex(selectedItemIndex - 1);
    }
  };

  const value = selectedItemIndex + 1;

  return (
    <div css={customContainerStyles} {...rest}>
      <div css={styles.header}>
        <h3 css={styles.title}>{title}</h3>

        {subTitle && <span css={styles.subTitle}>{subTitle}</span>}
      </div>

      <div css={customCarouselStyles}>
        <button css={styles.quantityButton} onClick={decrement}>
          -
        </button>
        <div css={styles.quantityNumber}>{value}</div>
        <button css={styles.quantityButton} onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
}

export default HorizontalNumberPickerWithControls;
