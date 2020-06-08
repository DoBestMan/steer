import { CSSObject } from '@emotion/core';
import { useEffect, useState } from 'react';
import Glider from 'react-glider';

import styles, { ITEM_SIZE } from './HorizontalNumberPicker.styles';

interface Props {
  customCarouselStyles?: CSSObject;
  customContainerStyles?: CSSObject;
  numbers: number[];
  onSelect?: (value: number) => void;
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
    if (!selectedIndex) {
      return;
    }

    setSelectedItemIndex(selectedIndex);
  }, [selectedIndex]);

  const handleClick = (value: number, index: number) => () => {
    if (onSelect) {
      onSelect(value);
    }
    setSelectedItemIndex(index);
  };

  return (
    <div css={customContainerStyles}>
      <div css={styles.header}>
        <h3 css={styles.title}>{title}</h3>

        {subTitle && <span css={styles.subTitle}>{subTitle}</span>}
      </div>

      <div css={customCarouselStyles}>
        <Glider
          draggable
          slidesToShow="auto"
          dragVelocity={1.25}
          scrollLock={false}
          itemWidth={ITEM_SIZE}
        >
          {numbers.map((value, index) => {
            return (
              <button
                css={[
                  styles.numberItem,
                  selectedItemIndex === index && styles.selectedItem,
                ]}
                onClick={handleClick(value, index)}
                key={index}
              >
                <span css={styles.innerItem}>{value}</span>
              </button>
            );
          })}
        </Glider>
      </div>
    </div>
  );
}

export default HorizontalNumberPicker;
