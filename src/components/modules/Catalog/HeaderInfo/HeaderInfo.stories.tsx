import { boolean, text } from '@storybook/addon-knobs';
import { ReactNode, useState } from 'react';

import styles from '../Header.styles';
import HeaderInfo from './HeaderInfo';

export default {
  component: HeaderInfoWithKnobs,
  title: 'Catalog/Header/Info',
};

const defaultProps = {
  isAdvancedView: false,
  isInternal: false,
  location: 'Portland, OR',
  rearTireSize: '355/25 R21',
  tireSize: '255/30 R20',
};
const defaultTitle = (
  <>
    232 tires fit your
    <br />
    Lamborghini Aventador Roadster 2018
  </>
);

function HeaderContainer({
  children,
  isAdvancedView,
}: {
  children: ReactNode;
  isAdvancedView: boolean;
}) {
  return (
    <div css={[styles.root, isAdvancedView && styles.rootAdvanced]}>
      {children}
    </div>
  );
}
export function HeaderInfoWithKnobs() {
  const [isAdvancedView, setIsAdvancedView] = useState(false);
  const isInternal = boolean('Internal', defaultProps.isInternal);
  const car = text('Make/Model', 'Lamborghini Aventador Roadster 2018');
  const title = text(
    'Header title',
    isInternal ? 'Winter Tires' : '232 tires fit your',
  );
  const titleEl = (
    <>
      {title}
      <br />
      {car}
    </>
  );
  const tireSize = text('Tire size', defaultProps.tireSize);
  const rearTireSize = text('Rear tire size', defaultProps.tireSize);
  const location = text('Location', defaultProps.location);

  return (
    <HeaderContainer isAdvancedView={isAdvancedView}>
      <HeaderInfo
        {...{
          isAdvancedView,
          location,
          onToggleView: () => setIsAdvancedView(!isAdvancedView),
          rearTireSize,
          tireSize,
          title: titleEl,
        }}
      />
    </HeaderContainer>
  );
}

export function HeaderInfoMain() {
  const [isAdvancedView, setIsAdvancedView] = useState(
    defaultProps.isAdvancedView,
  );
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  return (
    <HeaderContainer isAdvancedView={isAdvancedView}>
      <HeaderInfo
        {...defaultProps}
        isAdvancedView={isAdvancedView}
        onToggleView={toggleView}
        title={defaultTitle}
      />
    </HeaderContainer>
  );
}

export function HeaderInfoWithoutRearTireSize() {
  const [isAdvancedView, setIsAdvancedView] = useState(
    defaultProps.isAdvancedView,
  );
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  return (
    <HeaderContainer isAdvancedView={isAdvancedView}>
      <HeaderInfo
        {...defaultProps}
        onToggleView={toggleView}
        title={defaultTitle}
        rearTireSize={undefined}
      />
    </HeaderContainer>
  );
}

export function HeaderInfoInternal() {
  const [isAdvancedView, setIsAdvancedView] = useState(
    defaultProps.isAdvancedView,
  );
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  return (
    <HeaderContainer isAdvancedView={isAdvancedView}>
      <HeaderInfo
        {...defaultProps}
        isInternal
        onToggleView={toggleView}
        title={defaultTitle}
      />
    </HeaderContainer>
  );
}

export function HeaderInfoAdvancedView() {
  const [isAdvancedView, setIsAdvancedView] = useState(true);
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  return (
    <HeaderContainer isAdvancedView={isAdvancedView}>
      <HeaderInfo
        {...defaultProps}
        onToggleView={toggleView}
        title={defaultTitle}
        isAdvancedView={isAdvancedView}
      />
    </HeaderContainer>
  );
}
