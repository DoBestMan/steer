import { CSSObject } from '@emotion/core';
import { useEffect, useState } from 'react';

import Carousel from '~/components/global/Carousel/Carousel';

import styles from './HorizontalNumberPicker.styles';

interface Props {
  customCarouselStyles?: CSSObject;
  customContainerStyles?: CSSObject;
  numbers: number[];
  onSelect?: (value: number, index: number) => void;
  selectedIndex?: number;
  subTitle?: string | JSX.Element;
  title: string;
}

function HorizontalNumberPicker({
  customCarouselStyles,
  customContainerStyles,
  numbers,
  onSelect,
  selectedIndex,
  subTitle,
  title,
}: Props) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

  useEffect(() => {
    if (onSelect) {
      onSelect(numbers[selectedItemIndex], selectedItemIndex);
    }
  }, [numbers, onSelect, selectedItemIndex]);

  useEffect(() => {
    if (selectedIndex === undefined) {
      return;
    }

    setSelectedItemIndex(selectedIndex);
  }, [numbers, selectedIndex]);

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
