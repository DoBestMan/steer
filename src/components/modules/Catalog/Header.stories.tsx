import { boolean, text } from '@storybook/addon-knobs';
import { useState } from 'react';

import Header from './Header';

export default {
  component: HeaderWithKnobs,
  title: 'Catalog',
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

export function HeaderWithKnobs() {
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
    <Header
      {...{
        isAdvancedView,
        isInternal,
        location,
        onToggle: () => setIsAdvancedView(!isAdvancedView),
        rearTireSize,
        tireSize,
        title: titleEl,
      }}
    />
  );
}

export function Main() {
  const [isAdvancedView, setIsAdvancedView] = useState(
    defaultProps.isAdvancedView,
  );
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  return (
    <Header
      {...defaultProps}
      title={defaultTitle}
      onToggle={toggleView}
      isAdvancedView={isAdvancedView}
    />
  );
}

export function MainWithoutRearTireSize() {
  const [isAdvancedView, setIsAdvancedView] = useState(
    defaultProps.isAdvancedView,
  );
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  return (
    <Header
      {...defaultProps}
      rearTireSize={undefined}
      title={defaultTitle}
      onToggle={toggleView}
      isAdvancedView={isAdvancedView}
    />
  );
}

export function Internal() {
  const [isAdvancedView, setIsAdvancedView] = useState(
    defaultProps.isAdvancedView,
  );
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }

  return (
    <Header
      {...defaultProps}
      isInternal
      title="Winter Tires"
      onToggle={toggleView}
      isAdvancedView={isAdvancedView}
    />
  );
}

export function AdvancedView() {
  const [isAdvancedView, setIsAdvancedView] = useState(true);
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  return (
    <Header
      {...defaultProps}
      title={defaultTitle}
      onToggle={toggleView}
      isAdvancedView={isAdvancedView}
    />
  );
}
