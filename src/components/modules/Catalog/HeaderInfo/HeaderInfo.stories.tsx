import { boolean, text } from '@storybook/addon-knobs';
import { ThemeProvider } from 'emotion-theming';
import { ReactNode, useState } from 'react';

import {
  defaultTheme,
  headerAdvanced,
} from '~/components/pages/CatalogPage/CatalogPage.theme';
import { COLORS } from '~/lib/constants';

import styles from '../Header.styles';
import HeaderInfo from './HeaderInfo';

export default {
  component: HeaderInfoWithKnobs,
  title: 'Catalog/Header/Info',
};

const defaultProps = {
  hasTopPicks: true,
  isAdvancedView: false,
  isInternal: false,
  location: 'Portland, OR',
  sizeList: ['Size 255/30 R20', 'Rear 355/25 R21'],
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
  const bg = isAdvancedView ? COLORS.GLOBAL.BLACK : COLORS.GLOBAL.ORANGE;
  return (
    <div css={[styles.root, { background: bg }]}>
      <ThemeProvider
        theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
      >
        {children}
      </ThemeProvider>
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
  const tireSize = text('Tire size', defaultProps.sizeList[0]);
  const rearTireSize = text('Rear tire size', defaultProps.sizeList[1]);
  const location = text('Location', defaultProps.location);
  const hasTopPicks = boolean('Has top picks', true);
  return (
    <HeaderContainer isAdvancedView={isAdvancedView}>
      <HeaderInfo
        {...{
          hasTopPicks,
          isAdvancedView,
          location,
          onToggleView: () => setIsAdvancedView(!isAdvancedView),
          sizeList: [tireSize, rearTireSize],
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
        sizeList={['Size 255/30 R20']}
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
