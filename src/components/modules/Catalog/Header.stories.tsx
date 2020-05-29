import { boolean, text } from '@storybook/addon-knobs';
import { ReactNode, useState } from 'react';

import Header from './Header';

export default {
  component: HeaderWithKnobs,
  title: 'Catalog Header',
};

const defaultProps = {
  activeFilter: undefined,
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

function HeaderContainer({ children }: { children: ReactNode }) {
  const styles = {
    root: {
      height: '150vh', // allow for scroll if popup is open
    },
  };
  return <div css={styles.root}>{children}</div>;
}
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
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  function toggleFilter(filter: string) {
    if (activeFilters.includes(filter)) {
      const filters = activeFilters.filter((f) => f !== filter);
      setActiveFilters(filters);
      return;
    }
    setActiveFilters([...activeFilters, filter]);
  }
  const tireSize = text('Tire size', defaultProps.tireSize);
  const rearTireSize = text('Rear tire size', defaultProps.tireSize);
  const location = text('Location', defaultProps.location);

  return (
    <HeaderContainer>
      <Header
        {...{
          activeFilters,
          isAdvancedView,
          isInternal,
          location,
          onToggle: () => setIsAdvancedView(!isAdvancedView),
          rearTireSize,
          tireSize,
          title: titleEl,
          toggleFilter,
        }}
      />
    </HeaderContainer>
  );
}

export function Main() {
  const [isAdvancedView, setIsAdvancedView] = useState(
    defaultProps.isAdvancedView,
  );
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  function toggleFilter(filter: string) {
    if (activeFilters.includes(filter)) {
      const filters = activeFilters.filter((f) => f !== filter);
      setActiveFilters(filters);
      return;
    }
    setActiveFilters([...activeFilters, filter]);
  }
  return (
    <HeaderContainer>
      <Header
        {...defaultProps}
        toggleFilter={toggleFilter}
        activeFilters={activeFilters}
        isAdvancedView={isAdvancedView}
        onToggle={toggleView}
        title={defaultTitle}
      />
    </HeaderContainer>
  );
}

export function MainWithoutRearTireSize() {
  const [isAdvancedView, setIsAdvancedView] = useState(
    defaultProps.isAdvancedView,
  );
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  function toggleFilter(filter: string) {
    if (activeFilters.includes(filter)) {
      const filters = activeFilters.filter((f) => f !== filter);
      setActiveFilters(filters);
      return;
    }
    setActiveFilters([...activeFilters, filter]);
  }
  return (
    <HeaderContainer>
      <Header
        {...defaultProps}
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        isAdvancedView={isAdvancedView}
        onToggle={toggleView}
        rearTireSize={undefined}
        title={defaultTitle}
      />
    </HeaderContainer>
  );
}

export function Internal() {
  const [isAdvancedView, setIsAdvancedView] = useState(
    defaultProps.isAdvancedView,
  );
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  function toggleFilter(filter: string) {
    if (activeFilters.includes(filter)) {
      const filters = activeFilters.filter((f) => f !== filter);
      setActiveFilters(filters);
      return;
    }
    setActiveFilters([...activeFilters, filter]);
  }

  return (
    <HeaderContainer>
      <Header
        {...defaultProps}
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        isInternal
        isAdvancedView={isAdvancedView}
        onToggle={toggleView}
        title="Winter Tires"
      />
    </HeaderContainer>
  );
}

export function AdvancedView() {
  const [isAdvancedView, setIsAdvancedView] = useState(true);
  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  function toggleFilter(filter: string) {
    if (activeFilters.includes(filter)) {
      const filters = activeFilters.filter((f) => f !== filter);
      setActiveFilters(filters);
      return;
    }
    setActiveFilters([...activeFilters, filter]);
  }
  return (
    <HeaderContainer>
      <Header
        {...defaultProps}
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        onToggle={toggleView}
        title={defaultTitle}
        isAdvancedView={isAdvancedView}
      />
    </HeaderContainer>
  );
}
