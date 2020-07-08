import { useEffect, useState } from 'react';

import { CSSStyles } from '~/lib/constants';

import styles from './HorizontalNumberPicker.styles';

interface Props {
  customContainerStyles?: CSSStyles;
  numbers: (number | string)[];
  onSelect?: (value: number | string, index: number) => void;
  selectedIndex?: number;
  subTitle?: string | JSX.Element;
  title: string;
}

function HorizontalPickerNoCarousel({
  customContainerStyles,
  numbers,
  onSelect,
  selectedIndex,
  subTitle,
  title,
}: Props) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

  useEffect(() => {
    if (selectedIndex === undefined) {
      return;
    }

    setSelectedItemIndex(selectedIndex);
  }, [numbers, selectedIndex]);

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
