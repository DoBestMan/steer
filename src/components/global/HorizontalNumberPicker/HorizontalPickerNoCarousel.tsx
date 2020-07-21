import { useEffect, useState } from 'react';

import { CSSStyles } from '~/lib/constants';

import styles from './HorizontalNumberPicker.styles';

interface Props {
  customContainerStyles?: CSSStyles;
  initialIndex?: number;
  numbers: (number | string)[];
  onSelect?: (value: number | string, index: number) => void;
  subTitle?: string | JSX.Element;
  title: string;
}

function HorizontalPickerNoCarousel({
  customContainerStyles,
  initialIndex,
  numbers,
  onSelect,
  subTitle,
  title,
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

  const handleClick = (index: number) => () => {
    setSelectedItemIndex(index);
    if (onSelect) {
      onSelect(numbers[index], index);
    }
  };

  return (
    <div css={customContainerStyles}>
      <div css={styles.header}>
        <h3 css={styles.title}>{title}</h3>

        {subTitle && <span css={styles.subTitle}>{subTitle}</span>}
      </div>
      <div>
        {numbers.map((value, index) => (
          <button
            css={styles.numberItemNoCarousel}
            onClick={handleClick(index)}
            key={index}
          >
            <span
              css={[
                styles.innerItem,
                selectedItemIndex === index && styles.selectedItem,
              ]}
            >
              {value}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default HorizontalPickerNoCarousel;
