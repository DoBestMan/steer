import { render, screen } from '@testing-library/react';
import ReactModal from 'react-modal';

import { SiteCatalogFilterGroupGroupTypeEnum } from '~/data/models/SiteCatalogFilterGroup';

import { mockList } from '../Filters.mocks';
import FilterChecklist from './FilterChecklist';

ReactModal.setAppElement('*'); // removes warning in tests
jest.mock('focus-trap', () => {
  const trap = {
    activate: () => trap,
    deactivate: () => trap,
    pause: () => {},
    unpause: () => {},
  };
  return () => trap;
});

const tree = (
  <FilterChecklist
    {...mockList}
    onChange={jest.fn}
    isLarge={false}
    filtersToApply={{}}
    openStaticModal={jest.fn}
    isPreviewLoading={false}
  />
);

describe('FilterChecklist', () => {
  it('disables inputs if preview is loading', () => {
    const { rerender } = render(tree);
    const checkbox = screen.queryByRole('checkbox', {
      hidden: true,
    });

    expect(checkbox).not.toBeDisabled();

    rerender(
      <FilterChecklist
        {...mockList}
        onChange={jest.fn}
        isLarge={false}
        filtersToApply={{}}
        openStaticModal={jest.fn}
        isPreviewLoading
      />,
    );

    expect(checkbox).toBeDisabled();
  });

  it('renders checkboxes', () => {
    render(tree);

    expect(
      screen.queryByRole('checkbox', {
        hidden: true,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('radio', {
        hidden: true,
      }),
    ).not.toBeInTheDocument();
  });

  it('renders radios', () => {
    const mockListRadio = {
      ...mockList,
      filterGroups: [
        {
          ...mockList.filterGroups[0],
          groupType: SiteCatalogFilterGroupGroupTypeEnum.Radio,
        },
      ],
    };
    render(
      <FilterChecklist
        {...mockListRadio}
        onChange={jest.fn}
        isLarge={false}
        filtersToApply={{}}
        openStaticModal={jest.fn}
        isPreviewLoading
      />,
    );

    expect(
      screen.queryByRole('checkbox', {
        hidden: true,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('radio', {
        hidden: true,
      }),
    ).toBeInTheDocument();
  });

  it('renders both checkboxes and radios', () => {
    const mockListBoth = {
      ...mockList,
      filterGroups: [
        { ...mockList.filterGroups[0] },
        {
          ...mockList.filterGroups[0],
          groupType: SiteCatalogFilterGroupGroupTypeEnum.Radio,
        },
      ],
    };
    render(
      <FilterChecklist
        {...mockListBoth}
        onChange={jest.fn}
        isLarge={false}
        filtersToApply={{}}
        openStaticModal={jest.fn}
        isPreviewLoading
      />,
    );

    expect(
      screen.queryByRole('checkbox', {
        hidden: true,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('radio', {
        hidden: true,
      }),
    ).toBeInTheDocument();
  });
});
