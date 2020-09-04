import { forwardRef, MutableRefObject } from 'react';

import { CSSStylesProp } from '~/lib/constants';

import styles from './Option.styles';
import { SelectOption } from './Select';

interface OptionProps {
  baseId?: string;
  customCss?: CSSStylesProp;
  focusedOptionIndex?: number;
  index?: number;
  option: SelectOption;
  optionClick: (item: SelectOption) => void;
  selectedOptionIndex?: number;
}

type RefType =
  | ((instance: HTMLLIElement | null) => void)
  | MutableRefObject<HTMLLIElement | null>
  | null;

function Option(
  {
    customCss,
    baseId,
    focusedOptionIndex,
    selectedOptionIndex,
    index,
    option,
    optionClick,
  }: OptionProps,
  ref: RefType,
) {
  const handleOnClick = () => {
    optionClick(option);
  };

  const isFocused = index === focusedOptionIndex;
  const isSelected = index === selectedOptionIndex;
  return (
    <li
      aria-selected={isFocused ? 'true' : 'false'}
      id={`option_${baseId}`}
      role="option"
      css={[
        styles.option,
        isFocused && styles.optionFocused,
        isSelected && styles.optionSelected,
        customCss,
      ]}
      ref={ref}
      tabIndex={-1}
    >
      <button
        className={'item-button'}
        data-value={option.value}
        id={`${baseId}__option-button-${index}`}
        onClick={handleOnClick}
        tabIndex={-1}
        type="button"
      >
        <span>{option.text}</span>
      </button>
    </li>
  );
}

export default forwardRef(Option);
