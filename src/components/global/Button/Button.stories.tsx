import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { ReactChild, useState } from 'react';

import {
  BUTTON_STYLE,
  COLORS,
  LINK_TYPES,
  RADIUS,
  StylesMap,
  THEME,
} from '~/lib/constants';

import Button from './Button';
import FilterButton from './FilterButton';
import FilterButtonToggle from './FilterButtonToggle';

export default {
  component: Button,
  title: 'Global/Button',
};

const handleButtonClick = action('button-click');

const styles: StylesMap = {
  root: {
    minHeight: '100vh',
  },
  popup: {
    background: COLORS.GLOBAL.WHITE,
    borderRadius: RADIUS.RADIUS_15,
    height: 150,
    marginTop: 5,
    padding: 10,
    width: 200,
  },
};

function ButtonContainer({
  theme,
  children,
}: {
  children: ReactChild;
  theme: THEME.DARK | THEME.LIGHT | THEME.ORANGE;
}) {
  const themeMap = {
    [THEME.LIGHT]: COLORS.GLOBAL.WHITE,
    [THEME.DARK]: COLORS.GLOBAL.BLACK,
    [THEME.ORANGE]: COLORS.GLOBAL.ORANGE,
  };
  const backgroundColor = themeMap[theme];

  return <div css={[styles.root, { backgroundColor }]}>{children}</div>;
}

export function ButtonWithKnobs() {
  const as = select(
    'Element',
    [LINK_TYPES.BUTTON, LINK_TYPES.A],
    LINK_TYPES.BUTTON,
  );
  const style = select(
    'Style',
    [BUTTON_STYLE.SOLID, BUTTON_STYLE.OUTLINED],
    BUTTON_STYLE.SOLID,
  );
  const theme = select(
    'Theme',
    [THEME.LIGHT, THEME.DARK, THEME.ORANGE],
    THEME.LIGHT,
  );

  return (
    <ButtonContainer theme={theme}>
      <Button
        href={as === LINK_TYPES.A ? '/' : ''}
        onClick={handleButtonClick}
        isDisabled={boolean('Disabled', false)}
        {...{ as, style, theme }}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function LightButtonSolid() {
  return (
    <ButtonContainer theme={THEME.LIGHT}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function LightButtonSolidAsAnchor() {
  return (
    <ButtonContainer theme={THEME.LIGHT}>
      <Button
        as={LINK_TYPES.A}
        href="/"
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function LightButtonOutlined() {
  return (
    <ButtonContainer theme={THEME.LIGHT}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        style={BUTTON_STYLE.OUTLINED}
        theme={THEME.LIGHT}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function DarkButtonSolid() {
  return (
    <ButtonContainer theme={THEME.DARK}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        style={BUTTON_STYLE.SOLID}
        theme={THEME.DARK}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function DarkButtonOutlined() {
  return (
    <ButtonContainer theme={THEME.DARK}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        style={BUTTON_STYLE.OUTLINED}
        theme={THEME.DARK}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function OrangeButtonSolid() {
  return (
    <ButtonContainer theme={THEME.ORANGE}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        style={BUTTON_STYLE.SOLID}
        theme={THEME.ORANGE}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function OrangeButtonOutlined() {
  return (
    <ButtonContainer theme={THEME.ORANGE}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        style={BUTTON_STYLE.OUTLINED}
        theme={THEME.ORANGE}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function FilterButtonToggleWithKnobs() {
  const theme = select(
    'Theme',
    [THEME.LIGHT, THEME.DARK, THEME.ORANGE],
    THEME.LIGHT,
  );

  return (
    <ButtonContainer theme={theme}>
      <FilterButtonToggle
        isActive={boolean('Active', false)}
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        theme={theme}
      >
        {text('Label', 'Button Label')}
      </FilterButtonToggle>
    </ButtonContainer>
  );
}

export function FilterButtonDropdownWithKnobs() {
  const theme = select(
    'Theme',
    [THEME.LIGHT, THEME.DARK, THEME.ORANGE],
    THEME.LIGHT,
  );

  const isDropdownOpen = boolean('Drop down', false);
  return (
    <ButtonContainer theme={theme}>
      <FilterButton
        label={text('Label', 'Button Label')}
        isActive={boolean('Active', false)}
        isDisabled={boolean('Disabled', false)}
        isDropdownOpen={isDropdownOpen}
        onClick={handleButtonClick}
        theme={theme}
      >
        {isDropdownOpen && <div css={styles.popup}>Popup content</div>}
      </FilterButton>
    </ButtonContainer>
  );
}
export function LightFilterButtonInactive() {
  return (
    <ButtonContainer theme={THEME.LIGHT}>
      <FilterButtonToggle
        isActive={false}
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
      >
        {text('Label', 'Button Label')}
      </FilterButtonToggle>
    </ButtonContainer>
  );
}

export function LightFilterButtonActive() {
  return (
    <ButtonContainer theme={THEME.LIGHT}>
      <FilterButtonToggle
        isActive
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
      >
        {text('Label', 'Button Label')}
      </FilterButtonToggle>
    </ButtonContainer>
  );
}

export function DarkFilterButtonInactive() {
  return (
    <ButtonContainer theme={THEME.DARK}>
      <FilterButtonToggle
        isActive={false}
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        theme={THEME.DARK}
      >
        {text('Label', 'Button Label')}
      </FilterButtonToggle>
    </ButtonContainer>
  );
}

export function DarkFilterButtonActive() {
  return (
    <ButtonContainer theme={THEME.DARK}>
      <FilterButtonToggle
        isActive
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        theme={THEME.DARK}
      >
        {text('Label', 'Button Label')}
      </FilterButtonToggle>
    </ButtonContainer>
  );
}

export function OrangeFilterButtonInactive() {
  return (
    <ButtonContainer theme={THEME.ORANGE}>
      <FilterButtonToggle
        isActive={false}
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        theme={THEME.ORANGE}
      >
        {text('Label', 'Button Label')}
      </FilterButtonToggle>
    </ButtonContainer>
  );
}

export function OrangeFilterButtonWithDropdownActive() {
  return (
    <ButtonContainer theme={THEME.ORANGE}>
      <FilterButton
        isDropdownOpen={boolean('Drop down', false)}
        isActive
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        theme={THEME.ORANGE}
        label={text('Label', 'Button Label')}
      >
        <div css={styles.popup}>Popup content</div>
      </FilterButton>
    </ButtonContainer>
  );
}

export function FilterButtonWithDropdownState() {
  const [isActive, setIsActive] = useState(false);
  const theme = select(
    'Theme',
    [THEME.LIGHT, THEME.DARK, THEME.ORANGE],
    THEME.LIGHT,
  );

  return (
    <ButtonContainer theme={theme}>
      <FilterButton
        isDropdownOpen={isActive}
        isActive={isActive}
        isDisabled={boolean('Disabled', false)}
        onClick={function () {
          setIsActive(!isActive);
        }}
        theme={theme}
        label={text('Label', 'Button Label')}
      >
        {isActive && <div css={styles.popup}>Popup content</div>}
      </FilterButton>
    </ButtonContainer>
  );
}
