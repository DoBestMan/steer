import { render, screen } from '@testing-library/react';
import ReactModal from 'react-modal';

import { SiteCatalogFilterGroupGroupTypeEnum } from '~/data/models/SiteCatalogFilterGroup';

import { listMock } from '../Filters.mock';
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
    {...listMock}
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
        {...listMock}
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
      ...listMock,
      filterGroups: [
        {
          ...listMock.filterGroups[0],
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
      ...listMock,
      filterGroups: [
        { ...listMock.filterGroups[0] },
        {
          ...listMock.filterGroups[0],
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
