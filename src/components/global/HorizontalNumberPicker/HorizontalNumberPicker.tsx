import { useEffect, useState } from 'react';

import Carousel from '~/components/global/Carousel/Carousel';
import { CSSStyles } from '~/lib/constants';

import styles from './HorizontalNumberPicker.styles';

interface Props {
  customCarouselStyles?: CSSStyles;
  customContainerStyles?: CSSStyles;
  initialIndex?: number;
  numbers: number[];
  onSelect?: (value: number, index: number) => void;
  subTitle?: string | JSX.Element;
  title: string;
}

function HorizontalNumberPicker({
  customCarouselStyles,
  customContainerStyles,
  numbers,
  initialIndex,
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

  useEffect(() => {
    if (onSelect) {
      onSelect(numbers[selectedItemIndex], selectedItemIndex);
    }
  }, [numbers, onSelect, selectedItemIndex]);

  const handleClick = (index: number) => () => {
    setSelectedItemIndex(index);
  };

  return (
    <div css={customContainerStyles}>
      <div css={styles.header}>
        <h3 css={styles.title}>{title}</h3>

        {subTitle && <span css={styles.subTitle}>{subTitle}</span>}
      </div>

      <div css={customCarouselStyles}>
        <Carousel activeSlide={selectedItemIndex} centerActiveSlide>
          {numbers.map((value, index) => (
            <button
              css={styles.numberItem}
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
        </Carousel>
      </div>
    </div>
  );
}

export default HorizontalNumberPicker;
