import { fireEvent, render, screen } from '@testing-library/react';

import { SiteCatalogFilterHeaderNullable } from '~/data/models/SiteCatalogFilterHeaderNullable';
import * as ModalUtils from '~/lib/utils/modal';

import FilterHeader from './FilterHeader';

describe('FilterHeader', () => {
  test('valid modal ID', () => {
    const mockOpenStatic = jest.fn();
    jest.spyOn(ModalUtils, 'isValidStaticModal').mockReturnValue(true);
    const { container } = render(
      <FilterHeader
        title="Test filter"
        header={
          {
            infoLink: {
              label: "What's this?",
              siteStaticModal: {
                contentId: 'validId',
              },
            },
          } as SiteCatalogFilterHeaderNullable
        }
        openStaticModal={mockOpenStatic}
      />,
    );

    // it renders Header with title and button
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="FilterHeader"
      >
        Test filter
        <button
          class="FilterHeader"
        >
          What's this?
        </button>
      </div>
    `);

    // when button is clicked on
    fireEvent.click(screen.getByRole('button'));

    // it calls openStaticModal with ID
    expect(mockOpenStatic).toHaveBeenCalledWith('validId');
  });

  it('renders title without button on invalid modal ID', () => {
    jest.spyOn(ModalUtils, 'isValidStaticModal').mockReturnValue(false);
    const { container } = render(
      <FilterHeader
        title="Test filter"
        header={
          {
            infoLink: {
              label: "What's this?",
              siteStaticModal: {
                contentId: 'invalidId',
              },
            },
          } as SiteCatalogFilterHeaderNullable
        }
        openStaticModal={jest.fn()}
      />,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="FilterHeader"
      >
        Test filter
      </div>
    `);
  });

  test('it renders null on invalid modal ID on large breakpoint', () => {
    jest.spyOn(ModalUtils, 'isValidStaticModal').mockReturnValue(false);
    const { container } = render(
      <FilterHeader
        title="Test filter"
        header={
          {
            infoLink: {
              label: "What's this?",
              siteStaticModal: {
                contentId: 'invalidId',
              },
            },
          } as SiteCatalogFilterHeaderNullable
        }
        isLarge
        openStaticModal={jest.fn()}
      />,
    );

    expect(container.firstChild).toMatchInlineSnapshot('null');
  });

  it('renders title without button on invalid modal ID, large breakpoint, group header', () => {
    jest.spyOn(ModalUtils, 'isValidStaticModal').mockReturnValue(false);
    const { container } = render(
      <FilterHeader
        title="Test filter"
        header={
          {
            infoLink: {
              label: "What's this?",
              siteStaticModal: {
                contentId: 'invalidId',
              },
            },
          } as SiteCatalogFilterHeaderNullable
        }
        isLarge
        isGroupHeader
        openStaticModal={jest.fn()}
      />,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="FilterHeader"
      >
        Test filter
      </div>
    `);
  });
});
